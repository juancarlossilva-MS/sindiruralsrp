import Head from 'next/head'
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Header from './components/Header';
import Footer from './components/Footer';
import Mercado from './components/Mercado';
import Classificado from './components/Classificado';
import Parceiros from './components/Parceiros';
import CarouselNews from './components/CarouselNews';
import Card from "components/Card/Card.js";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Send from '@material-ui/icons/Send';
import fire from '../config/fire-config';
import Image from 'next/image';
import Link from 'next/link';


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
        <link rel="icon" href="/logosr.png" />
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

         <Card>

           <Grid container style={{display:"block",padding:25}} spacing={0} >
               <Parceiros/>
               <br/>
               <Parceiros/>
          </Grid>


         </Card>

         
            <Grid container style={{padding:0}} spacing={0} >
               
                <Grid item xs={12} sm={2} ></Grid>
                <Grid item xs={12} sm={8} > 
                
                    <Card>
                          <Button href={"https://facebook.com/sindicatoruraldesantaritadopardoms"}>
                              <Image src="/conheca.png" width={1349} height={347} />
                            </Button>

                              
                      </Card>
                </Grid>
                <Grid item xs={12} sm={2} ></Grid>
                
                <Grid item xs={12} sm={2} ></Grid>
                <Grid item xs={12} sm={8} >
                                              <CardMedia
                                          component='video'
                                          
                                          image={"/videosindi.mp4"}
                                          autoPlay
                                          controls
                                          loop
                                
                                      />
                </Grid>
                <Grid item xs={12} sm={2} ></Grid>

                <Grid item xs={12} sm={3}></Grid>
                <Grid item xs={12} sm={6} spacing={0} >
                  <Card style={{padding:30}}>
                      <TextField required id="standard-required" label="Seu Nome"  />
                      <br/><TextField required id="standard-required" label="Seu Email"  />
                      <br/><TextField required id="standard-required" label="Seu Telefone"  />
                      <br/><Button style={{color:"white",backgroundColor:"#023928"}} fullWidth> Enviar!<Send/></Button>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={3}></Grid>

            </Grid>
        </Grid>
        
      </div>
     
          <Footer  />
      



      
    </div>
  )
}
