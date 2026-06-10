import React, { Component,useRef, useEffect,useState } from "react";
import { Button, Grid } from "@material-ui/core";

import fire from '../../config/fire-config';
import { useRouter } from 'next/router'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";



export default function SyncSlider() {
 

  const [galeria,setGaleria] = useState({});



  const router = useRouter();
  const id = router.query.id;



useEffect(()=>{
  if(!router.isReady) return;
  fire.database().ref('galeria/'+id).once("value").then((snap) => {
            
                  var nc = snap.val();
                  nc.imagem = JSON.parse(nc.imagem);
                  
                  
                  document.title = nc.titulo +" • SindiRural SRP";
                  setGaleria(nc);
            
        });
},[router.isReady]);

const [width, setWindowWidth] = useState(0);

   useEffect(() => { 

     updateDimensions();

     window.addEventListener("resize", updateDimensions);
     return () => 
       window.removeEventListener("resize",updateDimensions);
    }, [])


const updateDimensions = () => {
  const width = window.innerWidth
  setWindowWidth(width)
}

  const [visible, setVisible] = useState(4);
  const [selected, setSelected] = useState(null);

  const imagens = galeria.imagem || [];

  const getUrl = (img) =>
    `https://btgnews.tv.br/srsrp/galeria%2F${galeria.pastaImgClass}%2F${img}?alt=media`;

  return (
    <>
      <Grid container spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{marginBottom:15}}
      >
        <Grid item xs={12} sm={9}>
          <h2 style={{fontWeight:"bold",lineHeight:"2rem"}}>{galeria.titulo}</h2>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        
      
      <Grid xs={12} sm={1}></Grid>
      <Grid item xs={12} sm={10}>
        <div className="grid">
          {imagens.slice(0, visible).map((img) => (
            <div
              key={img}
              className="thumb"
              onClick={() => setSelected(img)}
            >
              <img src={getUrl(img)} alt="" />
            </div>
          ))}
        </div>

        {visible < imagens.length && (
          <Button  variant="contained" style={{backgroundColor:"#023927",marginTop:25,color:"white"}}

            onClick={() => setVisible((v) => v + 20)}
          >
            Carregar mais imagens
          </Button>
        )}

        {selected && (
          <div className="modal" onClick={() => setSelected(null)}>
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={getUrl(selected)} alt="" />

              <div className="acoes">
                <Button  variant="contained" style={{backgroundColor:"#023927",marginTop:25,color:"white"}}
                >
                  <a
                  href={getUrl(selected)}
                  download={selected}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{color:"white"}}
                >
                  Download
                </a>
                </Button>


                <Button variant="contained" style={{backgroundColor:"#7d0404",marginTop:25,color:"white"}}  onClick={() => setSelected(null)}>
                  Fechar
                </Button>
              </div>
            </div>
          </div>
        )}
        </Grid>

      <Grid xs={12} sm={1}></Grid>

      </Grid>
    </>
  );
}