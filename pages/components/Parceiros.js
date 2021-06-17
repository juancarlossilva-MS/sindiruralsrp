import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Image from 'next/image';


export default function Parceiros(){
const styleImg = {
    width:"82%"
}
return(
    <Grid container  spacing={2}>


        <Grid item xs={12} md={1} >
        </Grid>
        <Grid item xs={12} md={2} >
            <Image width={40} height={30} layout="responsive" src="/img/notice.jpg"/>
        
        </Grid>
        
        <Grid item xs={12} md={2} >
            <Image width={40} height={30} layout="responsive" src="/img/notice.jpg"/>
        
        </Grid>
        
        <Grid item xs={12} md={2} >
            <Image width={40} height={30} layout="responsive" src="/img/notice.jpg"/>
        
        </Grid>
        
        <Grid item xs={12} md={2} >
            <Image width={40} height={30} layout="responsive" src="/img/notice.jpg"/>
        
        </Grid>
        
        <Grid item xs={12} md={2} >
            <Image width={40} height={30} layout="responsive" src="/img/notice.jpg"/>
        
        </Grid>
        
        <Grid item xs={12} md={1} >
        </Grid>
    
    
    </Grid   >



);


}