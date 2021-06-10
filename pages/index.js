import Head from 'next/head'
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Header from './components/Header';
import CarouselNews from './components/CarouselNews';

export default function Home() {

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
          
          
          <Grid item  xs={6} md={8}>
              <CarouselNews />
          </Grid>
          <Grid item xs={6} md={4} >
              <CarouselNews tipoCar="cursos"/>
          </Grid>
        </Grid>
      </div>




      
    </div>
  )
}
