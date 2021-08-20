import { Dialog,DialogActions,DialogTitle,DialogContent,DialogContentText, Paper, Table, TableBody,Snackbar,TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Add, Delete, Edit } from "@material-ui/icons";
import Button from "components/CustomButtons/Button.js";
import Admin from "layout/admin";
import { withIronSession } from "next-iron-session";
import Link from "next/link";
import React,{useRef,useState} from 'react';
import fire from "../../config/fire-config";
import MuiAlert from '@material-ui/lab/Alert';
import MyBackDrop from "../components/MyBackDrop"
import {useRouter} from "next/router"

const columns = [
  { id: 'descricao', label: 'Descrição da Vaga', minWidth: 170 },
  { id: 'obs', label: 'Observação:', minWidth: 100 },
  { id: 'qtd', label: 'Quantidade de Vagas:', minWidth: 100 },
  
 
];

function createData(descricao, obs, qtd,id) {
  return { descricao, obs, qtd,id };
}



const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});



function Empregos(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [selNews, setSelNews] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows,setRows] = React.useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const [openModal, setOpenModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  let passToDel = useRef();
function DelModal(){

  return(
    <Dialog
        open={openModal}
        onClose={()=>setOpenModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
       <DialogTitle id="alert-dialog-title">Insira sua senha para deletar esta vaga de emprego: {selNews.descricao}</DialogTitle>
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
  var email = (props.user.user.email);
  setOpenModal(false)

  fire.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    var user = userCredential.user;
    fire.database().ref("/empregos/"+selNews.id).remove().then(()=>{
        
  
          setRefreshKey(oldKey => oldKey +1)
          setOpen(false)
     
    })
 
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    //setOpenModal(true)
    setOpen(false)
    setAlertar(true)
  });
}

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  Admin.props = props;


React.useEffect(() =>{
    setRows([]);
    var lc = fire.database().ref('empregos');
      

        lc.on("value",(snap) => {
            snap.forEach((c) => {
                  var nc = c.val();
                  setRows(prev=>[...prev,createData(nc.descricao,nc.obs,nc.qtd,c.key)]);
            });
        });

},[refreshKey]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function editEmprego(id){
    setOpen(true);
    router.push({pathname: '/admin/editEmprego',query: { id: id }})

    
  }

  const router = useRouter();
  return (
      <>
        <main  className={classes.content}>
          <Link href="/admin/addEmprego" >
            <Button style={{backgroundColor:"#023723",float:"right"}} round>
                <Add className={classes.icons} /> Emprego
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
                        <Button onClick={()=>editEmprego(row.id)}>
                            <Edit/></Button>

                        <Button onClick={()=>{setAlertar(false);setOpenModal(true);setSelNews(row)}}>
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
Empregos.layout = Admin;

export default Empregos;


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