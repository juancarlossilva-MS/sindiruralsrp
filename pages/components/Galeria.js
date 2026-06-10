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
      speed: 500,
     
      slidesToScroll: 1,
      autoplay:true,
      autoplaySpeed:2000,
      arrows:true,

      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
           
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
const [galeria,setGaleria] = useState([]);
const [numClass,setNumClass] = useState([]);
useEffect(()=>{
  
  var classList = fire.database().ref('galeria').orderByChild('data').limitToLast(8);
      

        classList.on("value",(snap) => {
           setNumClass(snap.numChildren())
            snap.forEach((cl) => {
                  var nc = cl.val();
                  nc.imagem = JSON.parse(nc.imagem);
                  
                  nc.key = cl.key;
                   setGaleria(prev =>[nc,...prev]);
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


    return (
      <>
        <Slider {...settings} slidesToShow={numClass < 3 ? numClass : 3}>

          {galeria?.length > 0 &&
              galeria.map((gal)=>{ 
            
              return(
               <div >
               <Card className={classes.root}>
               <Link href={{ pathname: '/exibir', query: { id: gal.key } }} className={{    marginLeft: "43%"}}>

           <CardActionArea>
             <CardMedia
               className={classes.media}
               image={"https://btgnews.tv.br/srsrp/galeria/"+gal.pastaImgClass+"/"+gal.imagem[0]+"?alt=media"}
                       
               title="Contemplative Reptile"
             />
             <CardContent>

               <Typography className={classes.hiddenOverTitle} gutterBottom variant="h5" component="h2">
                  {gal.titulo}
               </Typography>
              
             </CardContent>
           </CardActionArea>
            </Link>
       
         </Card>
      
               </div>
              
              );

          })
 
          }
         

          
        
        </Slider>
        {galeria?.length == 0 && <Typography className={classes.hiddenOverTitle} gutterBottom variant="h5" component="h2">
                  Galeria de fotos ainda nao cadastrada...
               </Typography>}
      </>
    );
  }



  