import React, { Component,useRef, useEffect,useState } from "react";
import Slider from "react-slick";
import { makeStyles } from '@material-ui/core/styles';
import { AttachMoney,Phone, WhatsApp,AccessTime } from '@material-ui/icons';
import {Button,Divider, Grid, TextField} from '@material-ui/core';
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
import Header from '../components/Header';
import Footer from '../components/Footer';

import { useRouter } from 'next/router'



export default function Busca(){

const router = useRouter();
const busca = router.query.busca;

const [noticias,setNoticias] = useState([]);

useEffect(()=>{
    if(!router.isReady) return;

    console.log(busca)
    fire.database().ref('/noticias/').orderByChild("data").once("value").then((snap) => {

              snap.forEach((not) => {

                    var nc = not.val();

                   if((nc.titulo+nc.materia+nc.data).toLowerCase().includes(busca.toLowerCase())){
                        setNoticias((prev)=>[nc,...prev])
                   }
                    
              })
          });
  
  },[router])

  
function dataExtenso(data){
    const meses = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"]
    const date1 = new Date(data);
    return(date1.getDate()+" de "+meses[date1.getMonth()]+" de "+date1.getFullYear()+" às "+date1.getHours()+"h"+date1.getMinutes());
  
  }



  return(
    <>
    <Header/>
    <Grid container>
        <Grid item xs></Grid>
        <Grid item xs={8}>
               
                    <Typography variant="h3">Resultado da busca "{busca}"</Typography>
         
                
            
            <Divider/>

            {noticias.map(news=>{
                return(
                   <Link href={"/noticias/"+news.slug_name}><Button>
                    <Card style={{padding:15}}>
                         <Grid container  >
                        <Grid item xs={12} sm={4}>

                              <CardMedia 
                                image={"https://firebasestorage.googleapis.com/v0/b/sindiruralsrp.appspot.com/o/noticias%2F"+news.imagem+"?alt=media"}
                                style={{width:"16rem",height:"12rem"}}

                        />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                                <Typography style={{textAlign:"justify",lineHeight:"initial"}} variant="h6">{news.titulo}</Typography>

                                <Typography style={{textAlign:"justify",textTransform:"none",marginTop:"2%"}} variant="body2">{news.materia.replace(/<[^>]+>/g, '').slice(0,350) }</Typography>

                                <Typography style={{float:"right",marginTop:"5%"}} variant="caption">
                                  {news.tipo} • <AccessTime style={{fontSize:15,marginBottom:-3  }}/> {dataExtenso(news.data)}</Typography>
                        </Grid>
                      
                    
                    <Divider/>
                    </Grid>
                    </Card>
                    </Button>
                    </Link>
                )
            })

            }

        </Grid> 
        <Grid item xs></Grid>

    </Grid>
   
      <Footer/>
    </>
);
}
