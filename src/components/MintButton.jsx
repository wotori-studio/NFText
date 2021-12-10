import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function MintButton(props) {
  const deployLink = "/api/bash/deploy";
  const [deployInfo, setDeployInfo] = useState();

  const deploySmContract = async () => {
    const response = await axios.get(deployLink);
    const respData = await JSON.parse(response.data.output);
    return respData;
  };

  const handleMint = async () => {
    console.log("start minting...");
    setDeployInfo(null);
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

    // const deployData = await deploySmContract();
    let deployData = {
        "height": "102491",
        "txhash": "10A6150DD1D599CCCA99788389133EB5CE282773C5217C7F64D5C84C110FAF6F",
        "data": "0A110A0A73746F72652D636F6465120308B001",
        "raw_log": "[{\"events\":[{\"type\":\"message\",\"attributes\":[{\"key\":\"action\",\"value\":\"store-code\"},{\"key\":\"module\",\"value\":\"wasm\"},{\"key\":\"sender\",\"value\":\"archway1vdr32zdmwmwmwz2cxd3wecxjp5ml5pvc4kuhhy\"}]},{\"type\":\"store_code\",\"attributes\":[{\"key\":\"code_id\",\"value\":\"176\"}]}]}]",
        "logs": [
            {
                "events": [
                    {
                        "type": "message",
                        "attributes": [
                            {
                                "key": "action",
                                "value": "store-code"
                            },
                            {
                                "key": "module",
                                "value": "wasm"
                            },
                            {
                                "key": "sender",
                                "value": "archway1vdr32zdmwmwmwz2cxd3wecxjp5ml5pvc4kuhhy"
                            }
                        ]
                    },
                    {
                        "type": "store_code",
                        "attributes": [
                            {
                                "key": "code_id",
                                "value": "176"
                            }
                        ]
                    }
                ]
            }
        ],
        "gas_wanted": "1659200",
        "gas_used": "1286682"
    }
    console.log("sm-contract deployed! Response data structure parsed, yahoo!!!:", deployData);
  };

  return (
    <button className="custom_btn" onClick={handleMint}>
      mint
    </button>
  );
}
