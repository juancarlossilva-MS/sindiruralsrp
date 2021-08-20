import React,{useEffect,useState} from "react";
// @material-ui/core components
import { Grid } from "@material-ui/core";
import Card from "components/Card/Card.js";
import fire from '../../config/fire-config';


export default function Empregos(){

        const [empregos,setEmpregos] = useState([]);
useEffect(()=>{
  
  var classList = fire.database().ref('empregos').orderByChild('data');
      

        classList.on("value",(snap) => {
            snap.forEach((cl) => {
                  var nc = cl.val();
                  
                  nc.key = cl.key;
                   setEmpregos(prev =>[nc,...prev]);
            });
        });
},[]);

return(
    <>
    {empregos.map((emp)=>{
                return(

                        <Grid item xs={12} md={4} style={{marginLeft:"0px"}}>
                                <Card style={{width:"94%",height:"60%"}}>
                                        
                                </Card>
                                
                        </Grid>
                )


    })}
           
            </>
    );
}
