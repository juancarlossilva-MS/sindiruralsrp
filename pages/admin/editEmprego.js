import React,{useEffect, useRef,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Table,Fab,TableBody,TableCell,TableContainer,MenuItem,FormControlLabel,Radio,Grid,
TextField,FormControl, FormLabel, RadioGroup, TableHead,TablePagination,TableRow, Divider} from "@material-ui/core"
import {Edit,Delete,Add, AddPhotoAlternate,Send} from "@material-ui/icons"
import Admin from "layout/admin";
import Link from "next/link";
import {useRouter} from "next/router";
import fire from "../../config/fire-config";
import Button from "components/CustomButtons/Button.js";
import dynamic from 'next/dynamic';
//import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Datetime from "react-datetime";
import { now } from 'moment';
import { withIronSession } from "next-iron-session";
import MyBackDrop from "../components/MyBackDrop"



const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
    
    input: {
      display: "none"
    },
  
    
  });
  


function EditEmprego() {
  const classes = useStyles();
  const [titulo, setTitulo] = useState('');
  const [qtd, setQtd] = React.useState(0);
  const [obs, setObs] = React.useState("");
  const [open, setOpen] = React.useState(false);
  

  const router = useRouter();

const [id,setId] = useState(router.query.id);

  
  useEffect(()=>{
    fire.database().ref("empregos/"+id).on("value",(snapshot)=>{
          let nc = snapshot.val();
          setTitulo(nc.descricao)
          setObs(nc.obs)
          setQtd(nc.qtd)

    });

  },[]);
  
function SubmitForm(){
    setOpen(true);
    
    if(titulo == ""){alert("Insira uma descrição"); return;}

    var news = fire.database().ref("empregos/"+id);

          
          news.update({
              descricao:titulo,
              qtd:qtd,
              obs:obs

          });
         router.push("/admin/empregos");
     
}




  return (
      <>
<link rel="stylesheet" href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"/>
      <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
        <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
        <script src="https://unpkg.com/react-quill@1.3.3/dist/react-quill.js"></script>
        <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
        <script type="text/babel" src="/my-scripts.js"></script>
        <main  className={classes.content}>
          <Paper className={classes.root}>
            <form style={{padding:25}} className={classes.root} noValidate autoComplete="off">
                    <Grid container style={{padding:25}}>
                      <Grid item xs={12}>
                          <TextField style={{width:"100%"}} 
                          onChange={(e)=> setTitulo(e.target.value)}
                          value={titulo} multiline required variant="standard" label="Descrição da vaga de emprego" />
                          <Divider/>
                      </Grid>
                      <Grid item xs={12} style={{paddingTop:25}}>
                          <TextField style={{width:"100%"}} value={obs} onChange={(e)=>setObs(e.target.value)} required variant="standard" label="Observação" />
                          <Divider/>
                      </Grid>
                      <Grid item xs={12} style={{paddingTop:25}}>
                          <TextField style={{width:"100%"}} value={qtd} onChange={(e)=>setQtd(e.target.value)} required variant="standard" label="Quantidade de Vagas" />
                          <Divider/>
                      </Grid>
                   
                      <Grid container style={{paddingTop:55}}>
                        
                        
                        <Grid item xs={12} sm={3}>

                        <Button onClick={SubmitForm} style={{float:"right", backgroundColor:"#023723"}} size="lg">
                            <Send/> Enviar
                        </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                     
                       
                    
                    </form>
        </Paper>
        </main>
        {open &&
          <MyBackDrop/>
        }
    </>
  );
}

EditEmprego.layout = Admin;

export default EditEmprego;


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