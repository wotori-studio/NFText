import { useState, useEffect } from "react";

import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { calculateFee, GasPrice } from "@cosmjs/stargate";

import Wallet from "../../src/components/wallet/main";

export default function index() {
  const RPC = process.env.NEXT_PUBLIC_APP_RPC_ADDRESS;
  const contractAddress = ""
  const mnemonic = ""
  const BECH32_PREFIX = useState("archway");
  // console.log(RPC, contractAddress, mnemonic, BECH32_PREFIX); TODO: for  a some reason this executes for many times

  const [user, setUser] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [swClient, setCwClient] = useState("");
  const [queryHandler, setQueryHandler] = useState({});
  const [gasPrice, setGasPrice] = useState("");

  useEffect(() => {
    contractAddress = localStorage.getItem("address");
    mnemonic = localStorage.getItem("mnemonic");
    init();
    
  }, []);

  async function init() {
    const mnemonic = process.env.NEXT_PUBLIC_APP_ACCOUNT_MNEMONIC;
    let user = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
      prefix: BECH32_PREFIX,
    });

    let userAddress = process.env.NEXT_PUBLIC_APP_ACCOUNT_ADDRESS;
    let cwClient = await SigningCosmWasmClient.connectWithSigner(RPC, user);
    let queryHandler = await cwClient.queryClient.wasm.queryContractSmart;
    let gasPrice = GasPrice.fromString("0.002uconst");

    setUser(user);
    setUserAddress(userAddress);
    setCwClient(cwClient);
    setQueryHandler({ ...queryHandler });
    setGasPrice(gasPrice);

    let userData = {
      user: user,
      client: cwClient,
      queryHandler: queryHandler,
      gasPrice: gasPrice,
    };
    console.log("dApp Initialized", userData);
    return userData;
  }

  const handleClick = () => {
    console.log(user);
    console.log(RPC, contractAddress, mnemonic, BECH32_PREFIX); 
  };
  return (
    <div>
      <Wallet />

      <button className="custom_btn" onClick={handleClick}>
        Hello
      </button>
    </div>
  );
}
