import React from "react";
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
    autoplay: false,
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

  const styleImg ={
    maxWidth: "100%",
    maxHeight: "20.4rem",
    minHeight: "20.4rem",
    minWidth: "100%",
  }

  if(tipoCar == "cursos"){
    return (
        <div >
          <div className={classes.container} >
    
            <GridContainer>
              <GridItem xs={12} sm={12} md={8} >
                <Card carousel style={{height:"83%"}}>
                  <Carousel {...settings}>
                    <div>
                      <img
                        src="/img/notice.jpg"
                        alt="First slide"
                        style={styleImg}
                      />
                      <div style={{padding:"1%"}}>
                        <Badge color="success">Logística</Badge>
                        <div className={classesTypo.typo} style={{padding:"0px"}}>
                        <h4>
                            COMITÊ teste EXTRAORDINÁRIO DA COVID-19 ATENDE SOLICITAÇÃO DO SINDICATO RURAL
                            <br />
                            <Small>O Comitê Extraordinário da Covid-19 atendeu à solicitação do Sindicato Rural de Dourados, realizada no último dia 30, e autorizou que produtores rurais, empresas Seguradoras de Seguros Agrícolas e de Planejamento e Assistência Técnica Rural, bem como seus funcionários e prepostos, realizem os serviços durante o lockdown decretado no município.</Small>
                        </h4>
                        </div>
                        
                      </div>
                    </div>
                    <div>
                      <img
                        src="/img/notice2.jpg"
                        alt="First slide"
                        style={styleImg}
                      />
                      <div style={{padding:"1%"}}>
                        <Badge color="success">Logística</Badge>
                        <div className={classesTypo.typo} style={{padding:"0px"}}>
                        <h4>
                        NOVA FERROESTE DEVE INICIAR OPERAÇÕES COM TRANSPORTE DE 26 MILHÕES DE TONELADAS DE CARGA
    
                            <br />
                            <Small>No “Ano Zero”, momento em que estiver concluída e iniciando suas operações, a Nova Ferroeste deverá atender...
                            </Small>
                        </h4>
                        </div>
                        
                      </div>
                    </div>
                    
                   
                   </Carousel>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      );
  }else{
  return (
    <div >
      <div className={classes.container} >

        <GridContainer>
          <GridItem xs={12} sm={12} md={8} >
            <Card carousel style={{height:"83%"}}>
              <Carousel {...settings}>
                <div>
                  <img
                    src="/img/notice.jpg"
                    alt="First slide"
                    style={styleImg}
                  />
                  <div style={{padding:"1%"}}>
                    <Badge color="success">Logística</Badge>
                    <div className={classesTypo.typo} style={{padding:"0px"}}>
                    <h4>
                        COMITÊ EXTRAORDINÁRIO DA COVID-19 ATENDE SOLICITAÇÃO DO SINDICATO RURAL
                        <br />
                        <Small>O Comitê Extraordinário da Covid-19 atendeu à solicitação do Sindicato Rural de Dourados, realizada no último dia 30, e autorizou que produtores rurais, empresas Seguradoras de Seguros Agrícolas e de Planejamento e Assistência Técnica Rural, bem como seus funcionários e prepostos, realizem os serviços durante o lockdown decretado no município.</Small>
                    </h4>
                    </div>
                    
                  </div>
                </div>
                <div>
                  <img
                    src="/img/notice2.jpg"
                    alt="First slide"
                    style={styleImg}
                  />
                  <div style={{padding:"1%"}}>
                    <Badge color="success">Logística</Badge>
                    <div className={classesTypo.typo} style={{padding:"0px"}}>
                    <h4>
                    NOVA FERROESTE DEVE INICIAR OPERAÇÕES COM TRANSPORTE DE 26 MILHÕES DE TONELADAS DE CARGA

                        <br />
                        <Small>No “Ano Zero”, momento em que estiver concluída e iniciando suas operações, a Nova Ferroeste deverá atender...
                        </Small>
                    </h4>
                    </div>
                    
                  </div>
                </div>
                
               
               </Carousel>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
}
