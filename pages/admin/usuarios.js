import React,{useState,useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Dialog,DialogActions,DialogTitle,DialogContent,DialogContentText,Snackbar,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,TextField} from "@material-ui/core"
import {Edit,Delete,Add} from "@material-ui/icons"
import Admin from "layout/admin";
import Link from "next/link";
import fire from "../../config/fire-config";
import Button from "components/CustomButtons/Button.js";
import { withIronSession } from "next-iron-session";
import MuiAlert from '@material-ui/lab/Alert';
import MyBackDrop from "../components/MyBackDrop"

const columns = [
  { id: 'nome', label: 'Nome', minWidth: 300 },
  { id: 'email', label: 'Email', minWidth: 120 },
  {
    id: 'tipo',
    label: 'Tipo de Usuário',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  
 
];

function createData(nome, email, tipo,id) {
  return { nome, email, tipo,id };
}


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});



function Usuarios(props) {

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows,setRows] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  /*
 async function vamosNessa(){
   
  fetch("/api/admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  }).then(response => 
    response.json().then(data => {
        console.log(data)
    }
))
 
  
}*/


const [refreshKey, setRefreshKey] = useState(0);

  const [openModal, setOpenModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selUser, setSelUser] = React.useState(0);

  let passToDel = useRef();
function DelModal(){

  return(
    <Dialog
        open={openModal}
        onClose={()=>setOpenModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
       <DialogTitle id="alert-dialog-title">Insira sua senha para deletar o Usuário: {selUser.displayName}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

            <TextField inputRef={passToDel} type="password" label="digite aqui sua senha" fullWidth variant="standard"/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  onClick={()=>setOpenModal(false)}  color="green">
            Cancelar
          </Button>
          <Button onClick={confirmaDel} color="green" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
       
      </Dialog>
  )
}
const [alertar, setAlertar] = useState(false);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setAlertar(false);
};

function confirmaDel(){
  setOpen(true);
  var password = (passToDel.current.value);
  var email = (props.user.user.email)
  setOpenModal(false)
  fire.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    var user = userCredential.user;
    
    fire.database().ref("/user/"+selUser.id).remove().then(()=>{
      setRefreshKey(oldKey => oldKey +1)
      setOpen(false)
      /*fire.storage().ref().child('user/'+selUser.photoURL).delete().then(function() {
          console.log("delete with success");
          setRefreshKey(oldKey => oldKey +1)
          setOpen(false)
        }).catch(function(error) {
        });*/
    })
 
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    setOpenModal(true)
    setOpen(false)
    setAlertar(true)
  });

}





React.useEffect(() =>{

    //vamosNessa();
    setRows([]);

    var lc = fire.database().ref('user');
      

        lc.on("value",(snap) => {
            snap.forEach((c) => {
                  var nc = c.val();
                  setRows(prev=>[...prev,createData(nc.displayName, nc.email, nc.perfil,c.key)]);
            });
        });

},[refreshKey]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
      <>
        <main  className={classes.content}>
          <Link href="/admin/addUsuario" >
            <Button style={{backgroundColor:"#023723",float:"right"}} round>
                <Add className={classes.icons} /> Usuário
              </Button>
          </Link>
            <Paper className={classes.root}>
        <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {columns.map((column) => (
                    <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    >
                    {column.label}
                    </TableCell>
                ))}
                <TableCell>Ações</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                        const value = row[column.id];
                        return (
                        <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                        );
                    })}
                    <TableCell>
                    <Button>
                        <Link  href={{
                                  pathname: '/admin/editUsuario',
                                  query: { id: row.id },
                                }}
                        ><Edit/></Link></Button>

                        <Button onClick={()=>{setOpenModal(true);setSelUser(row)}}>
                           <Delete/>
                        </Button>
                        
                    </TableCell>
                    </TableRow>
                );
                })}
            </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </Paper>
        </main>
        <DelModal/>
       <Snackbar open={alertar} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Email ou senha incorretos! tente novamente
        </Alert>
      </Snackbar>

      {open &&
        <MyBackDrop/>
      }
    </>
  );
}



Usuarios.layout = Admin;

export default Usuarios;


export const getServerSideProps = withIronSession(
  async ({ req, res }) => {
    const user = req.session.get("admin");
    if (!user) {
      const userfili = req.session.get("filiado");
      if(userfili){
        res.setHeader("location", "/filiado/classificados");
        res.statusCode = 302;
        res.end();
        return { props: {userfili} };
      }else{
        res.setHeader("location", "/login");
        res.statusCode = 302;
        res.end();
        return { props: {} };
      }
    }
    return {
      props: { user }
    };
  },
  {
    cookieName: "MYSITECOOKIE",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false
    },
    password: process.env.APPLICATION_SECRET
  }
);