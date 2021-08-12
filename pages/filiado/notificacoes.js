import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Table,TableBody,TableCell,TableContainer,Card,TableHead,TablePagination,TableRow,Typography,Chip,Modal, TextField} from "@material-ui/core"
import {Edit,Delete,Add} from "@material-ui/icons"
import Filiado from "layout/filiado";
import Link from "next/link";
import fire from "../../config/fire-config";
import Button from "components/CustomButtons/Button.js";
import { withIronSession } from "next-iron-session";

const columns = [
  { id: 'titulo', label: 'Titulo', minWidth: 170 },
  { id: 'tipo', label: 'Tipo', minWidth: 100 },
  {
    id: 'dataPost',
    label: 'Publicado em:',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  
 
];

function createData(titulo, tipo, dataPost) {
  return { titulo, tipo, dataPost };
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

React.useEffect(() =>{
  console.log(props.user.user.uid)
    var lc = fire.database().ref('notificacoes/'+props.user.user.uid);
      

        lc.on("value",(snap) => {
            snap.forEach((c) => {
                  var nc = c.val();
              
                  console.log("toaki"+nc);
                  setRows(prev=>[...prev,nc]);
            });
        });

},[]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };




function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles2 = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 700,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

  const classes2 = useStyles2();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [tilSel, setTilSel] = React.useState("");
  const [matSel, setMatSel] = React.useState("");

  function ModalNot(){
 return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
         <div style={modalStyle} className={classes2.paper}>
          <h4 id="simple-modal-title">{tilSel}</h4>
          <Typography variant="h5">
            {matSel.Nome}
          </Typography>
          
        </div>
      </Modal>
    </div>
  );

  }
 

  return (
      <>
        <main  className={classes.content}>
  
            <Paper className={classes.root}>
        <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
           
            <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      <Card variant="outlined">
                        
                        <TableCell onClick={()=>{setOpen(true),setTilSel(row.titulo),setMatSel(JSON.parse(row.mensagem))}}>
                          <Typography style={{ fontSize: 14}} color="textSecondary" gutterBottom>
                              Word of the Day 
                            </Typography>
                          <Typography variant="h5" component="h2">
                              {row.titulo}
                            </Typography>
                            {!row.lida && <Chip  label="Não Lida" />}
                            
                        </TableCell>
                       </Card>
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
        <ModalNot/>
    </>
  );
}

Classificados.layout = Filiado;

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