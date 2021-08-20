
import React, { Component, useEffect,useState,useCallback,useRef } from "react";
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
import Image from 'next/image';
import { now } from 'moment';
import Button from "components/CustomButtons/Button.js";

const useStyles = makeStyles({
  root: {
    maxWidth: 350,
  },
  media: {
    height: 205,
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
      swipeToSlide: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2800,
      autoplaySpeed: 2800,
      cssEase: "linear",
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
            autoplay: true,
            speed: 2800,
            autoplaySpeed: 2800,
            cssEase: "linear",
            pauseOnHover: true,
            swipeToSlide: true
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
            speed: 2800,
            autoplaySpeed: 2800,
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
            speed: 2800,
            autoplaySpeed: 2800,
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

const [dragging, setDragging] = useState(false)

    const handleBeforeChange = useCallback(() => {
        
        setDragging(true)
    }, [setDragging])

    const handleAfterChange = useCallback(() => {
        setDragging(false)
    }, [setDragging])

    const handleOnItemClick = useCallback(
        e => {
            if (dragging) e.stopPropagation()
        },
        [dragging]
    ) 
const [loading,setLoading] = useState(true);
const [img,setImg] = useState('');

let slider1 = useRef();

    return (
      <>
        <Slider ref={slider1} beforeChange={handleBeforeChange}
          afterChange={handleAfterChange} {...settings}>
        {loading ? (
             <Card className={classes.root}>
              <Skeleton animation="wave" variant="rect" style={{width:350,height:205}} />
              </Card>
            ) : 
         ( classificados.map((classi)=>{ 
              return(
               <div  onClickCapture={handleOnItemClick} >
                 <Link href={classi.url}>
            
                        <img 
                        style={{maxHeight: '280px',minHeight: '280px',width:"100%",position:"relative",paddingleft:20,paddingRight:20,
                        objectFit: "contain"}}
                        src={"https://firebasestorage.googleapis.com/v0/b/sindiruralsrp.appspot.com/o/parceiros%2F"+classi.imagem+"?alt=media"}
                         />

                 </Link>
               </div>
              );

          })
         
         )}
          
        
        </Slider>
      </>
    );
  }



  