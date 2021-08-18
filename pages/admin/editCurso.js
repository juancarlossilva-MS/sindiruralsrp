import React,{useEffect, useRef,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Table,Fab,TableBody,TableCell,TableContainer,MenuItem,FormControlLabel,Radio,Grid,Switch,Typography,
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

const importJodit = () => import('react-quill');

const ReactQuill = dynamic(importJodit, {
    ssr: false,
});


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
  


function EditCurso() {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [imgSel, setImgSel] = React.useState();
  const [img, setImg] = React.useState();
  const [obs, setObs] = React.useState("");
  const [req, setReq] = React.useState("");
  const [local, setLocal] = React.useState("");
  const [insc, setInsc] = React.useState("");
  const [ch, setCh] = React.useState("");
  const [titulo, setTitulo] = React.useState("");
  const [open, setOpen] = React.useState(false);

  let dataInicio = useRef();
  let dataFim = useRef();



  const router = useRouter();

const [id,setId] = useState(router.query.id);

const [oldimg,setOld] = useState('');
const getBase64FromUrl = async (url) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob); 
    reader.onloadend = () => {
      const base64data = reader.result;   
      setImgSel(base64data)

      resolve(base64data);

    }
  });
}

  
  useEffect(()=>{
    fire.database().ref("cursos/"+id).on("value",(snapshot)=>{
          let nc = snapshot.val();
                      setTitulo(nc.descricao);
                      setObs(nc.obs);
                      setReq(nc.requisitos);
                      setLocal(nc.local);
                      setCh(nc.cargaHoraria);
                      setInsc(nc.recebendoInscricao);
                      setOld(nc.imagem)
         

          if(nc.imagem !== undefined){
            var storage = fire.storage();
  
            storage.ref('cursos/').child(nc.imagem).getDownloadURL().then(function(url) {
              getBase64FromUrl(url);
            }).catch(function(error) {
              // Handle any errors
            });

          }
    });
  },[]);
  
  
  function handleUploadClick(event){
   // console.log(event.target.files[0]);
    var file = event.target.files[0];
    setImg(file);
    //const reader = new FileReader();
    //var url = reader.readAsDataURL(file);
    //console.log(file.name); // Would see a path?
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
     setImgSel(reader.result);
      
    }.bind(this);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };


function SubmitForm(){
    setOpen(true);
    
    if(titulo == ""){alert("Insira um Nome"); return;}

    //var titulo = titulo.current.value;
    var dataI = dataInicio.current.state.inputValue;
    var dataF = dataFim.current.state.inputValue;

    var news = fire.database().ref("cursos/"+id);
    if(img == null){
          
          news.update({
            descricao:titulo,
            dataInicio:dataI,
            dataFim:dataF,
            obs:obs,
            requisitos:req,
            local:local,
            cargaHoraria:ch,
            recebendoInscricao:insc,

          });
      
    }else{ 
    
        const crypto = require("crypto");
        const imgname = crypto.randomBytes(16).toString("hex")
        var storageRef = fire.storage().ref();

        var ref = storageRef.child('cursos/'+imgname);       
      
        ref.put(img).then(function(snapshot) {
            
            news.update({
                descricao:titulo,
                dataInicio:dataI,
                dataFim:dataF,
                obs:obs,
                requisitos:req,
                local:local,
                cargaHoraria:ch,
                recebendoInscricao:insc,
                imagem:imgname,

            });
        });
        console.log(oldimg);
      var imgref = storageRef.child('cursos/'+oldimg);

        // Delete the file
        imgref.delete().then(function() {
          console.log("delete with success");
        }).catch(function(error) {
          // Uh-oh, an error occurred!
        });
    }
 
  
      router.push("/admin/cursos");
     
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
                          <TextField style={{width:"100%"}} value={titulo} onChange={(e)=>setTitulo(e.target.value)} required variant="standard" label="Nome do Curso" />
                          <Divider/>
                      </Grid>
                      <Grid item xs={12} style={{paddingTop:25}}>
                          <TextField style={{width:"100%"}} value={obs} onChange={(e)=>setObs(e.target.value)} required variant="standard" label="Observação" />
                          <Divider/>
                      </Grid>
                      <Grid item xs={12} style={{paddingTop:25}}>
                          <TextField style={{width:"100%"}} value={req} onChange={(e)=>setReq(e.target.value)} required variant="standard" label="Requisitos para participação" />
                          <Divider/>
                      </Grid>
                      <Grid item xs={12} style={{paddingTop:25}}>
                          <TextField style={{width:"100%"}} value={local} onChange={(e)=>setLocal(e.target.value)} required variant="standard" label="Local" />
                          <Divider/>
                      </Grid>
                      <Grid item xs={12} style={{paddingTop:25}}>
                          <TextField style={{width:"100%"}} value={ch} onChange={(e)=>setCh(e.target.value)} required variant="standard" label="Carga Horária" />
                          <Divider/>
                      </Grid>
                      <Grid item xs={12} style={{paddingTop:25}}>
                             <FormControlLabel
                                control={<Switch checked={insc} onChange={()=>setInsc(!insc)} name="checkedA" />}
                                label="Inscrições abertas?"
                              />
                      </Grid>
                    
                      <Grid container style={{paddingTop:55}}>
                        
                        <Grid item xs={12} sm={3}>
                        <h4> Insira a Imagem da logo do curso:</h4>
                        <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={handleUploadClick}
                        />
                        <label htmlFor="contained-button-file">
                        <Fab component="span" className={classes.button}>
                            <AddPhotoAlternate  />
                            
                        </Fab>
                        
                        </label>
                        <img src={imgSel} style={{maxWidth:"50%"}} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <Typography variant="h6" > Data de Inicio do Curso </Typography>
                            <FormControl style={{marginLeft:40}}>
                                <Datetime
                                ref={dataInicio}
                                initialValue={now()}
                                inputProps={{ placeholder: "Insira a data aqui" }}
                                />
                            </FormControl>
                            <Typography variant="h6" > Data do Fim do Curso </Typography>
                            <FormControl style={{marginLeft:40}}>
                                <Datetime
                                ref={dataFim}
                                initialValue={now()}
                                inputProps={{ placeholder: "Insira a data aqui" }}
                                />
                            </FormControl>
                        </Grid>
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

EditCurso.layout = Admin;

export default EditCurso;


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