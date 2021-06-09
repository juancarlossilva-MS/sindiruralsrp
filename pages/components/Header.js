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


export default function WeHeader(){
  const useStyles = makeStyles(styles);

  const classes = useStyles();


return(
<Header
            brand={<Image src="/logo.png" width={300} height={80} />}
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
              <div>
                 <List className={classes.list} >
                <ListItem className={classes.listItem}>
                  <Facebook/>/Sindicato
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Phone/> (67) 3591 - 1400
                </ListItem>
                
                <CustomInput
                  green
                  inputRootCustomClasses={classes.inputRootCustomClasses}
                  formControlProps={{
                    className: classes.formControl,
                  }}
                  inputProps={{
                    placeholder: "Search",
                    inputProps: {
                      "aria-label": "Search",
                      className: classes.searchInput,
                    },
                  }}
                />
                <Button justIcon round color="white">
                  <Search className={classes.searchIcon} />
                </Button>
                </List>
              </div>
            }
            />
)}