import { useEffect, useState } from "react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";

import { Hero } from "./components/hero";
import WebThreeProvider from "./context/web3Provider";
import { Navbar } from "./components/navbar";

const provider = WebThreeProvider();

const useIsMounted = (): boolean => {
  const [isMounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return isMounted;
};

const App = () => {
  const isMounted = useIsMounted();
  if (!isMounted || !provider) return null;

  const { chains, wagmiClient } = provider;
  return (
    <div className="App">
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Navbar />
          <Hero />
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
};

export default App;
