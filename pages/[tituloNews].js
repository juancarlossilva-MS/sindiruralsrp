import Head from 'next/head'
import React, { useEffect,useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Header from './components/Header';
import fire from '../config/fire-config';
import { useRouter } from 'next/router'
import  Image  from 'next/image'



export default function ViewNoticia(){
const router = useRouter()
const { tituloNews } = router.query;
const [noticia,setNoticia] = useState('');
useEffect(()=>{
    if(!router.isReady) return;
  fire.database().ref('noticias/').orderByChild("slug_name").equalTo(tituloNews).once("value").then((snap) => {

            snap.forEach((not) => {

                  var nc = not.val();
                  
                  console.log(nc)
                  setNoticia(nc)
            })
        });

},[])

    return(
        <>
        <Header/>
        <h1>{noticia.titulo}</h1>
        <Image 
        src={"https://firebasestorage.googleapis.com/v0/b/sindiruralsrp.appspot.com/o/noticias%2F"+noticia.imagem+"?alt=media"}
        width={100}
        height={50}
        layout='responsive'
        />
                
        </>
    );
}