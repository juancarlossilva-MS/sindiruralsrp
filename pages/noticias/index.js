import Head from 'next/head'
import React, { useEffect,useRef,useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Grid,Card,CardMedia,Breadcrumbs,Typography,Button, Divider, InputBase} from "@material-ui/core";
import { AccessTime, Search} from "@material-ui/icons";
import Header from '../components/Header';
import Footer from '../components/Footer';
import fire from 'config/fire-config';
import { useRouter } from 'next/router'
import  Image  from 'next/image'
import  Link  from 'next/link'
import Badge from "components/Badge/Badge.js";





export default function ViewNoticia(){
const router = useRouter()
const { tituloNews } = router.query;
const [noticias,setNoticias] = useState([]);
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
  document.title = "Noticias • SRSRP.COM.BR";
  var query = fire.database().ref('noticias/').orderByChild("data").once("value").then((snap) => {

            snap.forEach((not) => {

                  var nc = not.val();
                  
                 
                    setNoticias((prev)=>[nc,...prev])
                  
                  
            })
        });

},[])

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

let refBusca = useRef();

const [load,setLoad] = useState(2);
return(

        <>
        <Header/>
        <Grid container>
            <Grid item xs></Grid>
            <Grid item xs={8}>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h3">Noticias</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <div style={{marginTop:15}}>
                        <Search />
                        <InputBase placeholder="Procurar uma noticia"
                        inputRef={refBusca}
                        onKeyPress={(ev) => {
                         
                            if (ev.key === 'Enter') {
                               
                              router.push({pathname:"/noticias/busca",query:{busca:refBusca.current.value}})
                              ev.preventDefault();
                            }
                          }}
                        />
                        </div>
                    </Grid>
                </Grid>
                
                
                <Divider/>

                {noticias.slice(0,load).map(news=>{
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

                                    <Typography style={{textAlign:"justify",textTransform:"none",marginTop:"2%"}} variant="body2">{news.materia.replace(/<[^>]+>/g, '') .slice(0,350)}</Typography>

                                    <Typography style={{float:"right",marginTop:"5%"}} variant="caption">{news.tipo} • <AccessTime style={{fontSize:15 ,marginBottom:-3 }}/> {dataExtenso(news.data)}</Typography>
                            </Grid>
                          
                        
                        <Divider/>
                        </Grid>
                        </Card>
                        </Button>
                        </Link>
                    )
                })

                }
                <Button fullWidth style={{backgroundColor:"#023927",color:"#fafafa"}} onClick={()=>setLoad(load+5)}>Carregar Mais Noticias</Button>
            </Grid> 
            <Grid item xs></Grid>

        </Grid>
           <div style={{marginTop:80,marginBottom:-20}}>
              <Footer />
             </div>     
         
        </>
    );
}