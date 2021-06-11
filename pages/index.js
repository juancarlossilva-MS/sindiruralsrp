import Head from 'next/head'
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Header from './components/Header';
import CarouselNews from './components/CarouselNews';
import Card from "components/Card/Card.js";


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
          <Grid container 
          >
            <Grid item  xs={12} md={1} style={{}}></Grid>
            <Grid item  xs={12} md={6} style={{}}>
                <CarouselNews />
            </Grid>
            <Grid item xs={12} md={4} >
                <CarouselNews tipoCar="cursos"/>
            </Grid>
          </Grid>
          <Card > 
            
            <Grid item xs={12} style={{}}>
                 <div style={{backgroundColor:"#023927",padding:5,display: "flex",alignItems: "center",justifyContent: "center"}}>
                  <span style={{width: "100%",color:"white",position: "relative",textAlign:"center",fontWeight:"bold",fontSize: "28px"}}>MERCADO AGRÍCOLA</span>
                </div>
            </Grid>
          <Grid container  spacing={0} style={{paddingLeft:20}}>
               
                <Grid item xs={12} md={4} style={{marginLeft:"0px"}}>
                    <Card style={{width:"94%"}}>
                              <div dangerouslySetInnerHTML={{__html: `
                              <iframe src="https://www.noticiasagricolas.com.br/widgets/cotacoes?id=142&fonte=Tahoma&tamanho=12pt&largura=100%&cortexto=023927&corcabecalho=&corlinha=&imagem=false";width=100%&amp;colorscheme=light&amp;show_faces=true&amp;stream=false&amp;header=true&amp;height=100%" scrolling="yes" frameborder="0" style="border:none; overflow:hidden; width:100%; height:400px;" allowTransparency="true"></iframe>
                              `}} />;
                      </Card>
                      
                </Grid>
                <Grid item xs={12} md={4} style={{marginLeft:"0px"}}>
                      <Card style={{width:"94%"}}>
                      
                              <div dangerouslySetInnerHTML={{__html: `
                              <iframe src="https://www.noticiasagricolas.com.br/widgets/cotacoes?id=200&fonte=Tahoma&tamanho=12pt&largura=100%&cortexto=023927&corcabecalho=&corlinha=&imagem=false";width=100%&amp;colorscheme=light&amp;show_faces=true&amp;stream=false&amp;header=true&amp;height=100% " scrolling="yes" frameborder="0" style="border:none; overflow:hidden; width:100%; height:400px;" allowTransparency="true"></iframe>
                              `}} />;
                      </Card>
                </Grid>
                <Grid item xs={12} md={4} style={{marginLeft:"0px"}}>
                      <Card style={{width:"94%"}}>
                      
                              <div dangerouslySetInnerHTML={{__html: `
                              <iframe src="https://www.noticiasagricolas.com.br/widgets/cotacoes?id=141&fonte=Tahoma&tamanho=12pt&largura=100%&cortexto=023927&corcabecalho=&corlinha=&imagem=false";width=100%&amp;colorscheme=light&amp;show_faces=true&amp;stream=false&amp;header=true&amp;height=100% " scrolling="yes" frameborder="0" style="border:none; overflow:hidden; width:100%; height:400px;" allowTransparency="true"></iframe>
                              `}} />;
                      </Card>
                </Grid>
                <Grid item xs={12} sm={4} style={{marginLeft:"0px"}}>
                      <Card style={{width:"94%"}}>
                      
                              <div dangerouslySetInnerHTML={{__html: `
                              <iframe src="https://www.noticiasagricolas.com.br/widgets/cotacoes?id=217&fonte=Tahoma&tamanho=12pt&largura=100%&cortexto=023927&corcabecalho=&corlinha=&imagem=false";width=100%&amp;colorscheme=light&amp;show_faces=true&amp;stream=false&amp;header=true&amp;height=100% " scrolling="yes" frameborder="0" style="border:none; overflow:hidden; width:100%; height:400px;" allowTransparency="true"></iframe>
                              `}} />;
                      </Card>
                </Grid>
                <Grid item xs={12} sm={4} style={{marginLeft:"0px"}}>
                      <Card style={{width:"94%"}}>
                      
                              <div dangerouslySetInnerHTML={{__html: `
                              <iframe src="https://www.noticiasagricolas.com.br/widgets/cotacoes?id=143&fonte=Tahoma&tamanho=12pt&largura=100%&cortexto=023927&corcabecalho=&corlinha=&imagem=false";width=100%&amp;colorscheme=light&amp;show_faces=true&amp;stream=false&amp;header=true&amp;height=100% " scrolling="yes" frameborder="0" style="border:none; overflow:hidden; width:100%; height:400px;" allowTransparency="true"></iframe>
                              `}} />;
                      </Card>
                </Grid>
               
          </Grid> 
          </Card>
        </Grid>
      </div>




      
    </div>
  )
}
