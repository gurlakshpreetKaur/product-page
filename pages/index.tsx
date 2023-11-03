import Head from 'next/head'
import Image from 'next/image'

import styled from 'styled-components'
import Section, { SectionWithProducts } from './(Components)/Section';
import { ProductGrid } from './(Components)/ProductComponents';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

const Main = styled.main`
  background:
    linear-gradient(180deg, ${props => props.theme.semanticColors.bgGradient.join(',')}),
    url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");

  height: auto;
  overflow-y: auto;
  overflow-x: hidden;
`

const TopDiv = styled.div`
  --p-x: 2rem;
  --p-y: 7rem;

  width: calc(100vw - (2*var(--p-x)));
  height: calc(90vh - 2*(var(--p-y)));
  background: url('https://wallpapercave.com/wp/wp6741640.jpg'),
  linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 1));
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0;
  background-position: center right;
  padding: var(--p-y) var(--p-x);
`

export default function Home() {
  return (<Main>
    <TopDiv>
    </TopDiv>

    <SectionWithProducts title={"Products"} />
  </Main>);
}

