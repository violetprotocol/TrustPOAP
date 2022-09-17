import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';
import WebThreeProvider from "../context/web3Provider";
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import { Navbar } from '../components/navbar';
import { UserTokenProvider } from '../context/userTokens';
import { Hero } from '../components/hero';


const useIsMounted = (): boolean => {
  const [isMounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return isMounted;
};

const provider = WebThreeProvider();

function MyApp({ Component, pageProps }: AppProps) {
  const isMounted = useIsMounted();
  if (!isMounted || !provider) return null;

  const { chains, wagmiClient } = provider;
  return (
    <div className="App">
      <header>
        <title>Humanbound</title>
        <meta name="description" content="Trust POAP - from Violet" />
        <link rel="shortcut icon" href="/violet.svg" />
      </header>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <UserTokenProvider>
            <Navbar />
            <Hero />
          </UserTokenProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default MyApp
