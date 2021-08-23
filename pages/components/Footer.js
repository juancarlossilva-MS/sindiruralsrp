import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
import Button2 from "@material-ui/core/Button";
import Button from "components/CustomButtons/Button.js";
import Search from "@material-ui/icons/Search";
import Facebook from '@material-ui/icons/Facebook';
import Lock from '@material-ui/icons/Lock';
import Phone from '@material-ui/icons/Phone';
import Header from "components/Header/Header.js";
import styles from "styles/jss/nextjs-material-kit/pages/componentsSections/navbarsStyle.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { makeStyles } from "@material-ui/core/styles";
import Image from 'next/image';
import LocationOn from '@material-ui/icons/LocationOn';
import {useRouter} from "next/router"
import Link from "next/link"
import {useState,useEffect} from "react"


export default function WeHeader(){
  const useStyles = makeStyles(styles);

  const classes = useStyles();

const router = useRouter();


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


function whoColor(){
  if(width > 1100) return "#fafafa";
  if(width < 600) return "#023927";
}


return(
<Header
            brand={<Button2><Image src="/logoverde.png" width={320} height={72} /></Button2>}
            color="backgreen"
            leftLinks={
              <List className={classes.list}>
              <ListItem className={classes.listItem}>
                <Link href="/">
                <Button
             
                  className={classes.navLink}
                  color="transparent"
                  style={{color:whoColor()}}
                >
                  Início
                </Button>
                </Link>
              </ListItem>
              <ListItem className={classes.listItem}>
                <Button
                  href="/#pablo"
                  className={classes.navLink}
                  onClick={(e) => e.preventDefault()}
                  color="transparent"
                  style={{color:whoColor()}}
                >
                  O Sindicato
                </Button>
              </ListItem>
              <ListItem className={classes.listItem}>
                <Link href="/#cursos">
                <Button
                  
                  className={classes.navLink}
                  
                  color="transparent"
                  style={{color:whoColor()}}
                >
                  Cursos
                </Button>
                </Link>
              </ListItem>
              <ListItem className={classes.listItem}>
                <Link href="/noticias"> 
                <Button
                  
                  className={classes.navLink}
                  color="transparent"
                  style={{color:whoColor()}}
                  
                >
                   Noticias
                </Button></Link>
              </ListItem>
              <ListItem className={classes.listItem}>
                <Link href="/#empregos">
                <Button
                  
                  className={classes.navLink}
                  color="transparent"
                  style={{color:whoColor()}}
                >
                  Empregos
                </Button>
                </Link>
              </ListItem>
              <ListItem className={classes.listItem}>
              <Link  href="/#parceiros">
                <Button
                 
                  className={classes.navLink}
                  color="transparent"
                  style={{color:whoColor()}}
                >
                  Parceiros
                </Button>
                </Link >
              </ListItem>
              <ListItem className={classes.listItem}>
              <Link  href="/#mercado">
                <Button
                 
                  className={classes.navLink}
                  color="transparent"
                  style={{color:whoColor()}}
                >
                  Mercado
                </Button>
                </Link >
              </ListItem>
              <ListItem className={classes.listItem}>
                <Link href="/classificados"><Button
                 
                  className={classes.navLink}
                  color="transparent"
                  style={{color:whoColor()}}
                >
                 Classificados

                </Button></Link>
              </ListItem>
            
            </List>
             }            
            rightLinks={
                 <List className={classes.list} >
                  
                  <ListItem className={classes.listItem}>
                    <a style={{color:"#fafafa"}} href="https://facebook.com/sindicatoruraldesantaritadopardoms"><Facebook/>/Sindicatoruraldesantaritadopardo</a>
                   
                  </ListItem>
                  <ListItem className={classes.listItem}>
                      <a style={{color:"#fafafa"}} href="tel:6735411201">
                    <Phone/> (67) 3591 - 1201</a>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <a style={{color:"#fafafa"}} href="https://www.google.com/maps/place/Sindicato+Rural+de+Santa+Rita+do+Pardo/@-21.3047717,-52.8259072,18.17z/data=!4m13!1m7!3m6!1s0x948fddaf3de82285:0x13f550f1df57247b!2sR.+Dep.+J%C3%BAlio+C%C3%A9sar+Paulino+Maia,+1845,+Santa+Rita+do+Pardo+-+MS,+79690-000!3b1!8m2!3d-21.3046605!4d-52.8246739!3m4!1s0x948fdd0815d861dd:0x30ed25dc862e103c!8m2!3d-21.3047421!4d-52.8247021">
                    <LocationOn/>Rua Julio César Paulino Maia, 1845, Centro, Santa Rita do Pardo - MS
                    </a>
                  </ListItem>
              
                </List>

            }
            />
)}