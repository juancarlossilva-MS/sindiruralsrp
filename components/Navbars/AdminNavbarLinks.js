import React from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import useWindowSize from "components/Hooks/useWindowSize.js";
import { useRouter } from 'next/router';
import styles from "assets/jss/nextjs-material-dashboard/components/headerLinksStyle.js";
import MyBackDrop from "pages/components/MyBackDrop"

import fire from "config/fire-config";

export default function AdminNavbarLinks(props) {
  const size = useWindowSize();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [openNotification, setOpenNotification] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const [user,setUser] = React.useState();
  

 React.useEffect(()=>{
  if(props.user != null){

      setUser(props.user.displayName);
    }
    
 },[props]) 

 const Parag = () => {
  
   return(
      <p className={classes.linkText}>{user}</p>
   )
 }

  
  const handleClickNotification = (event) => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };

    const router = useRouter();

  const logout = async (e) => {
    e.preventDefault();
    setOpen(true);
    const response = await fetch("/api/sessions", {
       method: "DELETE",
       headers: { "Content-Type": "application/json" }
       
     });
 
     if (response.ok) {
       return router.push("/login");
     }
 
   };

   function openEditProfile(){
     router.push({pathname:"/admin/editMyUsuario",query:{id:props.user.uid}})
   }

/*  const FalaToken = async()=>{
     console.log("aqui");
     try{
        const res = await askForPermissionToReceiveNotifications(props.user.uid);
      console.log("hehe");
      console.log(res)
      
     }catch(error){
       console.log(error)
     }
     
    }
    */


    const[notificacoes,setNotificacoes] = React.useState([]);
    const[notNoLida,setNotNoLida] = React.useState(0);
    const[tipoUser,setTipoUser] = React.useState("");

    React.useEffect(()=>{

      if(typeof window !== undefined){
        setTipoUser(window.location.pathname.split("/")[1])
      }
       const firenot =  fire.database().ref("notificacoes/"+props.user.uid).limitToLast(5);

        firenot.on("child_added",()=>{setNotificacoes([])})
        
       firenot.on("value",(snap)=>{
          snap.forEach((sn) => {
            let n = sn.val()
            setNotificacoes(prev => [n,...prev])
          
          })
            
        })
       

        fire.database().ref("notificacoes/"+props.user.uid).orderByChild("lida").equalTo(false).on("value",(snap)=>{

          setNotNoLida(snap.numChildren())
            
        });

    },[])

  return (
    <div>
       {open &&
          <MyBackDrop/>
        }
        
       
        
            

        
      
      <Button
        color={size.width > 959 ? "transparent" : "white"}
        justIcon={size.width > 959}
        simple={!(size.width > 959)}
        aria-label="Dashboard"
        className={classes.buttonLink}
      >
      
        <Dashboard className={classes.icons} />
        <Hidden mdUp implementation="css">
          <p className={classes.linkText}>Dashboard</p>
        </Hidden>
      </Button>
      <div className={classes.manager}>
        <Button
          color={size.width > 959 ? "transparent" : "white"}
          justIcon={size.width > 959}
          simple={!(size.width > 959)}
          aria-owns={openNotification ? "notification-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickNotification}
          className={classes.buttonLink}
        >
          <Notifications className={classes.icons} />
          <span className={classes.notifications}>{notNoLida}</span>
          <Hidden mdUp implementation="css">
            <p onClick={handleCloseNotification} className={classes.linkText}>
              Notification
            </p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openNotification }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    {notificacoes.map((not) =>{
                 
                  
                      return(
                          <MenuItem
                          onClick={()=>router.push("/"+tipoUser+"/notificacoes")}
                            className={classes.dropdownItem}
                          >
                             {!not.lida && <Chip  label="Não Lida" />}
                            {"   "+not.titulo}

                           
                          </MenuItem>
                        
                     )
                    
                    }
                     )

                    }
                    
                    <MenuItem
                      onClick={()=>router.push("/"+tipoUser+"/notificacoes")}
                      className={classes.dropdownItem}
                    >
                      Ver todas as notificações
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
      <div className={classes.manager}>
        <Button
          color={size.width > 959 ? "transparent" : "white"}
          justIcon={size.width > 959}
          simple={!(size.width > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <Parag/>
           
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      {user}
                    </MenuItem>
                    <MenuItem
                      onClick={openEditProfile}
                      className={classes.dropdownItem}
                    >
                      Editar meu Perfil
                    </MenuItem>
                    <Divider light />
                    <MenuItem
                      onClick={logout}
                      className={classes.dropdownItem}
                    >
                      Sair
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}
