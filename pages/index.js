import Head from 'next/head'
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Header from './components/Header';
import CarouselNews from './components/CarouselNews';


export default function Home() {

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <div >
      <link
            rel="stylesheet"
            type="text/css"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons"
          />
          <link
            href="https://use.fontawesome.com/releases/v5.0.10/css/all.css"
            rel="stylesheet"
          />
      <Head>
        <title>Site Oficial do Sindicato Rural de Santa Rita do Pardo - MS</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header/>
      
      <div style={{padding:"0px"}}> 
        <Grid container  spacing={0}>
          
          <Grid item  xs={12} md={6} style={{marginLeft:"3%",marginRight:"2%"}}>
              <CarouselNews />
          </Grid>
          <Grid item xs={12} md={4} style={{marginLeft:"3%"}}>
              <CarouselNews tipoCar="cursos"/>
          </Grid>
          <Grid item xs={12} style={{marginLeft:"3%"}}>
               <div dangerouslySetInnerHTML={{__html: `
              <iframe src="https://www.noticiasagricolas.com.br/widgets/cotacoes?id=55&fonte=Tahoma&tamanho=10pt&largura=400px&cortexto=023927&corcabecalho=&corlinha=&imagem=false";width=450&amp;colorscheme=light&amp;show_faces=true&amp;stream=false&amp;header=true&amp;height=320 " scrolling="yes" frameborder="0" style="border:none; overflow:hidden; width:450px; height:250px;" allowTransparency="true"></iframe>
              `}} />;
               

          </Grid>

        </Grid>
      </div>




      
    </div>
  )
}
