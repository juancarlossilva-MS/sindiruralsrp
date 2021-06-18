import React,{useRef,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Table,Fab,TableBody,TableCell,TableContainer,MenuItem,FormControlLabel,Radio,
TextField,FormControl, FormLabel, RadioGroup, TableHead,TablePagination,TableRow, Divider} from "@material-ui/core"
import {Edit,Delete,Add, AddPhotoAlternate,Send} from "@material-ui/icons"
import Header from "./header";
import Admin from "layout/admin";
import Link from "next/link";
import fire from "../../config/fire-config";
import Button from "components/CustomButtons/Button.js";
import dynamic from 'next/dynamic';
//import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Datetime from "react-datetime";

const importJodit = () => import('react-quill');

const ReactQuill = dynamic(importJodit, {
    ssr: false,
});
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
    
    input: {
      display: "none"
    },
  
    
  });
  


function AddNoticia() {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [age, setAge] = React.useState('noticias');
  const [img, setImg] = React.useState();

  function handleUploadClick(event){
   // console.log(event.target.files[0]);
    var file = event.target.files[0];
    setImg(file);
    //const reader = new FileReader();
    //var url = reader.readAsDataURL(file);
    //console.log(file.name); // Would see a path?
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };


function SubmitForm(){
    console.log("here");
    console.log(img);
    var storageRef = fire.storage().ref();

// Create a reference to 'mountains.jpg'
    var ref = storageRef.child('noticias/'+img.name);       
    ref.put(img).then(function(snapshot) {
        console.log('Uploaded a blob or file!');
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
                    <div style={{padding:25}}>
                        <TextField style={{width:"100%"}} required variant="standard" label="Titulo da Noticia" />
                        <Divider/>
                     </div>
                    <div style={{padding:25}}>
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
                     </div>
                     <div style={{padding:25}}>   
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

                     </div>
                     <div style={{padding:25}}>   
                      <h4> Insira a Imagem de capa:
                      </h4>
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
                    
                        <FormControl style={{marginLeft:40}}>
                            <Datetime
                            inputProps={{ placeholder: "Insira a data aqui" }}
                            />
                        </FormControl>
                        <Button onClick={SubmitForm} style={{float:"right", backgroundColor:"#023723"}} size="lg">
                            <Send/> Enviar
                        </Button>
                    </div>
                    </form>
        </Paper>
        </main>
    </>
  );
}

AddNoticia.layout = Admin;

export default AddNoticia;