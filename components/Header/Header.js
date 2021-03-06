import React,{useState,useEffect} from "react";
import Link from "next/link";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";

import Image from 'next/image';
import Button2 from "@material-ui/core/Button";

// core components
import styles from "styles/jss/nextjs-material-kit/components/headerStyle.js";

const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  React.useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange);
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange);
      }
    };
  });
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const headerColorChange = () => {
    const { color, changeColorOnScroll } = props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  };
  const { color, rightLinks, leftLinks, brand, fixed, absolute } = props;
  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed,
  });

  
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

/*const brandComponent = () => {
      
  console.log("here"+width)
    
        return(
          <Link href="/" as="/" >
              <div className={classes.logo}>
        
              <Button2><Image src="../../logo.png" width={320} height={70} /></Button2>
        
              </div>
            </Link>
        )
    }else{
        return(
          <Link href="/" as="/" >
              <div className={classes.logo}>
        
            
        
              </div>
            </Link>
        )
    }
  
  }  */
  
  const brandComponent = (
    <Link href="/" as="/" >
      <div className={classes.logo}>
      {brand  ? brand :
      <Button2><Image src="/logo.png" width={389} height={85} /></Button2>
      }
      </div>
    </Link>
  );

  const brandComponentResp = (
    <Link href="/" as="/" >
      <div className={classes.logo}>
      {brand  ? brand :
      <Button2><Image src="/logo.png" width={320} height={70} /></Button2>
      }
      </div>
    </Link>
  );

  return (
    <AppBar className={appBarClasses}>
      <Toolbar className={classes.container} style={{maxWidth:"100%"}}>
        {leftLinks !== undefined ?  width < 600 ? brandComponentResp:brandComponent : null}
        <div style={{marginTop:"2%"}}>
          {leftLinks !== undefined ? (
            <Hidden smDown implementation="css">
              {leftLinks}
            </Hidden>
          ) : width < 600 ?            
            brandComponentResp
          :
           brandComponent
          }
        </div>
        <div style={{marginLeft: "-65%",marginTop: "-3%"}}> 
        <Hidden  smDown implementation="css">
          {rightLinks}
        </Hidden>
        </div>
        <Hidden mdUp>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={handleDrawerToggle}
        >
          <div className={classes.appResponsive}>
            {leftLinks}
            {rightLinks}
          </div>
        </Drawer>
      </Hidden>
    </AppBar>
  );
}

Header.defaultProp = {
  color: "white",
};

Header.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "green",
    "dark",
  ]),
  rightLinks: PropTypes.node,
  leftLinks: PropTypes.node,
  brand: PropTypes.node,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // props.color (see above)
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "transparent",
      "white",
      "rose",
      "green",
      "dark",
    ]).isRequired,
  }),
};
