import Head from 'next/head'
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Header from './components/Header';
import Mercado from './components/Mercado';
import Classificado from './components/Classificado';
import Parceiros from './components/Parceiros';
import CarouselNews from './components/CarouselNews';
import Card from "components/Card/Card.js";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Send from '@material-ui/icons/Send';


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
            <Grid item xs={12} style={{}}>
                 <div style={{backgroundColor:"#023927",padding:5,display: "flex",alignItems: "center",justifyContent: "center"}}>
                  <span style={{width: "100%",color:"white",position: "relative",textAlign:"center",fontWeight:"bold",fontSize: "28px"}}>CLASSIFICADOS</span>
                </div>
            </Grid>
           <Grid container style={{display:"block",padding:25}} spacing={0} >
               <Classificado/>
          </Grid>
          <Grid item xs={12} style={{}}>
                 <div style={{backgroundColor:"#023927",padding:5,display: "flex",alignItems: "center",justifyContent: "center"}}>
                  <span style={{width: "100%",color:"white",position: "relative",textAlign:"center",fontWeight:"bold",fontSize: "28px"}}>PARCEIROS</span>
                </div>
            </Grid>
           <Grid container style={{display:"block",padding:25}} spacing={0} >
               <Parceiros/>
               <br/>
               <Parceiros/>
          </Grid>
          <Grid item xs={12} style={{}}>
                 <div style={{backgroundColor:"#023927",padding:5,display: "flex",alignItems: "center",justifyContent: "center"}}>
                  <span style={{width: "100%",color:"white",position: "relative",textAlign:"center",fontWeight:"bold",fontSize: "28px"}}>
                    ASSOCIE-SE HOJE MESMO AO SINDICATO RURAL DE SANTA RITA DO PARDO - MS</span>
                </div>
            </Grid>
            <Grid container style={{padding:15}} spacing={3} >
                <Grid item xs ></Grid>
                <Grid item xs={6} spacing={0} >
                  <Card style={{padding:30}}>
                      <TextField required id="standard-required" label="Seu Nome"  />
                      <br/><TextField required id="standard-required" label="Seu Email"  />
                      <br/><TextField required id="standard-required" label="Seu Telefone"  />
                      <br/><Button style={{color:"white",backgroundColor:"#023928"}} fullWidth> Enviar!<Send/></Button>
                  </Card>
                </Grid>
                <Grid item xs ></Grid>

            </Grid>
        
        </Grid>
      </div>




      
    </div>
  )
}
