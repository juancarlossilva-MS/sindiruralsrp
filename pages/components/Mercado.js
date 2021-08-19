import React from "react";
// @material-ui/core components
import { Grid } from "@material-ui/core";
import Card from "components/Card/Card.js";


export default function Mercado(){
return(
    <>
    <Grid item xs={12} md={4} style={{marginLeft:"0px"}}>
                <Card style={{width:"94%",height:"60%"}}>
                          <div dangerouslySetInnerHTML={{__html: `
                          <iframe src="https://www.noticiasagricolas.com.br/widgets/cotacoes?id=91&fonte=Tahoma&tamanho=12pt&largura=100%&cortexto=023927&corcabecalho=&corlinha=&imagem=false";width=100%&amp;colorscheme=light&amp;show_faces=true&amp;stream=false&amp;header=true&amp;height=100%" scrolling="yes" frameborder="0" style="border:none; overflow:hidden; width:100%; height:200px;" allowTransparency="true"></iframe>
                          `}} />
                  </Card>
                  
            </Grid>
            <Grid item xs={12} md={4} style={{marginLeft:"0px"}}>
                  <Card style={{width:"94%",height:"60%"}}>
                  
                          <div dangerouslySetInnerHTML={{__html: `
                          <iframe src="https://www.noticiasagricolas.com.br/widgets/cotacoes?id=200&fonte=Tahoma&tamanho=12pt&largura=100%&cortexto=023927&corcabecalho=&corlinha=&imagem=false";width=100%&amp;colorscheme=light&amp;show_faces=true&amp;stream=false&amp;header=true&amp;height=100% " scrolling="yes" frameborder="0" style="border:none; overflow:hidden; width:100%; height:200px;" allowTransparency="true"></iframe>
                          `}} />
                  </Card>
            </Grid>
            <Grid item xs={12} md={4} style={{marginLeft:"0px"}}>
                  <Card style={{width:"94%",height:"60%"}}>
                  
                          <div dangerouslySetInnerHTML={{__html: `
                          <iframe src="https://www.noticiasagricolas.com.br/widgets/cotacoes?id=26&fonte=Tahoma&tamanho=12pt&largura=100%&cortexto=023927&corcabecalho=&corlinha=&imagem=false";width=100%&amp;colorscheme=light&amp;show_faces=true&amp;stream=false&amp;header=true&amp;height=100% " scrolling="yes" frameborder="0" style="border:none; overflow:hidden; width:100%; height:200px;" allowTransparency="true"></iframe>
                          `}} />
                  </Card>
            </Grid>
            <Grid item xs={12} sm={4} style={{marginLeft:"0px"}}>
                  <Card style={{width:"94%",height:"60%"}}>
                  
                          <div dangerouslySetInnerHTML={{__html: `
                          <iframe src="https://www.noticiasagricolas.com.br/widgets/cotacoes?id=12&fonte=Tahoma&tamanho=12pt&largura=100%&cortexto=023927&corcabecalho=&corlinha=&imagem=false";width=100%&amp;colorscheme=light&amp;show_faces=true&amp;stream=false&amp;header=true&amp;height=100% " scrolling="yes" frameborder="0" style="border:none; overflow:hidden; width:100%; height:200px;" allowTransparency="true"></iframe>
                          `}} />
                  </Card>
            </Grid>
            <Grid item xs={12} sm={4} style={{marginLeft:"0px"}}>
                  <Card style={{width:"94%",height:"60%"}}>
                  
                          <div dangerouslySetInnerHTML={{__html: `
                          <iframe src="https://www.noticiasagricolas.com.br/widgets/cotacoes?id=248&fonte=Tahoma&tamanho=12pt&largura=100%&cortexto=023927&corcabecalho=&corlinha=&imagem=false";width=100%&amp;colorscheme=light&amp;show_faces=true&amp;stream=false&amp;header=true&amp;height=100% " scrolling="yes" frameborder="0" style="border:none; overflow:hidden; width:100%; height:400px;" allowTransparency="true"></iframe>
                          `}} />
                  </Card>
            </Grid>
            <Grid item xs={12} sm={4} style={{marginLeft:"0px"}}>
                  <Card style={{width:"94%",height:"60%"}}>
                  
                          <div dangerouslySetInnerHTML={{__html: `
                          <iframe src="https://www.noticiasagricolas.com.br/widgets/cotacoes?id=114&fonte=Tahoma&tamanho=12pt&largura=100%&cortexto=023927&corcabecalho=&corlinha=&imagem=false";width=100%&amp;colorscheme=light&amp;show_faces=true&amp;stream=false&amp;header=true&amp;height=100% " scrolling="yes" frameborder="0" style="border:none; overflow:hidden; width:100%; height:400px;" allowTransparency="true"></iframe>
                          `}} />
                  </Card>
            </Grid>
            </>
    );
}
