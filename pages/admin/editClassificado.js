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



function EditClassificado() {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [preco, setPreco] = React.useState(0);
  const [img, setImg] = React.useState([]);
  const [imgSel, setImgSel] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [titulo,setTitulo] = useState('');
  const [filiado, setFiliado] = React.useState();
  const [options,setOptions] = useState([]);
  const [ehZap, setEhZap] = React.useState(false);
  const [telefone, setTelefone] = React.useState(67);

  const handleToggle = () => {
    setOpen(!open);
  };
  //let titulo = useRef();
  let data = useRef();

 


  const router = useRouter();

const [id,setId] = useState(router.query.id);

const [oldimg,setOld] = useState([]);

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
    fire.database().ref("classificados/"+id).on("value",(snapshot)=>{
          let nc = snapshot.val();

          setTitulo(nc.titulo)
          setValue(nc.materia)
          setPreco(nc.valor)
          setOld(nc.imagem)
          setEhZap(nc.ehZap)
          setTelefone(nc.telefone)
          setNomePastaImgs(nc.pastaImgClass);
          fire.database().ref("user/"+nc.idFiliado).on("value",(snap)=>{
              const us = snap.val();
              setFiliado({displayName:us.displayName,email:us.email,photoURL:us.photoURL,key:snap.key})
          })

          var storage = fire.storage();

          storage.ref('classificados/').child(nc.pastaImgClass)

          var listRef = fire.storage().ref().child('classificados/'+nc.pastaImgClass);
          listRef.listAll().then(function(res) {
            let i = 0;
            res.items.forEach(function(itemRef){
                itemRef.getDownloadURL().then(async function(url) {
                  const retorno = await getBase64FromUrl(url);
                  img64 = img64.concat({[itemRef.name]:retorno})
                  imgRefs = imgRefs.concat({[retorno]:itemRef.name});
                  console.log(itemRef.name)
                  console.log(imgRefs)
                  i++;
                  if(res.items.length == i){
                  
                    setImgSel(img64)
                    setOld(imgRefs)
                  }
                }).catch(function(error) {
                  // Handle any errors
                });
                
            })

          });
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
console.log(imgSel)
    console.log(item)

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

    if((imgSel.length + file.length) > 8){ alert("Limite de imagens atingido!"); return;}
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

  const handleChange = (event, value, maskedValue) => {
    event.preventDefault();
    setPreco(value); 
  };

function SubmitForm(){
    
    var title = titulo;
    console.log(oldimg)
    if(img.length == 0 && imgSel.length == 0){alert("Insira uma Image"); return;}
    if(filiado == null){alert("Por favor, selecione um Anunciante"); return;}
    if(title == ""){alert("Insira um Titulo"); return;}

    handleToggle();

      console.log("adasdasd")
        var imgquefica = []
        imgSel.map(async(im)=>{
          await Object.keys(im)
            .forEach(function eachKey(key) { 
             
                imgquefica.push(key)
              }
            );
          })

          console.log(imgquefica)
          console.log(nomePastaImgs)
         
          

    
    var storageRef = fire.storage().ref();
    
     var dataPost = data.current.state.inputValue;

    var imgs = [];
    //let tilclass = (title + "-" +crypto.randomBytes(8).toString("hex")).replaceAll("/","-");
    

    Promise.all(
      img.map(async(i)=>{
          console.log("entrou aki no imgmap")
          var name = Object.keys(i)[0]
          var file = Object.values(i)[0]
          var ref = storageRef.child('classificados/'+nomePastaImgs+"/"+name);       
          await ref.put(file)/*.then(()=>{
            imgquefica = [...imgquefica,imgname];
          })*/
          

      }),
    )
    .then(async(url) => {

      console.log("saiu do promise")
     
      var listRef = fire.storage().ref().child('classificados/'+nomePastaImgs);


      await listRef.listAll().then(async function(res) {
        let i = 0;
        await res.items.forEach(async function(itemRef){
            if(imgquefica.includes(itemRef.name)){
                console.log("essa imagem vai ficar!")
            }else{
                await itemRef.delete();
                console.log("essa imagem vai deletar!")
            }
        })

    });

     console.log(imgquefica)

      var news = fire.database().ref("classificados/"+id);
            news.update({
                titulo:title,
                materia:value,
                data:dataPost,
                imagem:JSON.stringify(imgquefica),
                valor:preco,
                slug_name: title.replaceAll(/\s/g, '-'),
                idFiliado: filiado.key,
                nomeFiliado:filiado.displayName,
                pastaImgClass: nomePastaImgs,
                telefone:telefone,
                ehZap:ehZap
    
            }).then(function(){
                handleToggle();
                console.log("encerrou!!")
                window.location.href = ("/admin/classificados");
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
                          <TextField style={{width:"100%"}} value={titulo} onChange={(e)=>setTitulo(e.target.value)} required variant="standard" label="Titulo do Classificado" />
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

                      <Grid container style={{paddingTop:100}}>
                        <Grid item xs={12}>
                          {filiado &&
                            <Autocomplete
                                onChange={(event, newValue) => {
                                  if(newValue != null) setFiliado(newValue);
                                }}
                                id="controllable-states-demo"
                               
                                getOptionLabel={(option) => option.displayName}
                                defaultValue={filiado} // criar use effect para atualizar aqui
                                options={options}
                                style={{ width: 300 }}
                                renderInput={(params) => <TextField defaultValue={filiado.displayName} {...params} label="Anunciante" variant="outlined" />}
                              />  
                          
                        }
                          
                        </Grid>
                      </Grid>
                      <Grid container style={{paddingTop:40}}>
                        <Grid item xs={12}>
                          <InputLabel htmlFor="standard-adornment-amount">Telefone</InputLabel>

                          <InputMask mask="(99) 99999-9999" style={vamostestar} value={telefone} onChange={(e)=>setTelefone(e.target.value)} />

                          <FormControlLabel
        control={<Checkbox checked={ehZap} onChange={(e)=>setEhZap(!ehZap)} name="checkedA" />}
        label="É Whatsapp?"
      />
                        </Grid>
                      </Grid>
                      <Grid container style={{paddingTop:40}}>
                        <Grid item xs={12}>
                          <InputLabel htmlFor="standard-adornment-amount">Preço</InputLabel>
                          
                        <FormControl style={{width:"100%"}} className={classes.margin}>
                          <IntlCurrencyInput currency="BRL" style={vamostestar} config={currencyConfig}
            onChange={handleChange} value={preco} />  
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

EditClassificado.layout = Admin;

export default EditClassificado;


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