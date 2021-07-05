import React,{useRef,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,GridList,Fab,GridListTile,GridListTileBar,Backdrop,CircularProgress,FormControlLabel,Radio,Grid,
TextField,FormControl, FormLabel, InputLabel, Input,InputAdornment,TableRow, Divider} from "@material-ui/core"
import {Edit,Delete,Add, AddPhotoAlternate,Send} from "@material-ui/icons"
import Header from "./header";
import Admin from "layout/admin";
import Link from "next/link";
import router from "next/router";
import fire from "../../config/fire-config";
import Button from "components/CustomButtons/Button.js";
import dynamic from 'next/dynamic';
//import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Datetime from "react-datetime";
import { now } from 'moment';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import IntlCurrencyInput from "react-intl-currency-input"

const importJodit = () => import('react-quill');

const ReactQuill = dynamic(importJodit, {
    ssr: false,
});


const useStyles = makeStyles((theme)=>({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
    
  input: {
    display: "none"
  },
  
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  closeButton: {
    position: 'absolute',
   left:0,
   top:0,
    color: "red",
  },
})
);

const vamostestar ={
    font: "inherit",
    color: "currentColor",
    width: "100%",
    border: "0",
    height: "1.1876em",
    margin: "0",
    display: "block",
    padding: "6px 0 7px",
    minWidth: "0",
    background: "none",
    boxSizing: "content-box",
    animationName: "mui-auto-fill-cancel",
    letterSpacing: "inherit",
    animationDuration: "10ms",
    fontSize:"xx-large"
}

const currencyConfig = {
  locale: "pt-BR",
  formats: {
    number: {
      BRL: {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
  },
};



function AddClassificado() {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [preco, setPreco] = React.useState(0);
  const [img, setImg] = React.useState([]);
  const [imgSel, setImgSel] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  
  const handleToggle = () => {
    setOpen(!open);
  };
  let titulo = useRef();
  let data = useRef();
  

  const onClose = (event) => {
    var item = (event.currentTarget.name);
    setImgSel(imgSel.filter(ac => ac !== item));

  };
  function handleUploadClick(event){
   // console.log(event.target.files[0]);
    var file = event.target.files;

    if((imgSel.length + file.length) > 8){ alert("Limite de imagens atingido!"); return;}
    for(let i=0; i < file.length;i++){
      
       addImgSel(file[i]);
       setImg(prev => [...prev,file[i]]);
    }
  };

  function addImgSel(file){
     var reader = new FileReader();
      var url = reader.readAsDataURL(file);
      reader.onloadend = function (e) {
        setImgSel(prev=>[...prev,reader.result]);
      }.bind(this);
  }

  function ImagensCarregadas(){
    return(
      <GridList cellHeight={280} className={classes.gridList} cols={3}>
      {imgSel.map((simg,index) => (
        <GridListTile key={simg} >
          
          <img src={simg}  />
          <GridListTileBar
              actionIcon={
                <IconButton aria-label="close" name={simg} className={classes.closeButton} onClick={event=> onClose(event)}>
                  <CloseIcon />
                </IconButton>
              }
            />
        </GridListTile>
      ))}
    </GridList>
    );
       
             
  }

  const handleChange = (event, value, maskedValue) => {
    event.preventDefault();
    setPreco(value); 
  };

function SubmitForm(){
    handleToggle();
    var title = titulo.current.value;
    if(img == null){alert("Insira uma Image"); return;}
    if(title == ""){alert("Insira um Titulo"); return;}
    
    var storageRef = fire.storage().ref();
    
     var dataPost = data.current.state.inputValue;

    var imgs = [];
    Promise.all(
      img.map((i)=>{
        var ref = storageRef.child('classificados/'+title+"/"+i.name);       
          ref.put(i);
          imgs = [...imgs,i.name];

      }),
    )
    .then((url) => {
      var news = fire.database().ref("classificados/");
            news.push().set({
                titulo:title,
                materia:value,
                data:dataPost,
                imagem:JSON.stringify(imgs),
                valor:preco,
                slug_name: title.replace(/\s/g, '-')
    
            }).then(function(){
                handleToggle();
                router.push("/admin/classificados");
            });
    })
    .catch((error) => {
      console.log(`Some failed: `, error.message)
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
                          <TextField style={{width:"100%"}} inputRef={titulo} required variant="standard" label="Titulo do Classificado" />
                          <Divider/>
                      </Grid>
                    <Grid item xs={12} style={{paddingTop:25}}>

                     <FormControl component="fieldset">

                     <FormLabel component="legend">Descrição do Produto</FormLabel>
                     <Grid item xs={12} style={{paddingTop:25}}>   
                     <ReactQuill 
                     style={{height:"10rem"}}
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
                     </FormControl>
                     </Grid>

                      <Grid container style={{paddingTop:155}}>
                        <Grid item xs={12}>
                          <InputLabel htmlFor="standard-adornment-amount">Preço</InputLabel>
                          
                        <FormControl style={{width:"100%"}} className={classes.margin}>
                          <IntlCurrencyInput currency="BRL" style={vamostestar} config={currencyConfig}
            onChange={handleChange} />  
                        </FormControl>
                        </Grid>
                      </Grid>
                      <Grid container style={{paddingTop:55}}>
                        
                        <Grid item xs={12} sm={3}>
                        <h4> Insira as Imagens do Produto [max:8 imagens]:</h4>
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
                        </Grid>
                        <Grid item xs={12} sm={6}>

                        <FormControl style={{marginLeft:40,display:"none"}}>
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
                      <Grid container style={{paddingTop:55}}>
                        <Grid item xs={12}>
                            <ImagensCarregadas/>

                        </Grid>
                      </Grid>
                    </Grid>
                     
                       
                    
                    </form>
        </Paper>
        </main>
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
    </>
  );
}

AddClassificado.layout = Admin;

export default AddClassificado;