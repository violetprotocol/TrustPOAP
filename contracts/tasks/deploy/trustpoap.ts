import { LedgerSigner } from "@anders-t/ethers-ledger";
import { Provider } from "@ethersproject/providers";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import { TrustPOAP, TrustPOAP__factory } from "../../src/types";

task("deploy:trustpoap")
  .addParam("hbt", "Humanbound Token contract address")
  .addParam("poap", "POAP contract address")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const factory: TrustPOAP__factory = <TrustPOAP__factory>await ethers.getContractFactory("TrustPOAP");
    const trustpoap: TrustPOAP = <TrustPOAP>(
      await factory.connect(signers[0]).deploy(taskArguments.hbt, taskArguments.poap)
    );
    await trustpoap.deployed();
    console.log("TrustPOAP deployed to: ", trustpoap.address);
  });

task("deploy:hd:trustpoap")
  .addParam("hbt", "Humanbound Token contract address")
  .addParam("poap", "POAP contract address")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();

    const factory: TrustPOAP__factory = <TrustPOAP__factory>await ethers.getContractFactory("TrustPOAP");
    const trustpoap: TrustPOAP = <TrustPOAP>(
      await factory.connect(signers[0]).deploy(taskArguments.hbt, taskArguments.poap)
    );
    await trustpoap.deployed();
    console.log("TrustPOAP deployed to: ", trustpoap.address);
  });
