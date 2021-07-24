import Head from 'next/head'
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Header from './components/Header';
import Mercado from './components/Mercado';
import ViewClassificado from './components/ViewClassificado';
import Parceiros from './components/Parceiros';
import CarouselNews from './components/CarouselNews';
import Card from "components/Card/Card.js";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Send from '@material-ui/icons/Send';
import fire from '../config/fire-config';
import Image from 'next/image';
import Footer from "./components/Footer"
import Classificado from "./components/Classificado"

export default function Home() {

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);


  React.useEffect(() => {

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
      <ViewClassificado/>
      <div style={{paddingRight:10,marginLeft:9,marginTop:60,marginBottom:-20}}>
          <h2 style={{fontWeight:"bold",marginLeft:50}}>Mais anúncios</h2>
         <Classificado/>
      </div>
      <div style={{marginTop:30,marginBottom:-20}}>
          <Footer  />
      </div>
     
      </div>
  );
}