import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
import Button from "components/CustomButtons/Button.js";
import Search from "@material-ui/icons/Search";
import Facebook from '@material-ui/icons/Facebook';
import Phone from '@material-ui/icons/Phone';
import Header from "components/Header/Header.js";
import styles from "styles/jss/nextjs-material-kit/pages/componentsSections/navbarsStyle.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { makeStyles } from "@material-ui/core/styles";
import Image from 'next/image';
import Button2 from "@material-ui/core/Button";

import Link from 'next/link';
import LocationOn from '@material-ui/icons/LocationOn';

export default function WeHeader(){
  const useStyles = makeStyles(styles);

  const classes = useStyles();


return(
<Header
            
            color="green"
            leftLinks={
              <List className={classes.list}>
                <ListItem className={classes.listItem}>
                <Link href="/">
                <Button
             
                  className={classes.navLink}
                  color="transparent"
                  
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
                  
                >
                  O Sindicato
                </Button>
              </ListItem>
              <ListItem className={classes.listItem}>
                <Link href="/#cursos">
                <Button
                  
                  className={classes.navLink}
                  
                  color="transparent"
                  
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
                  
                  
                >
                   Noticias
                </Button></Link>
              </ListItem>
              <ListItem className={classes.listItem}>
                <Link href="/#empregos">
                <Button
                  
                  className={classes.navLink}
                  color="transparent"
                  
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
                  
                >
                  Mercado
                </Button>
                </Link >
              </ListItem>
              <ListItem className={classes.listItem}>
                <Link href="/classificados"><Button
                 
                  className={classes.navLink}
                  color="transparent"
                  
                >
                 Classificados

                </Button></Link>
              </ListItem>
              
              </List>
            }            
            rightLinks={
                 <List className={classes.list} >
                  <ListItem className={classes.listItem}>
                    <a style={{color:"#023927"}} href="https://facebook.com/sindicatoruraldesantaritadopardoms"><Facebook/>/Sindicatoruraldesantaritadopardo</a>
                   
                  </ListItem>
                  <ListItem className={classes.listItem}>
                      <a style={{color:"#023927"}} href="tel:6735411201">
                    <Phone/> (67) 3591 - 1201</a>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <a style={{color:"#023927"}} href="https://www.google.com/maps/place/Sindicato+Rural+de+Santa+Rita+do+Pardo/@-21.3047717,-52.8259072,18.17z/data=!4m13!1m7!3m6!1s0x948fddaf3de82285:0x13f550f1df57247b!2sR.+Dep.+J%C3%BAlio+C%C3%A9sar+Paulino+Maia,+1845,+Santa+Rita+do+Pardo+-+MS,+79690-000!3b1!8m2!3d-21.3046605!4d-52.8246739!3m4!1s0x948fdd0815d861dd:0x30ed25dc862e103c!8m2!3d-21.3047421!4d-52.8247021">
                    <LocationOn/>Rua Julio César Paulino Maia, 1845, Centro, Santa Rita do Pardo - MS
                    </a>
                  </ListItem>
                
                </List>

            }
            />
)}