import "styles/scss/nextjs-material-kit.scss?v=1.2.0";
import React from 'react';

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);


  const Layout = Component.layout || (({ children }) => <>{children}</>);
  return (
      <>
       <Layout>
        <Component {...pageProps} />
        </Layout>
        </>);
}

export default MyApp
