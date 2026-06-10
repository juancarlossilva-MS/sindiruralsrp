import React,{useRef,useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,GridList,Fab,GridListTile,GridListTileBar,Backdrop,CircularProgress,FormControlLabel,Radio,Grid,
TextField,FormControl, FormLabel, InputLabel,Checkbox, Input,InputAdornment,TableRow, Divider} from "@material-ui/core"
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
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import IntlCurrencyInput from "react-intl-currency-input"
import { withIronSession } from "next-iron-session";
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputMask from "react-input-mask";

const importJodit = () => import('react-quill');

const ReactQuill = dynamic(importJodit, {
    ssr: false,
});

const crypto = require("crypto");

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



function EditGaleria() {
  const classes = useStyles();
  const [img, setImg] = React.useState([]);
  const [imgSel, setImgSel] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [titulo,setTitulo] = useState('');
  const [options,setOptions] = useState([]);

  const handleToggle = () => {
    setOpen(!open);
  };
  //let titulo = useRef();
  let data = useRef();

 


  const router = useRouter();

const [id,setId] = useState(router.query.id);

const [oldimg,setOld] = useState([]);
const [nomesImagens,setNomesImagens] = useState('');

const getBase64FromUrl = async (url) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob); 
    reader.onloadend = () => {
      const base64data = reader.result;   
     // setImgSel(prev=>[...prev,base64data])

      resolve(base64data);

    }
  });
}

var img64 = [];
var imgRefs = [];

const [nomePastaImgs,setNomePastaImgs] = useState('');


useEffect(()=>{
    fire.database().ref("galeria/"+id).on("value",(snapshot)=>{
          let nc = snapshot.val();

          setTitulo(nc.titulo)
          setOld(nc.imagem)
          setNomesImagens(nc.imagem)
          setNomePastaImgs(nc.pastaImgClass);

      

          var imagens = JSON.parse(nc.imagem);
          
          let i = 0;
          imagens.map(async (foto) => {
              const retorno = await getBase64FromUrl('https://btgnews.tv.br/srsrp/galeria/'+nc.pastaImgClass+'/'+foto);
              img64 = img64.concat({[foto]:retorno})
              imgRefs = imgRefs.concat({[retorno]:foto});

              i++;
              if(imagens.length == i){
              
                setImgSel(img64)
                setOld(imgRefs)
              }
          })

         
      })
  },[]); 

  

  

useEffect(()=>{
  fire.database().ref("user").orderByChild("perfil").equalTo("filiado").on("value",(snap)=>{
    snap.forEach((c)=>{
          var us = c.val();
          setOptions(prev=>[...prev,{displayName:us.displayName,email:us.email,photoURL:us.photoURL,key:c.key}])
    });
  })
},[])


  const onClose = (event) => {
    var item = (event.currentTarget.name);


   /* console.log(item)
    
    imgSel.map((img)=>{
      let index = oldimg.indexOf(img);
      
      if(img[item] != undefined){
        
         //setImgSel(imgSel.splice(index))
      }
    })*/
  setImgSel(imgSel.filter(ac => Object.keys(ac)[0] !== item))

  /*oldimg.map((img)=>{
    Object.keys(img)
      .forEach(function eachKey(key) { 
        //console.log(key); // console.logs key
        let index = oldimg.indexOf(img);
        console.log(index)
        if(item == key){
          console.log(img[key]); // alerts value
         
          return;
        }
        
      });
  })
  console.log(oldimg)
  
    imgSel.filter(ac => ac !== item));*/

  };


  function handleUploadClick(event){
   // console.log(event.target.files[0]);
    var file = event.target.files;

    for(let i=0; i < file.length;i++){
      let imgname = crypto.randomBytes(16).toString("hex")
       addImgSel(file[i],imgname);
       setImg(prev => [...prev,{[imgname]:file[i]}]);
    }
  };

  function addImgSel(file,imgname){
    //const imgname = 
    console.log(imgname)
    console.log(file)
     var reader = new FileReader();
      var url = reader.readAsDataURL(file);
      reader.onloadend = function (e) {
        setImgSel(prev=>[...prev,{[imgname]:reader.result}]);
      }.bind(this);
  }

  function ImagensCarregadas(){
    return( 
    
        <GridList cellHeight={280} className={classes.gridList} cols={3}> 
            {imgSel.map((simg,index) => {
                var selim =  Object.values(simg)[0];
                var keyimg =  Object.keys(simg)[0];
                return(
                <GridListTile key={index} >
                  
                  <img src={selim}  />
                  <GridListTileBar
                      actionIcon={
                        <IconButton aria-label="close" name={keyimg} className={classes.closeButton} onClick={event=> onClose(event)}>
                          <CloseIcon />
                        </IconButton>
                      }
                    />
                </GridListTile>
              )})}

          </GridList>);
  }


function SubmitForm(){
    
    var title = titulo;

    if(img.length == 0 && imgSel.length == 0){alert("Insira uma Image"); return;}
    if(title == ""){alert("Insira um Titulo"); return;}

    handleToggle();

        var imgquefica = []
        imgSel.map(async(im)=>{
          await Object.keys(im)
            .forEach(function eachKey(key) { 
             
                imgquefica.push(key)
              }
            );
          })

         
          

      

    var imgs = [];
    //let tilclass = (title + "-" +crypto.randomBytes(8).toString("hex")).replaceAll("/","-");
    

    Promise.all(
      img.map(async(i)=>{
          
          var name = Object.keys(i)[0]
          var file = Object.values(i)[0]


            try{
        
            const formData = new FormData();
    
            formData.append("image", file);
            formData.append("title", name);
            formData.append("tipo", 'galeria/'+nomePastaImgs);
    
            const response = await fetch("https://btgnews.tv.br/srsrp/api.php", {
                method: "POST",
                body: formData,
                // credentials: "include", // se usar sessão
                headers: {
                    // Authorization: "Bearer TOKEN"
                }
            });
    
            const data = await response.json();
    
            if(!response.ok){
                throw new Error(data.error || "Erro no upload");
            }
    
    
        }catch(err){
    
            console.error(err);
            alert(err.message);
    
        }
          

      }),
    )
    .then(async(url) => {


      var imagens = JSON.parse(nomesImagens);
          
      let i = 0;
      imagens.map(async (foto) => {

     
            if(imgquefica.includes(foto)){
                console.log("essa imagem vai ficar!")
            }else{
                 try{
        
                    const formData = new FormData();

                    formData.append("file", 'galeria/'+nomePastaImgs+'/'+foto);
            
                    const response = await fetch("https://btgnews.tv.br/srsrp/delete.php", {
                        method: "POST",
                        body: formData,
                        // credentials: "include", // se usar sessão
                        headers: {
                            // Authorization: "Bearer TOKEN"
                        }
                    });
            
                    const data = await response.json();
            
                    if(!response.ok){
                        throw new Error(data.error || "Erro no upload");
                    }
            
            
                }catch(err){
            
                    console.error(err);
                    alert(err.message);
            
                }finally{
                    setOpen(false);
                }
                console.log("essa imagem vai deletar!")
            }

    });

  

      var news = fire.database().ref("galeria/"+id);
            news.update({
                titulo:title,
                
                imagem:JSON.stringify(imgquefica),
                slug_name: title.replaceAll(/\s/g, '-').replaceAll(/\//g, "-"),
              
                pastaImgClass: nomePastaImgs,
                
    
            }).then(function(){
                handleToggle();
                window.location.href = ("/admin/galeria");
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
                          <TextField style={{width:"100%"}} value={titulo} onChange={(e)=>setTitulo(e.target.value)} required variant="standard" label="Titulo da Galeria" />
                          <Divider/>
                      </Grid>
                

                      <Grid container style={{paddingTop:55}}>
                        
                        <Grid item xs={12} sm={3}>
                        <h4> Insira as Imagens do Produto:</h4>
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

EditGaleria.layout = Admin;

export default EditGaleria;


export const getServerSideProps = withIronSession(
  async ({ req, res }) => {
    const user = req.session.get("admin");
    if (!user) {
      const userfili = req.session.get("filiado");
      if(userfili){
        res.setHeader("location", "/filiado/galeria");
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