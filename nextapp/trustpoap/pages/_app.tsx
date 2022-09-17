import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';
import WebThreeProvider from "../context/web3Provider";


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
  return <Component {...pageProps} />
}

export default MyApp
