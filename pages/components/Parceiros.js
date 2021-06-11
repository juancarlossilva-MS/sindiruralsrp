import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";


export default function Parceiros(){
const styleImg = {
    width:"82%"
}
return(
    <Grid container  spacing={0}>


        <Grid item xs={12} md={1}  spacing={0}>
        </Grid>
        <Grid item xs={12} md={2}  spacing={0}>
            <img style={styleImg} src="/img/notice.jpg"/>
        
        </Grid>
        
        <Grid item xs={12} md={2}  spacing={0}>
            <img style={styleImg} src="/img/notice.jpg"/>
        
        </Grid>
        
        <Grid item xs={12} md={2}  spacing={0}>
            <img style={styleImg} src="/img/notice.jpg"/>
        
        </Grid>
        
        <Grid item xs={12} md={2}  spacing={0}>
            <img style={styleImg} src="/img/notice.jpg"/>
        
        </Grid>
        
        <Grid item xs={12} md={2}  spacing={0}>
            <img style={styleImg} src="/img/notice.jpg"/>
        
        </Grid>
        
        <Grid item xs={12} md={1}  spacing={0}>
        </Grid>
    
    
    </Grid   >



);


}