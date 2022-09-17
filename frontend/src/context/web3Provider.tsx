import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { chain, configureChains, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";

let WebThreeProvider = () => null;

const init = () => {
  const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;
  const nodeEnv = process.env.NEXT_PUBLIC_NODE_ENV;
  const environmentChains =
    nodeEnv === "development" ? [chain.polygonMumbai] : [chain.polygon];

  const { chains, provider, webSocketProvider } = configureChains(
    environmentChains,
    [alchemyProvider({ apiKey: alchemyId }), publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "Violet HumanBound Token",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
    webSocketProvider,
  });

  WebThreeProvider = () => {
    return { chains, provider, webSocketProvider, connectors, wagmiClient };
  };
};

init();

export default WebThreeProvider;
