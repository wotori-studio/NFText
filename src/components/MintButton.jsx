import axios from "axios";
import { useState } from "react";

export default function MintButton(props) {
  const [deployInfo, setDeployInfo] = useState();

  const handleMint = () => {
    console.log("start minting...");
    let address = localStorage.getItem("address");
    let mnemonic = localStorage.getItem("mnemonic");

    // prepare data structure deploy
    const smContractData = {
      name: props.nftTitle,
      symbol: "nft",
      minter: address,
    };

    // prepare data structure for Minting
    const smContractArgs = {
      mint: {
        token_id: "1",
        owner: address,
        token_uri: props.metaDataLink,
        external_url: "https://wotori.com",
      },
    };

    //debug
    console.log(`address: ${address}, mnemonic: ${mnemonic}`);
    console.log("metaData:", props.metaDataLink);
    console.log("data for contract deployment:", smContractData);
    console.log("data for NFT minting:", smContractArgs);

    axios.get("/api/bash/deploy").then((response) => {
      console.log("Deployed:", response);
      setDeployInfo(JSON.parse(response.data.output))
      console.log("data structure parsed:", deployInfo)
    });
  };
  return (
    <button className="custom_btn" onClick={handleMint}>
      mint
    </button>
  );
}
