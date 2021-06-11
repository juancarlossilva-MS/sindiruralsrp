import Head from 'next/head'
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Header from './components/Header';
import Mercado from './components/Mercado';
import Classificado from './components/Classificado';
import CarouselNews from './components/CarouselNews';
import Card from "components/Card/Card.js";


export default function Home() {

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <div >
      <link
            rel="stylesheet"
            type="text/css"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons"
          />
          <link
            href="https://use.fontawesome.com/releases/v5.0.10/css/all.css"
            rel="stylesheet"
          />
      <Head>
        <title>Site Oficial do Sindicato Rural de Santa Rita do Pardo - MS</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header/>
      
      <div style={{padding:"0px"}}> 
        <Grid container  spacing={0}>
          <Grid container 
          >
            <Grid item  xs={12} md={1} style={{}}></Grid>
            <Grid item  xs={12} md={6} style={{}}>
                <CarouselNews />
            </Grid>
            <Grid item xs={12} md={4} >
                <CarouselNews tipoCar="cursos"/>
            </Grid>
          </Grid>
          <Card > 
            
            <Grid item xs={12} style={{}}>
                 <div style={{backgroundColor:"#023927",padding:5,display: "flex",alignItems: "center",justifyContent: "center"}}>
                  <span style={{width: "100%",color:"white",position: "relative",textAlign:"center",fontWeight:"bold",fontSize: "28px"}}>MERCADO AGRÍCOLA</span>
                </div>
            </Grid>
          <Grid container  spacing={0} style={{paddingLeft:20}}>
               <Mercado/>
          </Grid> 
          
          </Card>
          
           <Grid container  spacing={0} >
               <Classificado/>
          </Grid>
        </Grid>
      </div>




      
    </div>
  )
}
