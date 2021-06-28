import React,{useState,useRef} from "react";
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

import styles from "styles/jss/nextjs-material-kit/pages/componentsSections/carouselStyle.js";
import Badge from "components/Badge/Badge.js";
import stylesTypo from "styles/jss/nextjs-material-kit/pages/componentsSections/typographyStyle.js";
import Small from "components/Typography/Small.js";
import fire from '../../config/fire-config';
import Image from 'next/image'
import Link from 'next/link'

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

  const styleCaption = {
    paddingBottom: "0px",
    position: "absolute",
    right: "0%",
    bottom: "-3%",
    left: "0%",
    zIndex: "10",
    paddingTop: "0",
    color: "#ffffff",
    textAlign: "center",
    zIndex: "3",
    display: "block",
    backgroundColor: "#0000005f",

  }

  const styleImgCursos ={
    maxWidth: "100%",
    maxHeight: "20.4rem",
    minHeight: "20.4rem",
    minWidth: "100%",
  }
  const styleImg ={
    maxWidth: "100%",
    maxHeight: "28rem",
    minHeight: "28rem",
    minWidth: "100%",
  }

 

  if(tipoCar == "cursos"){
    const [cursos,setCursos] = useState([]);
    React.useEffect(() => {
      var lc = fire.database().ref('noticias').orderByChild("ehCurso").equalTo(true).limitToLast(2);
      

        lc.on("value",(snap) => {
            snap.forEach((c) => {
                  var nc = c.val();
                   setCursos(prev =>[...prev, nc]);
            });
        });
  }, []);
    return (
        <div >
          <div className={classes.container} >
            <GridContainer>

              <GridItem xs={12} sm={12} >
                                     


                <Card carousel style={{marginTop:0}}>
                  <div style={{backgroundColor:"#023927",padding:5}}>
                    <span style={{width: "100%",color:"white",marginLeft:"40%",fontWeight:"bold",fontSize: "28px"}}>CURSOS</span>
                  </div>  
                
                
                  <Carousel {...settings}>
                   {cursos.map((curso)=>{ 
                 

                 return(
                   <div>
                     <Image
                       src={"https://firebasestorage.googleapis.com/v0/b/sindiruralsrp.appspot.com/o/noticias%2F"+curso.imagem+"?alt=media"}
                       alt={curso.titulo}
                       width={520}
                       height={410}
                       layout='responsive'
                     />
                          <div style={{padding:"1%"}}>
                            <Badge color="success">{curso.tipo}</Badge>
                            <div className={classesTypo.typo} style={{padding:"0px",marginBottom:"0px"}}>
                            <h4 style={{fontWeight:"400"}}>
                                {curso.titulo} </h4>
                               
                                <Small>{curso.materia.slice(0,500).replace(/<[^>]+>/g, '') }...</Small>
                           
                            </div>
                            
                          </div>
                        </div>
                      )

                    })
                  }
                   
                   </Carousel>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      );
  }else{
    const [noticias,setNoticias] = useState([]);
    React.useEffect(() => {
      var news = fire.database().ref('noticias').orderByChild("ehCurso").equalTo(null).limitToLast(2);
      

        news.on("value",(snap) => {
            snap.forEach((n) => {
                  var np = n.val();
                   setNoticias(prev =>[...prev, np]);
            });
        });
  }, []);
  
  return (
    
    <div >
      <div className={classes.container}  >

        <GridContainer>
          <GridItem xs={12} sm={12} >
            <Card carousel style={{marginTop:0,marginBottom:15}}>
              <Carousel {...settings} >
                {noticias.map((noticia)=>{ 
                 

                  return(
                    <div>
                     <Link href={"/"+noticia.slug_name } >

                      <Image
                        src={"https://firebasestorage.googleapis.com/v0/b/sindiruralsrp.appspot.com/o/noticias%2F"+noticia.imagem+"?alt=media"}
                        alt={noticia.titulo}
                        width={580}
                        height={410}
                        layout='responsive'
                      />
                      </Link>
                      <div style={{padding:"1%"}}>
                        <Badge color="success">{noticia.tipo}</Badge>
                        <div className={classesTypo.typo} style={{padding:"0px",marginBottom:"0px"}}>
                        <h4 style={{fontWeight:"bold"}}>
                            {noticia.titulo}</h4>
                           
                            <Small>{noticia.materia.slice(0,500)}...</Small>
                        
                        </div>
                        
                      </div>
                    </div>
                  )

                })
              }
                
               
               </Carousel>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
}
