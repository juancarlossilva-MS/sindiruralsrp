import React,{useState,useRef,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Dialog,DialogActions,DialogTitle,DialogContent,DialogContentText,Snackbar,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,TextField} from "@material-ui/core"
import {Edit,Delete,Add} from "@material-ui/icons"
import Admin from "layout/filiado";
import Link from "next/link";
import fire from "../../config/fire-config";
import Button from "components/CustomButtons/Button.js";
import { withIronSession } from "next-iron-session";
import {useRouter} from "next/router";
import MuiAlert from '@material-ui/lab/Alert';
import MyBackDrop from "../components/MyBackDrop"

const columns = [
  { id: 'titulo', label: 'Titulo', minWidth: 170 },
  { id: 'valor', label: 'Valor', minWidth: 100 },
  {
    id: 'nomeFiliado',
    label: 'Anunciado por:',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  
 
];

function createData(titulo, valor, nomeFiliado,id,pastaImgClass) {
  return { titulo, valor, nomeFiliado,id,pastaImgClass };
}



const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});



function Classificados(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows,setRows] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const router = useRouter();

  const [refreshKey, setRefreshKey] = useState(0);

  const [openModal, setOpenModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selClass, setSelClass] = React.useState(0);

  let passToDel = useRef();


function DelModal(){

  return(
    <Dialog
        open={openModal}
        onClose={()=>setOpenModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
       <DialogTitle id="alert-dialog-title">Insira sua senha para deletar o classificado: {selClass.titulo}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esse classificado foi anunciado por {selClass.nomeFiliado}
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
    var email = (props.user.user.email);
    setOpenModal(false)
  
    fire.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential.user;
      fire.database().ref("/classificados/"+selClass.id).remove().then(()=>{
          
         var listRef = fire.storage().ref().child('classificados/'+selClass.pastaImgClass);

        listRef.listAll().then(function(res) {
         
          res.items.forEach(function(itemRef) {
              itemRef.delete()
          })
                console.log("delete with success");
                setRefreshKey(oldKey => oldKey +1)
                setOpen(false)
              
        }).catch(function(error) {
          // Uh-oh, an error occurred!
          console.log(error);
                setOpen(false)
        });
        
      })
   
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      setOpen(false)
      setAlertar(true)
    });
  }
  
  
useEffect(() =>{

    setRows([]);
    var lc = fire.database().ref('classificados').orderByChild("idFiliado").equalTo(props.user.user.uid);
      

        lc.on("value",(snap) => {
            snap.forEach((c) => {
                  var nc = c.val();
                  console.log("toaki"+nc);
                  setRows(prev=>[...prev,createData(nc.titulo,nc.valor,nc.nomeFiliado,c.key,nc.pastaImgClass)]);
            });
        });

},[refreshKey]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function openEdit(id){
    setOpen(true);
      router.push({
        pathname: '/filiado/editClassificado',
        query: { id: id },
      })
  }

  return (
      <>
        <main  className={classes.content}>
          <Link href="/filiado/addClassificado" >
            <Button style={{backgroundColor:"#023723",float:"right"}} round>
                <Add className={classes.icons} /> Classificado
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
                    <Button onClick={()=>openEdit(row.id)}>
                        
                        <Edit/></Button>

                        <Button onClick={()=>{setAlertar(false);setOpenModal(true);setSelClass(row)}}>
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

Classificados.layout = Admin;

export default Classificados;



export const getServerSideProps = withIronSession(
  async ({ req, res }) => {
    const user = req.session.get("filiado");
    if (!user) {
      const userfili = req.session.get("admin");
      if(userfili){
        res.setHeader("location", "/admin/noticias");
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