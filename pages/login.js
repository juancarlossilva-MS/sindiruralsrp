import  Link2 from 'next/link';

import fire from '../config/fire-config';
import { useRouter } from 'next/router';

import React, { useEffect, useState} from 'react';
import {Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox,Link ,Grid,Box, Typography} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MyBackDrop from './components/MyBackDrop';
import { withIronSession } from "next-iron-session";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function Login(props) {
  const classes = useStyles();
  const router = useRouter();
  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [open, setOpen] = useState(false);
const [alertar, setAlertar] = useState(false);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setAlertar(false);
};

useEffect(()=>{
  console.log(props)
  if(props.user != null){
      setOpen(true);
     const userid = (props.user.user.uid);
     fire.database().ref("/user/"+userid).on('value', async(snapshot) => {
       if(snapshot.val() == null){
        const response = await fetch("/api/sessions", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
          
        });
    
        if (response.ok) {
          return router.push("/login");
        }
       }else{
         const data = snapshot.val();
         const tipo = data.perfil;
         return router.push("/"+tipo+"/classificados");
       }
        
     })
  } 

},[])
const handlerSubmit = async (e) => {
  e.preventDefault();
  await setOpen(true);
  fire.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    var user = userCredential.user;

    fire.database().ref("user/"+user.uid).on('value', async(snapshot) => {
      const data = snapshot.val();
      const tipo = data.perfil;
      console.log(tipo);
        const response = await fetch("/api/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password,tipo,user})
        });
       
        if (response.ok) {
          return router.push("/"+tipo+"/classificados");
        }else{
          setOpen(false);
        } 

    })

  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    setOpen(false)
    setAlertar(true)
    // ..
  });
  
}


const onChangeHandler = event => {
  const { name, value } = event.currentTarget;
  if (name === "email") {
    setEmail(value);
  } else if (name === "password") {
    setPassword(value);
  } 
};

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={event => onChangeHandler(event)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={event => onChangeHandler(event)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handlerSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Esqueceu a Senha?
              </Link>
            </Grid>
            
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      {open &&
            <MyBackDrop />
      }
      <Snackbar open={alertar} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Email ou senha incorretos! tente novamente
        </Alert>
      </Snackbar>
    </Container>
    
  );
}

export default Login;


export const getServerSideProps = withIronSession(
  async ({ req, res }) => {
    const user = req.session.get("filiado");
    if (!user) {
      const user = req.session.get("admin");
      if(user){
        return { props: {user} };
      }else{
        return { props: {} };
      } 
    }
    return {
      props: { user }
    };
  },
  {
    cookieName: "MYSITECOOKIE",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false
    },
    password: process.env.APPLICATION_SECRET
  }
);