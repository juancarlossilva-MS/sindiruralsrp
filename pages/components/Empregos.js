import React,{useEffect,useState} from "react";
// @material-ui/core components
import { CircularProgress,Dialog,DialogActions,DialogTitle,Button,DialogContent,DialogContentText,Grid,TextField, Typography,Snackbar } from "@material-ui/core";
import Card from "components/Card/Card.js";
import fire from '../../config/fire-config';
import MuiAlert from '@material-ui/lab/Alert';
import { useRef } from "react";
import {now} from "moment"
import { makeStyles } from '@material-ui/core/styles';
import MyBackDrop from '../components/MyBackDrop';


const useStyles = makeStyles((theme) => ({
       
        wrapper: {
          margin: theme.spacing(1),
          position: 'relative',
        },
        buttonProgress: {
          color: "#023927",
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginTop: -12,
          marginLeft: -12,
        },
      }));

export default function Empregos(){
  const classes = useStyles();

     
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

   

        const [empregos,setEmpregos] = useState([]);
useEffect(()=>{
  
  var classList = fire.database().ref('empregos');
      

        classList.on("value",(snap) => {
            snap.forEach((cl) => {
                  var nc = cl.val();
                  
                  nc.key = cl.key;
                   setEmpregos(prev =>[nc,...prev]);
            });
        });
},[]);
const [openModal, setOpenModal] = React.useState(false);
const [open, setOpen] = React.useState(false);
const [selEmp, setSelEmp] = React.useState(0);

let nomeCand = useRef('');
let emailCand = useRef('');
let phoneCand = useRef('');

function DelModal(){

        return(
          <Dialog
              open={openModal}
              onClose={()=>setOpenModal(false)}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
             <DialogTitle id="alert-dialog-title">Preencha o formulário para a vaga: {selEmp.descricao}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Observação {selEmp.obs}
                  <TextField inputRef={nomeCand} type="text" label="digite aqui seu Nome" fullWidth variant="standard"/>
                  <TextField inputRef={emailCand} type="mail" label="digite aqui seu E-Mail" fullWidth variant="standard"/>
                  <TextField inputRef={phoneCand} type="text" label="digite aqui seu Telefone" fullWidth variant="standard"/>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button  onClick={()=>setOpenModal(false)}  color="green">
                  Cancelar
                </Button>
                        <Button onClick={confirmaInsc}  color="green" autoFocus>
                
                                Confirmar
                        </Button>
     
              </DialogActions>
             
            </Dialog>
        )
}

async function confirmaInsc(){
        setOpen(true)

        let nomeCand2 = nomeCand.current.value
        let emailCand2 = emailCand.current.value
        let phoneCand2 = phoneCand.current.value
          setOpenModal(false);
                fire.database().ref("user").orderByChild("perfil").equalTo("admin").on("value",(snap)=>{
                    snap.forEach((admin)=>{
                        let adm = admin.key;
                   
                          fire.database().ref("notificacoes/"+adm).push({
                              titulo:"Uma pessoa se inscreveu para a vaga "+selEmp.descricao+"!",
                              data:now(),
                              tipo:"Candidato a Vaga de Emprego",
                              lida:false,
                              mensagem:JSON.stringify({"Nome":nomeCand2, "Email":emailCand2,"Telefone":phoneCand2,"Vaga para qual se inscreveu:":selEmp.descricao})
                          }).then(()=>{
                                  setAlertar(true);
                                  setOpen(false);
                                 
                          })
              
                          fire.database().ref("authkey").once("value").then((snap) => {
                            var key = snap.val();
                          fire.database().ref("tokens").orderByChild("user").equalTo(adm).once("value").then((snap) => {
              
                                snap.forEach((not) => {
              
                                      //var nc = not.val();
                                      const response = fetch("https://fcm.googleapis.com/fcm/send", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json",Authorization: key },
                                        body: JSON.stringify({
                                              "notification": {
                                                  title: "Uma pessoa se inscreveu para a vaga "+selEmp.descricao+"!",
                                                  body: "Alguém se inscreveu para uma vaga de emprego disponivel",
                                                  click_action: "https://sindiruralsrp.vercel.app/filiado/classificados",
                                                  icon: "https://sindiruralsrp.vercel.app/logosr.png"
                                              },
                                              "to": not.key
                                          })
                                      });
                                      response.then((re)=>{
                                        console.log(re)
                                      })
                                      console.log(response)
                                    
                                })
                            });
                            });
              
                 
                  })
                })
              
                
}
  

return(
    <>
    <Grid container>
    {empregos.map((emp)=>{
                return(

                        <Grid item xs={12} md={4} style={{marginLeft:"0px",marginBottom:-50}}>
                                <Card style={{width:"94%",height:"60%",padding:20}} onClick={()=>{setSelEmp(emp),setOpenModal(true)}}>
                                        <Typography variant="h5">
                                                {emp.descricao}
                                        </Typography>
                                        <Typography variant="body2">
                                               {emp.qtd+" Vaga(s) Disponível(is)"}  • {emp.obs}
                                        </Typography>
                                </Card>
                                
                        </Grid>
                )


    })}
    </Grid>
    <DelModal/>
        
        <Snackbar open={alertar} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                Seu contato foi enviado com sucesso!
                </Alert>
        </Snackbar>
        {open &&
        <MyBackDrop/>
        }
            </>
    );
}
