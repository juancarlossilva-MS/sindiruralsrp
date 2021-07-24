import React, { Component,useRef, useEffect,useState } from "react";
import Slider from "react-slick";
import { makeStyles } from '@material-ui/core/styles';
import { AttachMoney,Phone, WhatsApp } from '@material-ui/icons';
import {Divider, Grid, TextField} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Clock from '@material-ui/icons/AccessTime';
import Typography from '@material-ui/core/Typography';
import fire from '../../config/fire-config';
import Link from 'next/link';
import { now } from 'moment';
import Button from "components/CustomButtons/Button.js";
import { useRouter } from 'next/router'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const useStyles = makeStyles({
  root: {
    maxWidth: 700,
  },
  media: {
    height: 320,
  },
  hiddenOverTitle:{
    maxHeight: "2rem",
    minHeight: "2rem",
    overflow: "hidden !important"
  },
  hiddenOver:{
    maxHeight: "4rem",
    minHeight: "4rem",
    overflow: "hidden !important"
  },
});

const fundo = {
  backgroundImage: "url(https://img.olx.com.br/images/99/995163295098899.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "50% center",
    filter: "blur(32px)",
    position: "fixed",
    height: "120%",
    width: "120%",
    transform: "translate(-32px, -32px)",
}
 
const settings = {
      
  infinite: true,
  speed: 500,
  
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        arrows:true,

        dots: false
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};
const settings2 = {
  
  infinite: true,
  speed: 500,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        
        infinite: true,
        arrows:true,

        dots: false
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};



export default function SyncSlider() {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [temImg, setTemImg] = useState(false);

  const [classificado,setClassificado] = useState({});

  const router = useRouter();
  const id = router.query.id;


  function formataData(data){

    const date1 = new Date(data);
  const date2 = new Date();
  const diffTime = Math.abs(date2 - date1);
  const diff= Math.ceil(diffTime / (1000 )); 
  if(diff < 60){
    return "Há menos de um minuto"
  }else{
    const diff = Math.ceil(diffTime / (1000 * 60)); 
    if(diff < 60){
      return "Há menos de "+diff+" minutos";
    }else{
      const diff = Math.ceil(diffTime / (1000 * 60 * 60)); 
      if(diff < 24){
        return "Há menos de "+diff+" horas";
      }else{
         
        if(diff < 48){
          return "ontem";
        }else{
          const diff = Math.round(diffTime / (1000 * 60 * 60 * 24));
          return "há "+diff+" dias";
        }
      }
    }
  }
  
  }


useEffect(()=>{
  if(classificado.imagem == null) return;
  console.log("entrou")
  console.log(classificado.imagem)
  setTemImg(true);
},[classificado.imagem])

useEffect(()=>{
  if(!router.isReady) return;
  fire.database().ref('classificados/'+id).once("value").then((snap) => {
            
                  var nc = snap.val();
                  nc.imagem = JSON.parse(nc.imagem);
                  
                  
                  document.title = nc.titulo +" • SindiRural SRP";
                  setClassificado(nc);
            
        });
},[router.isReady]);

const [width, setWindowWidth] = useState(0);

   useEffect(() => { 

     updateDimensions();

     window.addEventListener("resize", updateDimensions);
     return () => 
       window.removeEventListener("resize",updateDimensions);
    }, [])


const updateDimensions = () => {
  const width = window.innerWidth
  setWindowWidth(width)
}


function qtdImgs(){
  if(classificado == null || !temImg) return<></>;

  if(classificado.imagem.length < 5) return classificado.imagem.length;
  else return 5
}


    return (
    <div style={{paddingLeft:30,paddingRight:30}}>
      <Grid container >
        <Grid item xs={12} sm={5}>
          <h2 style={{fontWeight:"bold",lineHeight:"2rem"}}>{classificado.titulo}</h2>
         <h5>publicado {formataData(classificado.data)} • {classificado.nomeFiliado}</h5>
        </Grid>
        <Grid item xs={12} sm={7}>
              <Button round style={{backgroundColor:"#023927",fontSize:40}}>R$  {classificado.valor}</Button>
      
        </Grid>
      
      
      <Grid item xs={12} sm={6}>
      <div style={{maxWidth:580,height:320}}>

      <Slider asNavFor={nav2} ref={(slider1) => setNav1(slider1)} >
      {temImg && classificado.imagem.map((img)=>{ 
        return(<div   key={img}>
                 
        <div style={fundo}></div>
          <img
           
            src={"https://firebasestorage.googleapis.com/v0/b/sindiruralsrp.appspot.com/o/classificados%2F"+classificado.pastaImgClass+"%2F"+img+"?alt=media"}
                    
            title="Contemplative Reptile"
            style={{maxHeight: '320px',minHeight: '320px',width:"100%",position:"relative",
              objectFit: "contain"}}
          />
        
     
      </div>);
      })}
      </Slider>
      </div>
     </Grid>
     {width > 900 &&
      <Grid item xs={12} sm={2}> 
          <div style={{maxWidth:100,height:20,maxHeight:20}}>

              <Slider
                asNavFor={nav1}
                ref={(slider2) => setNav2(slider2)}
                slidesToShow={qtdImgs()}
                slidesPerRow={1}
                slidesToScroll={1}
                swipeToSlide={true}
                focusOnSelect={true}
                vertical= {true}
                arrows={true}
                verticalSwiping= {true}
                className={{
                  display: "flex", background: '#fff', width:"100%", minWidth: '100%',minHeight:"100px", maxHeight: '100px',
                }}>
                {temImg && classificado.imagem.map((img)=>{ 
                return(
                <div  style={{width:"100%"}} key={img}>
                    <Card>
                    
                      <img
                      
                        src={"https://firebasestorage.googleapis.com/v0/b/sindiruralsrp.appspot.com/o/classificados%2F"+classificado.pastaImgClass+"%2F"+img+"?alt=media"}
                                
                        title="Contemplative Reptile"
                        style={{maxHeight: '60px',minHeight: '60px',width:"100%",position:"relative",
                          objectFit: "contain"}}
                      />
                      </Card>
                  </div>
                );
                
                })}
              </Slider>
            
          </div>
    </Grid>
      }

    <Grid item xs={12} sm={3}>
      <Card style={{position: "relative",textAlign:"center"}}>
        <h3>{classificado.nomeFiliado}</h3>
        <h4 ><Phone style={{fontSize:"1.1rem"}} />     {"     "+classificado.telefone +"      " }
        {classificado.ehZap && <WhatsApp style={{fontSize:"1.2rem"}} />}
        
        </h4>
        <a href="/perfil" style={{color:"#023927"}}>Mais anuncios deste vendedor</a>
        <Divider/>
        <h5>Ficou interessado? Entre em contato!</h5>
        <Divider/>
        <TextField label="Seu Nome"></TextField>
        <Divider/>
        <TextField label="Seu Email"></TextField>
        <Divider/>
        <TextField label="Seu Telefone"></TextField>
        <Divider/>
        <Button style={{backgroundColor:"#023927"}}>ENVIAR!</Button>
      </Card>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Card style={{paddingLeft:30}}>
      <h3>R$ {classificado.valor}</h3>
      <h5><div dangerouslySetInnerHTML={{__html: classificado.materia}} /></h5>
    </Card>
    
    </Grid>


    </Grid>
    
    </div>
  );
}