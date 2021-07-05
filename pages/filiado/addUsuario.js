import React,{useRef,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Table,Fab,TableBody,TableCell,TableContainer,MenuItem,FormControlLabel,Radio,Grid,
TextField,FormControl, FormLabel, RadioGroup, TableHead,TablePagination,TableRow, Divider} from "@material-ui/core"
import {Edit,Delete,Add, AddPhotoAlternate,Send} from "@material-ui/icons"
import Header from "./header";
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
  


function AddUsuario() {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [age, setAge] = React.useState('noticias');
  const [img, setImg] = React.useState();
  const [imgSel, setImgSel] = React.useState();
  const router = useRouter();
  let email = useRef();
  let nome = useRef();
  let password = useRef();
  let data = useRef();

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
    console.log(url); 
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };


function SubmitForm(){
    var em = email.current.value;
    var pw = password.current.value;
    if(em == ""){alert("Insira um Email"); return;}
    if(pw == ""){alert("Insira uma Senha"); return;}
    
    fire.auth().createUserWithEmailAndPassword(em, pw)
    .then((userCredential) => {
       var user = userCredential.user;
            if(img == null){
              user.updateProfile({
                displayName: nome.current.value
              }).then(() => {
                fire.database().ref("/user/"+user.uid).set({
                    perfil:age
                }).then(()=>{
                   router.push("/admin/usuarios");

                })
              }).catch((error) => {
                console.log(error)
              });  
        
            }else{
              var storageRef = fire.storage().ref();
              var ref = storageRef.child('usuarios/'+img.name);       
              ref.put(img).then(function(snapshot) {
                  user.updateProfile({
                    photoURL: img.name,
                    displayName: nome.current.value
                  }).then(() => {
                    fire.database().ref("/user/"+user.uid).set({
                        perfil:age
                    }).then(()=>{
                       router.push("/admin/usuarios");
    
                    })
                  }).catch((error) => {
                    console.log(error)
                  });  
              });
            }
       
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });

  
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
                          <TextField style={{width:"100%"}} type="text" inputRef={nome} required variant="standard" label="Nome do Usuário" />
                          <Divider/>
                      </Grid>
                      <Grid item xs={12}>
                          <TextField style={{width:"100%"}} type="email" inputRef={email} required variant="standard" label="E-Mail" />
                          <Divider/>
                      </Grid>
                      <Grid item xs={12}>
                          <TextField style={{width:"100%"}} type="password" inputRef={password} required variant="standard" label="Senha" />
                          <Divider/>
                      </Grid>
                    <Grid item xs={12} style={{paddingTop:25}}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Tipo da Usuário</FormLabel>
                        <RadioGroup aria-label="tipo" name="tipo" value={age} onChange={handleChange}>
                            <li style={{listStyle:"none"}}>
                            <FormControlLabel value="admin" control={<Radio />} label="Administrador" />
                            <FormControlLabel value="filiado" control={<Radio />} label="Filiado" />
                            </li>
                        </RadioGroup>
                        </FormControl>
                        <Divider/>
                     </Grid>
                    
                      <Grid container style={{paddingTop:55}}>
                        
                        <Grid item xs={12} sm={3}>
                        <h4> Insira uma foto de Perfil:</h4>
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
    </>
  );
}

AddUsuario.layout = Admin;

export default AddUsuario;