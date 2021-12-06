
import Head from 'next/head'
import React, { useEffect,useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Grid,Card,Breadcrumbs,Typography, Divider} from "@material-ui/core";
import Header from '../components/Header';
import Footer from '../components/Footer';
import fire from 'config/fire-config';
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

function dataExtenso(data){
    const meses = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"]
    const date1 = new Date(data);
    return(date1.getDate()+" de "+meses[date1.getMonth()]+" de "+date1.getFullYear()+" às "+date1.getHours()+"h"+date1.getMinutes());
  
  }


useEffect(()=>{
    if(!router.isReady) return;
  fire.database().ref('noticias/').orderByChild("slug_name").equalTo(id).once("value").then((snap) => {

            snap.forEach((not) => {

                  var nc = not.val();
                  

                  document.title = nc.titulo +" • SindiRural SRP";

                  fire.database().ref("noticias_materia/"+not.key).on("value",(snapshot)=>{
                    let nm = snapshot.val();
                    //setMateria(nm.materia)
                    setNoticia(Object.assign(nc,{materia:nm.materia}))

                  });
        
            })
        });

},[])

useEffect(()=>{
  if (typeof(window) !== 'undefined') {
    // code here
    setUrl(window.location.href)
    if (window.FB) {
        window.FB.XFBML.parse();
    }
  }
  
})
const [url,setUrl] = useState("");

function Comments(){
  return(
    <div class="fb-comments" data-href={"www.srsrp.com.br/cursos/"+id}  data-width="100%" data-numposts="5"></div>

  );
}

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
  if(width > 1100) return 30;
  if(width < 600) return 20;
}

function sizeTxt(){
   if(width<600) return 26.5;
}

useEffect(()=>{
 for(let i =3; i<document.getElementsByTagName("img").length-1;i++){
    document.getElementsByTagName("img")[i].style = "width:100%";
 }

})


return(
        <>
<div id="fb-root"></div>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v11.0&appId=513982276376854&autoLogAppEvents=1" nonce="LML6UvNI"></script>
        <Header/>
        <div style={{padding:paddingImg(),zIndex:"10",position:"absolute",color:"white"}}>
                <Badge  color="success" >{noticia.tipo}</Badge>
                <Badge color="success">{"publicado " + formataData(noticia.data)}</Badge>

                <h1 style={{fontWeight:"900",fontSize:sizeTxt()}}>{noticia.titulo}</h1>
        </div>
        <div style={back}>
            
        </div>
        <Grid container style={{backgroundColor:"#fff"}}>
       

          
            <Grid item xs></Grid>
            
            <Grid item xs={12}  sm={8} style={{padding:25}}>
                
 <Breadcrumbs aria-label="breadcrumb" >
        <h5 color="textPrimary">publicado dia {dataExtenso(noticia.data)} • {noticia.autor}</h5>
                </Breadcrumbs>
                   <div style={{width:"100%",marginLeft:"0%",paddingBottom:50,paddingTop:10}}>
                       <Image 
                        src={"https://firebasestorage.googleapis.com/v0/b/sindiruralsrp.appspot.com/o/noticias%2F"+noticia.imagem+"?alt=media"}
                        width={6}
                        height={3.5}
                        placeholder="blur"
                        layout='responsive'
                        />
                   </div>
                   <Typography variant="body1" gutterBottom>

                    <div dangerouslySetInnerHTML={{__html: noticia.materia}} />
                    </Typography>
                   <Divider/>
                  {url &&
                    <Comments/>
                  }
                


            </Grid>
            <Grid item xs></Grid>
           
        </Grid>
        
        
       
          <Footer/>
        </>
    );
}