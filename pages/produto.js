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
      </div>
  );
}