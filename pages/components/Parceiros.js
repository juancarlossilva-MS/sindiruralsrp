
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
    maxWidth: 380,
  },
  media: {
    height: 190,
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
      arrows:false,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear",
      
      responsive: [
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
const [classificados,setClassificados] = useState([{img:"/img/notice.jpg"},{img:"/img/anuncie.png"},{img:"/img/notice.jpg"},{img:"/img/anuncie.png"},{img:"/img/notice.jpg"}]);

    return (
      <>
        <Slider {...settings}>

          {classificados.map((classi)=>{ 
            
              return(console.log(classificados),
               <div >
               <Card className={classes.root}>
              

           <CardActionArea>
             <CardMedia
               className={classes.media}
               image={classi.img}
                       
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



  