
import React, { Component, useEffect,useState } from "react";
import Slider from "react-slick";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {CardMedia} from '@material-ui/core';
import Clock from '@material-ui/icons/AccessTime';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import fire from '../../config/fire-config';
import Link from 'next/link';
import Image from 'next/Image';
import { now } from 'moment';
import Button from "components/CustomButtons/Button.js";

const useStyles = makeStyles({
  root: {
    maxWidth: 485,
  },
  media: {
    height: 285,
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
      speed: 4000,
      autoplaySpeed: 4000,
      cssEase: "linear",
      
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
            autoplay: true,
            speed: 4000,
            autoplaySpeed: 4000,
            cssEase: "linear"
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2,
            infinite: true,
            dots: false,
            autoplay: true,
            speed: 4000,
            autoplaySpeed: 4000,
            cssEase: "linear"
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            infinite: true,
            dots: false,
            slidesToScroll: 1,
            autoplay: true,
            speed: 4000,
            autoplaySpeed: 4000,
            cssEase: "linear"
          }
        }
      ]
    };
const [classificados,setClassificados] = useState([]);

useEffect(()=>{

  fire.database().ref("parceiros").on("value",async(snap)=>{
  
     await snap.forEach((par)=>{
          setClassificados(prev=>[par.val(),...prev])
      })
      setLoading(false)

  })

  /*var storage = fire.storage();

storage.ref('parceiros/anuncie.png').getDownloadURL().then(function(url) {
  // `url` is the download URL for 'images/stars.jpg'

  /* This can be downloaded directly:
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function(event) {
    var blob = xhr.response;
  };
  xhr.open('GET', url);
  xhr.send();

  // Or inserted into an <img> element:
  var img = document.getElementById('myimg');
  img.src = url;
  setImg(url);
}).catch(function(error) {
  // Handle any errors
});*/

},[])
const [loading,setLoading] = useState(true);
const [img,setImg] = useState('');

    return (
      <>
        <Slider {...settings}>
        {loading ? (
             <Card className={classes.root}>
              <Skeleton animation="wave" variant="rect" style={{width:400,height:250}} />
              </Card>
            ) : 
         ( classificados.map((classi)=>{ 
            console.log(classificados)
              return(
               <div >
                 <Link href={classi.url}>
               <Card className={classes.root}>
              

                      <CardActionArea>
                      
                        <Image
                          src={"https://firebasestorage.googleapis.com/v0/b/sindiruralsrp.appspot.com/o/parceiros%2F"+classi.imagem+"?alt=media"}
                          layout="responsive"
                          width={450}
                          height={250}
                          title={classi.nome}
                        />
                    
                      </CardActionArea>
                    
                        </Card>
                        </Link>
               </div>
              );

          })
         
         )}
          
        
        </Slider>
      </>
    );
  }



  