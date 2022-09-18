import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import "../styles/globals.css";

import WebThreeProvider from "../context/web3Provider";
import { Navbar } from "../components/navbar";
import { UserTokenProvider } from "../context/userTokens";

const useIsMounted = (): boolean => {
  const [isMounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return isMounted;
};

const provider = WebThreeProvider();

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
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
            <div className="from-primary bg-gradient-to-br min-h-screen">
              <Navbar />
              <Component {...pageProps} key={router.asPath} />
            </div>
          </UserTokenProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default MyApp;
