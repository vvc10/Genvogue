// src/app/pages/_app.js
import '../app/styles/globals.css';
import { ThemeProvider } from 'styled-components';
import Head from 'next/head';

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;600&display=swap" 
          rel="stylesheet" 
        />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
