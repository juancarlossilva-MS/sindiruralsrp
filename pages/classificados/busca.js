import React, { Component,useRef, useEffect,useState } from "react";
import Slider from "react-slick";
import { makeStyles } from '@material-ui/core/styles';
import { AttachMoney,Phone, WhatsApp,AccessTime,Search } from '@material-ui/icons';
import {Button,Divider, Grid, TextField,InputBase} from '@material-ui/core';
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




const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 190,
  },
  hiddenOverTitle:{
    maxHeight: "2rem",
    minHeight: "2rem",
    overflow: "hidden !important"
  },
  hiddenOver:{
    maxHeight: "4rem",
    minHeight: "4rem",
    overflow: "hidden !important"
  },
});


export default function Busca(){
  
  const classes = useStyles();
const router = useRouter();
const busca = router.query.busca;
const [load,setLoad] = useState(2);

const [classificados,setClassificados] = useState([]);

useEffect(()=>{
    if(!router.isReady) return;

    console.log(busca)
    document.title = "Resultado da busca "+busca+" • SRSRP.COM.BR";
    fire.database().ref('/classificados/').orderByChild("data").once("value").then((snap) => {

              snap.forEach((not) => {

                    var nc = not.val();
                    
                   if((nc.titulo+nc.materia+nc.data).toLowerCase().includes(busca.toLowerCase())){
                        nc.imagem = JSON.parse(nc.imagem);
                        nc.key = not.key;
                        setClassificados((prev)=>[nc,...prev])
                   }
                    
              })
          });
  
  },[router])

  
function dataExtenso(data){
    const meses = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"]
    const date1 = new Date(data);
    return(date1.getDate()+" de "+meses[date1.getMonth()]+" de "+date1.getFullYear()+" às "+date1.getHours()+"h"+date1.getMinutes());
  
  }

  function formataData(data){

    const date1 = new Date(data);
  const date2 = new Date();
  const diffTime = Math.abs(date2 - date1);
  const diff= Math.ceil(diffTime / (1000 )); 
  if(diff < 60){
    return "Há menos de um minuto"
  }else{
    const diff = Math.ceil(diffTime / (1000 * 60)); 
    if(diff < 60){
      return "Há menos de "+diff+" minutos";
    }else{
      const diff = Math.ceil(diffTime / (1000 * 60 * 60)); 
      if(diff < 24){
        return "Há menos de "+diff+" horas";
      }else{
         
        if(diff < 48){
          return "ontem";
        }else{
          const diff = Math.round(diffTime / (1000 * 60 * 60 * 24));
          return "há "+diff+" dias";
        }
      }
    }
  }
  
  }

let refBusca = useRef('');
  return(
    <>
    <Header/>
    <Grid container>
        <Grid item xs></Grid>
        <Grid item xs={8}>
               
         
                <Grid container>
                    <Grid item xs={12} sm={6}>
                       
                        <Typography variant="h3">Resultado da busca "{busca}"</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <div style={{marginTop:15}}>
                        <Search />
                        <InputBase placeholder="Procurar um Anúncio"
                        inputRef={refBusca}
                        onKeyPress={(ev) => {
                         
                            if (ev.key === 'Enter') {
                               
                              router.push({pathname:"/classificados/busca",query:{busca:refBusca.current.value}})
                              ev.preventDefault();
                            }
                          }}
                        />
                        </div>
                    </Grid>
                </Grid>
            
            <Divider/>

            <Grid container  >
                            

                            {classificados.slice(0,load).map(classi=>{
                                return(
                                  
                                      <Grid item xs={12} sm={6} style={{padding:50}}>
                                      <Card className={classes.root}>
                                      <Link href={{ pathname: '/produto', query: { id: classi.key } }} className={{    marginLeft: "43%"}}>
            
                                  <CardActionArea>
                                    <CardMedia
                                      className={classes.media}
                                      image={"https://firebasestorage.googleapis.com/v0/b/sindiruralsrp.appspot.com/o/classificados%2F"+classi.pastaImgClass+"%2F"+classi.imagem[0]+"?alt=media"}
                                              
                                      title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                    <Typography variant="caption" display="block" >
                                          <AccessTime style={{ fontSize: 13 }}/> { formataData(classi.data)}
                                      </Typography>
                                      <Typography className={classes.hiddenOverTitle} gutterBottom variant="h5" component="h2">
                                          {classi.titulo}
                                      </Typography>
                                      <Typography className={classes.hiddenOver} variant="body2" color="textSecondary" component="p">
                                        {classi.materia.slice(0,200).replace(/<[^>]+>/g, '')}
                                      </Typography>
                                    </CardContent>
                                  </CardActionArea>
                                    </Link>
                                  <CardActions>
                                    <Typography style={{color:"#023927"}} variant="h5" component="h2" >
                                      R$ {classi.valor}
                                    </Typography>
                                    <Link href={{ pathname: '/produto', query: { id: classi.key } }} className={{    marginLeft: "43%"}}>
                                        <Button style={{color:"#023927"}} simple>
                                          ver mais
                                        </Button>
                                      </Link>
                                    
                                  </CardActions>
                                </Card>
                              
                                      </Grid>
                                      
                                      )
                                    })
                                    
                                  }
                              </Grid>
                              <Button fullWidth style={{backgroundColor:"#023927",color:"#fafafa"}} onClick={()=>setLoad(load+5)}>Carregar Mais Resultados</Button>            

        </Grid> 
        <Grid item xs></Grid>

    </Grid>
     <div style={{marginTop:80,marginBottom:-20}}>
              <Footer />
             </div>     
         
    </>
);
}
