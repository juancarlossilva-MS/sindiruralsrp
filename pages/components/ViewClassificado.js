import React, { Component, useEffect,useState } from "react";
import Slider from "react-slick";
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
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

export default function MediaCard() {
  const classes = useStyles();
  
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay:false,
      autoplaySpeed:2000,
      arrows:true,

      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
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
const [classificados,setClassificados] = useState([]);
useEffect(()=>{
  
  var classList = fire.database().ref('classificados').limitToLast(8);
      

        classList.on("value",(snap) => {
            snap.forEach((cl) => {
                  var nc = cl.val();
                  nc.imagem = JSON.parse(nc.imagem);
                   setClassificados(prev =>[...prev, nc]);
            });
        });
},[]);


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <Button
      className={className}
      style={{ ...style, display: "block", background: "#023927",width:"5%",right:"-2%",top:"48%" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;

  return (
    <Button
      className={className}
      style={{ ...style, display: "block", background: "#023927",width:"5%",left:"-2%",top:"48%" }}
      onClick={onClick}
    />
  );
}
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

    return (
      <>
        <Slider {...settings}>

          {classificados.map((classi)=>{
            
              return(
               <div >
               <Card className={classes.root}>
           <CardActionArea>
             <CardMedia
               className={classes.media}
               image={"https://firebasestorage.googleapis.com/v0/b/sindiruralsrp.appspot.com/o/classificados%2F"+classi.titulo+"%2F"+classi.imagem[0]+"?alt=media"}
                       
               title="Contemplative Reptile"
             />
             
           </CardActionArea>
          
          
         </Card>
      
               </div>
              );

          })}
         

          
        
        </Slider>
      </>
    );
  }



  