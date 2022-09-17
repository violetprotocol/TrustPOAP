import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import "./navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl">
          TrustPOAP
        </a>
      </div>
      <div className="flex-none">
        <Rainbowbutton />
      </div>
    </div>
  );
};

const Rainbowbutton = () => {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  if (isConnected)
    return <ConnectButton accountStatus="address" showBalance={false} />;

  return (
    <button
      onClick={openConnectModal}
      className="btn btn-primary text-base 2xl:text-lg normal-case bg-black rounded"
    >
      Connect Wallet
    </button>
  );
};
