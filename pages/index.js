import Head from 'next/head'
import React,{useState} from "react";
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
//import {fire,askForPermissionToReceiveNotifications} from '../config/fire-config';
import Image from 'next/image';
import Link from 'next/link';
import fire from "config/fire-config"
import {now} from "moment"
import MyBackDrop from './components/MyBackDrop';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default function Home() {

  const [open, setOpen] = useState(false);
const [alertar, setAlertar] = useState(false);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setAlertar(false);
};

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);


  React.useEffect(() => {

  }, []);

  let name = React.useRef("");
  let email = React.useRef("");
  let phone = React.useRef("");

async function EnviarNovoFili(){
  fire.database().ref("user").orderByChild("perfil").equalTo("admin").on("value",(snap)=>{
      snap.forEach((admin)=>{
          let adm = admin.key;
     
            fire.database().ref("notificacoes/"+adm).push({
                titulo:"Uma pessoa deseja conhecer mais sobre o Sindicato!",
                data:now(),
                tipo:"novo filiado",
                lida:false,
                mensagem:JSON.stringify({"Nome":name.current.value, "Email":email.current.value,"Telefone":phone.current.value})
            }).then(()=>{
              setAlertar(true);
              setOpen(false);
              name.current.value= "" 
              email.current.value=""
              phone.current.value=""
            })

            fire.database().ref("authkey").once("value").then((snap) => {
              var key = snap.val();
            fire.database().ref("tokens").orderByChild("user").equalTo(adm).once("value").then((snap) => {

                  snap.forEach((not) => {

                        //var nc = not.val();
                        const response = fetch("https://fcm.googleapis.com/fcm/send", {
                          method: "POST",
                          headers: { "Content-Type": "application/json",Authorization: key },
                          body: JSON.stringify({
                                "notification": {
                                    title: "Sindicato Rural de Santa Rita do Pardo informa",
                                    body: "Alguém deseja conhecer mais sobre o sindicato!",
                                    click_action: "https://sindiruralsrp.vercel.app/filiado/classificados",
                                    icon: "https://sindiruralsrp.vercel.app/logosr.png"
                                },
                                "to": not.key
                            })
                        });
                        response.then((re)=>{
                          console.log(re)
                        })
                        console.log(response)
                      
                  })
              });
              });

   
    })
  })

  }

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





          
          <Grid item xs={12} style={{}}>
                 <div style={{backgroundColor:"#023927",padding:5,display: "flex",alignItems: "center",justifyContent: "center"}}>
                  <span style={{width: "100%",color:"white",position: "relative",textAlign:"center",fontWeight:"bold",fontSize: "28px"}}>PARCEIROS</span>
                </div>
            </Grid>


          <Grid container style={{display:"block",paddingTop:10,paddingLeft:25,paddingRight:25}} spacing={0} >
              <Parceiros/>
            
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
                                          
                                          image={"http://btgnews.com.br/vendor/videosindi.mp4"}
                                          autoPlay
                                          controls
                                          loop
                                
                                      />
                </Grid>
                <Grid item xs={12} sm={2} ></Grid>

                <Grid item xs={12} sm={3}></Grid>
                <Grid item xs={12} sm={6} >
                  <Card style={{padding:30}}>
                      <TextField inputRef={name} required id="standard-required" label="Seu Nome"  />
                      <br/><TextField inputRef={email} required id="standard-required" label="Seu Email"  />
                      <br/><TextField inputRef={phone} required id="standard-required" label="Seu Telefone"  />
                      <br/><Button style={{color:"white",backgroundColor:"#023928"}} onClick={()=> setOpen(true),EnviarNovoFili} fullWidth> Enviar!<Send/></Button>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={3}></Grid>

            </Grid>
        </Grid>
        
      </div>

          <Footer  />
      

          <Snackbar open={alertar} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Seu contato foi enviado com sucesso!
        </Alert>
      </Snackbar>
    {open &&
      <MyBackDrop/>
    }


      
    </div>
  )
  
}
