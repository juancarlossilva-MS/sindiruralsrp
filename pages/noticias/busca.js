import React, { Component,useRef, useEffect,useState } from "react";
import Slider from "react-slick";
import { makeStyles } from '@material-ui/core/styles';
import { AttachMoney,Phone, WhatsApp } from '@material-ui/icons';
import {Divider, Grid, TextField} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Clock from '@material-ui/icons/AccessTime';
import Typography from '@material-ui/core/Typography';
import fire from '../../config/fire-config';
import Link from 'next/link';
import { now } from 'moment';
import Button from "components/CustomButtons/Button.js";
import Header from '../components/Header';
import Footer from '../components/Footer';

import { useRouter } from 'next/router'



export default function Busca(){

const router = useRouter();
const busca = router.query.busca;

useEffect(()=>{
    console.log(busca)

},[router])
    return(
        <>
            <Header/>

            <Footer/>
        </>
    );
}