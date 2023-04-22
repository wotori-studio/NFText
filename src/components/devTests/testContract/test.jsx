import { useEffect, useState } from "react";
import { useSigningClient } from "../../../context/cosmwasm";
import { calculateFee } from "@cosmjs/stargate";

export default function TestContract() {
  const { walletAddress, signingClient } = useSigningClient();
  let [txHash, setTxHash] = useState(0);
  let [newContract, setNewContract] = useState(0);

  function executeSmartContract() {
    console.log("test execute", signingClient);
    let newSmartContractData = {
      minter: walletAddress,
      name: "Collection Name",
      symbol: "Symbol URL",
    };
    const base64Str = btoa(JSON.stringify(newSmartContractData));
    let instantiateMessage = {
      instantiate_stored_contract: {
        code_id: 633,
        admin: walletAddress,
        init_msg: base64Str,
        label: "test",
      },
    };
    console.log("smart contract data: ", newSmartContractData, base64Str);
    signingClient
      ?.execute(
        walletAddress,
        "archway19nhk3a94lpvtwgp3z7fuz75jrkv2y5seuwrt883y9362jrz4w42qelsk6e",
        instantiateMessage,
        calculateFee(600_000, "20uconst")
      )
      .then((response) => {
        let txHashResp = response.transactionHash;
        alert(`Success! TxHash: ${txHashResp}`);
        setTxHash(txHashResp);
        console.log(response);
      })
      .catch((error) => {
        alert("Error during minted.");
        if (process.env.NODE_ENV === "development") {
          console.log(error);
        }
      });
  }

  function getAddress() {
    console.log("Getting address...");
    signingClient.getTx(txHash).then((response) => {
      let data = JSON.parse(response.rawLog)[0].events;
      let newContractAddress = data[1].attributes[0].value;
      setNewContract(newContractAddress);
      console.log("all data: ", data);
      console.log("address: ", newContractAddress);
      console.log(`Success! New contract: ${newContractAddress}`);
    });
  }

  function mintNFT() {
    console.log("Minting...");
    signingClient
      ?.execute(
        walletAddress,
        newContract,
        {
          mint: {
            token_id: "1",
            owner: `${walletAddress}`,
            token_uri: `data:application/json;base64, test`,
          },
        },
        calculateFee(600_000, "20uconst")
      )
      .then((response) => {
        alert("Successfully minted!", response);
      });
  }

  useEffect(() => {
    console.log("recieved signingClient");
  }, [signingClient]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <p>txHash: {txHash}</p>
      <p>new contract address: {newContract}</p>
      <button onClick={executeSmartContract}>execute</button>
      <button onClick={getAddress}>address</button>
      <button onClick={mintNFT}>mint</button>
    </div>
  );
}
