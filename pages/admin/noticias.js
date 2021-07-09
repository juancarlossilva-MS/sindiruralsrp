import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow} from "@material-ui/core"
import {Edit,Delete,Add} from "@material-ui/icons"
import Admin from "layout/admin";
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

function createData(titulo, tipo, dataPost,id) {
  return { titulo, tipo, dataPost,id };
}



const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});



function Noticias(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows,setRows] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  Admin.props = props;

React.useEffect(() =>{
    var lc = fire.database().ref('noticias');
      

        lc.on("value",(snap) => {
            snap.forEach((c) => {
                  var nc = c.val();
                  setRows(prev=>[...prev,createData(nc.titulo,nc.tipo,nc.data,c.key)]);
            });
        });

},[]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
      <>
        <main  className={classes.content}>
          <Link href="/admin/addNoticia" >
            <Button style={{backgroundColor:"#023723",float:"right"}} round>
                <Add className={classes.icons} /> Noticia
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
                        <a>
                        <Link  href={{
                                  pathname: '/admin/editNoticia',
                                  query: { id: row.id },
                                }}
                        ><Edit/></Link></a>
                        <Link href="/admin/editNoticia"><Delete/></Link>
                        
                        
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
       
    </>
  );
}
Noticias.layout = Admin;

export default Noticias;


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