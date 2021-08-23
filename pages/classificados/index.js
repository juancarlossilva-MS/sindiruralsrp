import Head from 'next/head'
import React, { useEffect,useRef,useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Grid,Card,CardMedia,CardActionArea , CardContent ,Breadcrumbs,CardActions ,Typography,Button, Divider, InputBase} from "@material-ui/core";
import { AccessTime, Search} from "@material-ui/icons";
import Header from '../components/Header';
import Footer from '../components/Footer';
import fire from 'config/fire-config';
import { useRouter } from 'next/router'
import  Image  from 'next/image'
import  Link  from 'next/link'
import Badge from "components/Badge/Badge.js";

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
export default function ViewClassificados(){
const router = useRouter()
const { tituloNews } = router.query;
const [classificados,setClassificados] = useState([]);
const [image,setImage] = useState('');
const classes = useStyles();


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
  var query = fire.database().ref('classificados/').orderByChild("data").once("value").then((snap) => {

            snap.forEach((not) => {

                  var nc = not.val();
                  nc.imagem = JSON.parse(nc.imagem);
                  nc.key = not.key;
                  setClassificados((prev)=>[nc,...prev])
                  
                  
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
                        <Typography variant="h3">Classificados</Typography>
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
                <Grid container style={{padding:50}} >
                            

                {classificados.slice(0,load).map(classi=>{
                    return(
                      
                          <Grid item xs={12} sm={6}>
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
                
                
                <Button fullWidth style={{backgroundColor:"#023927",color:"#fafafa"}} onClick={()=>setLoad(load+5)}>Carregar Mais Classificados</Button>
            </Grid> 
            <Grid item xs></Grid>

        </Grid>
           <div style={{marginTop:80,marginBottom:-20}}>
              <Footer />
             </div>     
         
        </>
    );
}