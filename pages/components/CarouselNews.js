import React,{useState,useRef, useEffect} from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import LocationOn from "@material-ui/icons/LocationOn";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import Skeleton from '@material-ui/lab/Skeleton';

import styles from "styles/jss/nextjs-material-kit/pages/componentsSections/carouselStyle.js";
import Badge from "components/Badge/Badge.js";
import stylesTypo from "styles/jss/nextjs-material-kit/pages/componentsSections/typographyStyle.js";
import Small from "components/Typography/Small.js";
import fire from '../../config/fire-config';
import Image from 'next/image'
import Link from 'next/link'
import { Typography } from "@material-ui/core";
import { AccessTime } from "@material-ui/icons";
import { IconContext } from "react-icons";

const useStyles = makeStyles(styles);
const useStylesTypo = makeStyles(stylesTypo);

export default function SectionCarousel(props) {
  const classes = useStyles();
  const {tipoCar} = props;
  const classesTypo = useStylesTypo();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };


 
function dataExtenso(data){
  const meses = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"]
  const date1 = new Date(data);
  return(date1.getDate()+" de "+meses[date1.getMonth()]+" de "+date1.getFullYear()+" às "+date1.getHours()+"h"+date1.getMinutes());

}


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


  if(tipoCar == "cursos"){
    const [cursos,setCursos] = useState([]);
    React.useEffect(() => {
      var lc = fire.database().ref('noticias').orderByChild("ehCurso").equalTo(true).limitToLast(8);
      

        lc.on("value",async(snap) => {
            await snap.forEach((c) => {
                  var nc = c.val();
                   setCursos(prev =>[...prev, nc]);
            });
            setLoading(false);
        });
  }, []);
  const [loading,setLoading] = useState(true);


    return (
        <div >
          <div className={classes.container} >
            <GridContainer>

              <GridItem xs={12} sm={12} >
                                     

              {loading ? (<Skeleton animation="wave" height={490} variant="rect" className={classes.media} />)
            :
            (
                <Card carousel style={{marginTop:0}}>
                  <div style={{backgroundColor:"#023927",padding:5}}>
                    <span style={{width: "100%",color:"white",marginLeft:"40%",fontWeight:"bold",fontSize: "28px"}}>CURSOS</span>
                  </div>  
                
                
                  <Carousel {...settings}>
                   {cursos.map((curso)=>{ 
                 

                 return(
                   <div>
                     <Link href={"/cursos/"+curso.slug_name } >
                        
                        <div style={{padding:"1%",marginBottom:"-6%",position:"absolute",zIndex:1000}}>
                                <Typography variant="body1" display="block" style={{color:"#fafafa",fontWeight:"bold",webkitTextStrokeWidth: "0.5px",textShadow: "black 0.2em 0.2em 0.3em",webkitTextStrokeColor: "#023927",overflow: "hidden !important"}} gutterBottom>
                                  
                                  <AccessTime style={{marginBottom:"-1.76%",textShadow: "black 0.2em 0.2em 0.3em",fontSize:20}}/> {dataExtenso(curso.data)}
                                

                                </Typography>
                            </div>
                            </Link>
                            <Link href={"/cursos/"+curso.slug_name } >
                        
                          <Image
                            src={"https://firebasestorage.googleapis.com/v0/b/sindiruralsrp.appspot.com/o/noticias%2F"+curso.imagem+"?alt=media"}
                            alt={curso.titulo}
                            width={520}
                            height={480}
                            layout='responsive'
                            placeholder="blur"
                            />
                            </Link>

                        <Link href={"/cursos/"+curso.slug_name } >
                        
                              <div className={classesTypo.typo} style={{padding:"1%",marginTop:-155}}>
                                  <Typography style={{color:"#fafafa",fontWeight:"bold",webkitTextStrokeWidth: "1px",textShadow: "black 0.2em 0.2em 0.3em",webkitTextStrokeColor: "#023927",lineHeight:1,maxHeight: "3rem",minHeight: "3rem",overflow: "hidden !important"}} variant="h5">

                                        {curso.titulo}
                                  </Typography>
                                  
                                
                                </div>
                              
                              </Link>
                        </div>

  





                        
                      )

                    })
                  }
                   
                   </Carousel>
                </Card>)}
              </GridItem>
            </GridContainer>
          </div>
        </div>
      );
  }else{
    const [noticias,setNoticias] = useState([]);
    React.useEffect(() => {
      var news = fire.database().ref('noticias').orderByChild("ehCurso").equalTo(null).limitToLast(8);
      

        news.on("value",async(snap) => {
            await snap.forEach((n) => {
                  var np = n.val();
                   setNoticias(prev =>[ np,...prev]);
            })
            setLoading(false);
        })
  }, []);  
  


  const [loading,setLoading] = useState(true);
 
  return (
    
    <div >
      <div className={classes.container}  >

        <GridContainer>
          <GridItem xs={12} sm={12} >
            {loading ? (<Skeleton animation="wave" height={490} variant="rect" className={classes.media} />)
            :
            (
            <Card carousel style={{marginTop:0,marginBottom:15}}>
              <Carousel {...settings} >
                {noticias.map((noticia)=>{ 
                 

                  return(

                    <div>
                     <Link href={"/noticias/"+noticia.slug_name } >
                       
                        <div style={{padding:"1%",marginBottom:"-6%",position:"absolute",zIndex:1000}}>
                           <Typography variant="subtitle1" display="block" style={{color:"#fafafa",fontWeight:"bold",webkitTextStrokeWidth: "0.5px",textShadow: "black 0.2em 0.2em 0.3em",webkitTextStrokeColor: "#023927",overflow: "hidden !important"}} gutterBottom>
                             
                              <AccessTime style={{marginBottom:"-1.65%"}}/> {dataExtenso(noticia.data)}   •   {noticia.tipo}
                            

                            </Typography>
                        </div>
                        </Link>
                        <Link href={"/noticias/"+noticia.slug_name } >
                      <Image
                        src={"https://firebasestorage.googleapis.com/v0/b/sindiruralsrp.appspot.com/o/noticias%2F"+noticia.imagem+"?alt=media"}
                        alt={noticia.titulo}
                        width={550}
                        height={width < 600 ? 620:410}
                        layout='responsive'
                        placeholder="blur"
                      />
                      </Link>
                       <Link href={"/noticias/"+noticia.slug_name } >
                      <div className={classesTypo.typo} style={{padding:"1%",marginTop:-150}}>
                          <Typography style={{color:"#fafafa",fontWeight:"bold",webkitTextStrokeWidth: "1px",textShadow: "black 0.2em 0.2em 0.3em",webkitTextStrokeColor: "#023927",lineHeight:1,maxHeight: "3rem",minHeight: "3rem",overflow: "hidden !important"}} variant={width<600 ? "h5":"h4"}>
                                {noticia.titulo}
                          </Typography>
                        
                        </div>
                      
                      </Link>
                       

                    </div>
                  
                  )

                })
              }
                
               
               </Carousel>
            </Card>
            )}
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
}
