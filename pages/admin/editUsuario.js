import React,{useRef,useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Table,Fab,TableBody,TableCell,TableContainer,MenuItem,FormControlLabel,Radio,Grid,Snackbar,
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
import MuiAlert from '@material-ui/lab/Alert';
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
  


function EditUsuario() {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [age, setAge] = React.useState('noticias');
  const [img, setImg] = React.useState();
  const [nome, setNome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [imgSel, setImgSel] = React.useState();
  const router = useRouter();
  
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
  
  


const [id,setId] = useState(router.query.id);
const [open, setOpen] = React.useState(false);

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
    fire.database().ref("user/"+id).on("value",(snapshot)=>{
          let nc = snapshot.val();
          setNome(nc.displayName)
          setEmail(nc.email)
          setAge(nc.perfil)
          
          setOld(nc.photoURL)

         
    });
  },[]);

useEffect(()=>{
  if(oldimg == null) return;
    var storage = fire.storage();

              storage.ref('usuarios/').child(oldimg).getDownloadURL().then(function(url) {
                getBase64FromUrl(url);
              }).catch(function(error) {
                // Handle any errors
              });
},[oldimg])


function addSemImg(){
  fire.database().ref("/user/"+id).set({
    email:email,
    displayName: nome,
    perfil:age,
    photoURL:oldimg
  }).then(()=>{
      router.push("/admin/usuarios");

  })
}

function addComImg(){
  const crypto = require("crypto");
  const imgname = crypto.randomBytes(16).toString("hex")
  var storageRef = fire.storage().ref();
  var ref = storageRef.child('usuarios/'+imgname);       
  ref.put(img).then(function(snapshot) {
     
        fire.database().ref("/user/"+id).set({
          email:email,
          displayName: nome,
          perfil:age,
          photoURL:imgname
        }).then(()=>{
           router.push("/admin/usuarios");

        })

        var imgref = storageRef.child('usuarios/'+oldimg);

        // Delete the file
        imgref.delete().then(function() {
          console.log("delete with success");
        }).catch(function(error) {
          // Uh-oh, an error occurred!
        });
     
  });

}

async function SubmitForm(){
    setOpen(true)
    var pw = password.current.value;
    if(email == ""){alert("Insira um Email"); return;}
    if(pw == ""){
      if(img == null){
          addSemImg()
      }else{
          addComImg()
      }
     }else{
          const tipo = "updateUser";
          const response = await fetch("/api/admin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tipo,id, pw})
              })

          
          if (response.ok) {
            if(img == null){
                addSemImg()
            }else{
                addComImg()
            }
          }else{
            setAlertar(true);
            setOpen(false)
          } 
    }

  
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
                          <TextField style={{width:"100%"}} type="text" onChange={(e)=>setNome(e.target.value)} value={nome} required variant="standard" label="Nome do Usuário" />
                          <Divider/>
                      </Grid>
                      <Grid item xs={12}>
                          <TextField style={{width:"100%"}} onChange={(e)=>setEmail(e.target.value)} type="email" value={email} required variant="standard" label="E-Mail" />
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

EditUsuario.layout = Admin;

export default EditUsuario;


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