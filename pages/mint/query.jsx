import { useState, useEffect } from "react";

import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { calculateFee, GasPrice } from "@cosmjs/stargate";

export default function index() {
  const RPC = process.env.NEXT_PUBLIC_APP_RPC_ADDRESS;
  const ContractAddress = process.env.NEXT_PUBLIC_APP_CONTRACT_ADDRESS;
  const mnemonic = process.env.NEXT_PUBLIC_APP_ACCOUNT_MNEMONIC;
  const BECH32_PREFIX = "archway";
  console.log(RPC, ContractAddress, mnemonic);

  let user = DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: BECH32_PREFIX,
  });

  let cwClient = SigningCosmWasmClient.connectWithSigner(RPC, user);


  const handleClick = () => {
    console.log("click");
  };
  return (
    <div>
      <button className="custom_btn" onClick={handleClick}>
        Hello
      </button>
    </div>
  );
}
