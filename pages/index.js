import Head from 'next/head'
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Header from './components/Header';

export default function Home() {

  return (
    <div >
      <Head>
        <title>Site Oficial do Sindicato Rural de Santa Rita do Pardo - MS</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header/>
      <main >
        <h1 >
         Em breve aqui o mais novo do <br/><a href="">SINDICATO RURAL DE SANTA RITA DO PARDO!</a>
        </h1>

        

        <div >
          <a href="https://nextjs.org/docs" >
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" >
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      
    </div>
  )
}
