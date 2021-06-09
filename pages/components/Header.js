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
import LocationOn from '@material-ui/icons/LocationOn';

export default function WeHeader(){
  const useStyles = makeStyles(styles);

  const classes = useStyles();


return(
<Header
            brand={<Image src="/logo.png" width={250} height={65} />}
            color="green"
            leftLinks={
              <List className={classes.list}>
                <ListItem className={classes.listItem}>
                  <Button
                    href="#pablo"
                    className={classes.navLink}
                    onClick={(e) => e.preventDefault()}
                    color="transparent"
                  >
                    Início
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    href="#pablo"
                    className={classes.navLink}
                    onClick={(e) => e.preventDefault()}
                    color="transparent"
                  >
                    O Sindicato
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    href="#pablo"
                    className={classes.navLink}
                    onClick={(e) => e.preventDefault()}
                    color="transparent"
                  >
                    Cursos
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    href="#pablo"
                    className={classes.navLink}
                    onClick={(e) => e.preventDefault()}
                    color="transparent"
                  >
                    Noticias
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    href="#pablo"
                    className={classes.navLink}
                    onClick={(e) => e.preventDefault()}
                    color="transparent"
                  >
                    Acões Sociais
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    href="#pablo"
                    className={classes.navLink}
                    onClick={(e) => e.preventDefault()}
                    color="transparent"
                  >
                    Parceiros
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    href="#pablo"
                    className={classes.navLink}
                    onClick={(e) => e.preventDefault()}
                    color="transparent"
                  >
                    Mercado
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    href="#pablo"
                    className={classes.navLink}
                    onClick={(e) => e.preventDefault()}
                    color="transparent"
                  >
                    Classificados
                  </Button>
                </ListItem>
              
              </List>
            }            
            rightLinks={
                 <List className={classes.list} >
                  <ListItem className={classes.listItem}>
                    <a style={{color:"#023927"}} href="https://facebook.com/sindicatoruraldesantaritadopardoms"><Facebook/>/Sindicatoruraldesantaritadopardo</a>
                   
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <Phone/> (67) 3591 - 1400
                  </ListItem>
                  <ListItem className={classes.listItem}>

                    <LocationOn/>Rua Julio César Paulino Maia, 1845, Centro, Santa Rita do Pardo - MS
                  </ListItem>
                
                </List>

            }
            />
)}