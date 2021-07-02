import Head from 'next/head'
import React, { useEffect,useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Grid,Card} from "@material-ui/core";
import Header from '../components/Header';
import fire from '../../config/fire-config';
import { useRouter } from 'next/router'
import  Image  from 'next/image'
import Badge from "components/Badge/Badge.js";





export default function ViewNoticia(){
const router = useRouter()
const { id } = router.query;
const [noticia,setNoticia] = useState('');
const [image,setImage] = useState('');

const back = {
    width: "100%",
    height: "340px",
    position: "relative",
    zIndex: "1",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundImage:image,
    filter: "brightness(0.5)"

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


useEffect(()=>{
    if(!router.isReady) return;
  fire.database().ref('noticias/').orderByChild("slug_name").equalTo(id).once("value").then((snap) => {

            snap.forEach((not) => {

                  var nc = not.val();
                  
                  console.log(nc)
                  setNoticia(nc)
            })
        });

},[])

useEffect(()=>{
   setImage("url(https://firebasestorage.googleapis.com/v0/b/sindiruralsrp.appspot.com/o/noticias%2F"+noticia.imagem+"?alt=media)");
},[noticia])

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

function paddingImg(){
   if(width > 1100) return 90;
   if(width < 600) return 20;
}

function sizeTxt(){
    if(width<600) return 40;
}


return(
        <>
        <Header/>
        <div style={{padding:paddingImg(),zIndex:"10",position:"absolute",color:"white"}}>
                <Badge  color="success" >{noticia.tipo}</Badge>
                <Badge color="success">{"publicado há " + formataData(noticia.data)}</Badge>

                <h1 style={{fontWeight:"900",fontSize:sizeTxt()}}>{noticia.titulo}</h1>
        </div>
        <div style={back}>
            
        </div>
        <Grid container>
            <Grid item xs></Grid>
            <Grid item xs={12}  sm={8}>
                <Card style={{padding:10}}>
                   <div style={{width:"80%",marginLeft:"10%",paddingBottom:50,paddingTop:10}}>
                       <Image 
                        src={"https://firebasestorage.googleapis.com/v0/b/sindiruralsrp.appspot.com/o/noticias%2F"+noticia.imagem+"?alt=media"}
                        width={40}
                        height={30}
                        
                        layout='responsive'
                        />
                   </div>
                   <div dangerouslySetInnerHTML={{__html: noticia.materia}} />
                   
                </Card>
            </Grid>
            <Grid item xs></Grid>

        </Grid>
        
        
       
                
        </>
    );
}