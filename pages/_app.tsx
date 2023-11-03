import type { AppProps } from 'next/app';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import NavBar from './(Components)/NavBar';
import Head from 'next/head';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    overflow-x: hidden;
  }

  * {
    padding: 0;
    margin: 0;
  }

  h1, h2, h3 {
    font-family: 'Yeseva One', serif;
  }

  h2 {
    font-size: 1.2rem;
    color: black;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1rem
  }
`;

interface ThemeInterface {
  colors: { [index: string]: string[] },
  fonts: { [index: string]: string },
  semanticColors: { [index: string]: any },
}

const colors = {
  brand: ["#013220", "#1B4D3E", "#7BA05B"],
  primary: ["#ffc1b1", "#ffd6cc", "#ffebe6"],
};

const theme: ThemeInterface = {
  colors,
  fonts: {
    brand: "'Yeseva One', serif"
  },
  semanticColors: {
    sixtyPercent: colors.primary[1],
    thirtyPercent: colors.primary[0],
    tenPercent: colors.brand[1],
    cardBgGradient: {
      rest: [`${colors.brand[1]}cc`, `${colors.brand[1]}dd`, `${colors.brand[1]}ee`],
    },
    bgGradient: [`#ffffffbb 10vh`, `#efefefef 100vh`],
    brandLogo: "white",
    navBarBg: colors.brand[0],
    pageIcon: {
      activeColor: "white",
      inactiveColor: [colors.primary[0]],
      hoverBg: `${colors.primary[1]}`
    }
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <NavBar />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}