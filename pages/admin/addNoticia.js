import React,{useRef,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Table,Fab,TableBody,TableCell,TableContainer,MenuItem,FormControlLabel,Radio,Grid,
TextField,FormControl, FormLabel, RadioGroup, TableHead,TablePagination,TableRow, Divider} from "@material-ui/core"
import {Edit,Delete,Add, AddPhotoAlternate,Send} from "@material-ui/icons"
import Admin from "layout/admin";
import Link from "next/link";
import fire from "../../config/fire-config";
import Button from "components/CustomButtons/Button.js";
import dynamic from 'next/dynamic';
//import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Datetime from "react-datetime";
import { now } from 'moment';
import { withIronSession } from "next-iron-session";

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
  


function AddNoticia() {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [age, setAge] = React.useState('noticias');
  const [img, setImg] = React.useState();
  const [imgSel, setImgSel] = React.useState();
  
  let titulo = useRef();
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
    var title = titulo.current.value;
    if(img == null){alert("Insira uma Image"); return;}
    if(title == ""){alert("Insira um Titulo"); return;}
    
    var storageRef = fire.storage().ref();
    var ref = storageRef.child('noticias/'+img.name);       
    
     console.log(title);
     console.log(age);
     console.log(value);
     var dataPost = data.current.state.inputValue;
     var type = null;
    if(age !== "noticias") type = true;
     ref.put(img).then(function(snapshot) {
        var news = fire.database().ref("noticias");
        news.push().set({
            titulo:title,
            materia:value,
            data:dataPost,
            imagem:img.name,
            tipo:age,
            ehCurso:type,
            slug_name: title.replace(/\s/g, '-')

        });
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
                          <TextField style={{width:"100%"}} inputRef={titulo} required variant="standard" label="Titulo da Noticia" />
                          <Divider/>
                      </Grid>
                    <Grid item xs={12} style={{paddingTop:25}}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Tipo da Noticia</FormLabel>
                        <RadioGroup aria-label="tipo" name="tipo" value={age} onChange={handleChange}>
                            <li style={{listStyle:"none"}}>
                            <FormControlLabel value="noticias" control={<Radio />} label="Noticias" />
                            <FormControlLabel value="cursos" control={<Radio />} label="Cursos" />
                            <FormControlLabel value="acoes" control={<Radio />} label="Ações Sociais" />
                            </li>
                        </RadioGroup>
                        </FormControl>
                        <Divider/>
                     </Grid>
                     <Grid item xs={12} style={{paddingTop:25}}>   
                     <ReactQuill 
                     style={{height:"23rem"}}
                     modules={{
                        toolbar: [
                          [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                          [{size: []}],
                          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                          [{'list': 'ordered'}, {'list': 'bullet'}, 
                           {'indent': '-1'}, {'indent': '+1'}],
                          ['link', 'image', 'video'],
                          ['clean']
                        ],
                        clipboard: {
                          // toggle to add extra line breaks when pasting HTML:
                          matchVisual: false,
                        }
                      }}
                     theme="snow" value={value} onChange={setValue}/>

                     </Grid>
                      <Grid container style={{paddingTop:55}}>
                        
                        <Grid item xs={12} sm={3}>
                        <h4> Insira a Imagem de capa:</h4>
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

                        <FormControl style={{marginLeft:40}}>
                            <Datetime
                            ref={data}
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
    </>
  );
}

AddNoticia.layout = Admin;

export default AddNoticia;


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