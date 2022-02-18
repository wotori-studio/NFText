import { useState, useEffect } from "react";
import { useSigningClient } from "../context/cosmwasm";
import { calculateFee } from "@cosmjs/stargate";

// mock for testing purposes
let deployData = {
  height: "102491",
  txhash: "10A6150DD1D599CCCA99788389133EB5CE282773C5217C7F64D5C84C110FAF6F",
  data: "0A110A0A73746F72652D636F6465120308B001",
  raw_log:
    '[{"events":[{"type":"message","attributes":[{"key":"action","value":"store-code"},{"key":"module","value":"wasm"},{"key":"sender","value":"archway1vdr32zdmwmwmwz2cxd3wecxjp5ml5pvc4kuhhy"}]},{"type":"store_code","attributes":[{"key":"code_id","value":"176"}]}]}]',
  logs: [
    {
      events: [
        {
          type: "message",
          attributes: [
            {
              key: "action",
              value: "store-code",
            },
            {
              key: "module",
              value: "wasm",
            },
            {
              key: "sender",
              value: "archway1vdr32zdmwmwmwz2cxd3wecxjp5ml5pvc4kuhhy",
            },
          ],
        },
        {
          type: "store_code",
          attributes: [
            {
              key: "code_id",
              value: "176",
            },
          ],
        },
      ],
    },
  ],
  gas_wanted: "1659200",
  gas_used: "1286682",
};

const PUBLIC_CW721_CONTRACT = process.env.NEXT_PUBLIC_APP_CW721_CONTRACT || "";

export default function MintButton(props) {
  const { walletAddress, signingClient, connectWallet } = useSigningClient();
  const [nftTokenId, setNftTokenId] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!signingClient) return;

    // Gets minted NFT amount
    signingClient
      .queryContractSmart(PUBLIC_CW721_CONTRACT, { num_tokens: {} })
      .then((response) => {
        setNftTokenId(response.count + 1);
        console.log("TokenID", nftTokenId);
      })
      .catch((error) => {
        alert(`Error! ${error.message}`);
        console.log(
          "Error signingClient.queryContractSmart() num_tokens: ",
          error
        );
      });
  }, [signingClient, alert]);

  const handleMint = async () => {
    console.log("start minting...");

    const metadata = `{"name": "${props.nftTitle}", "description": "${props.metaDataLink}", "image": "${props.metaDataLink}"}`;
    const encodedMetadata = Buffer.from(metadata).toString("base64");
    console.log(
      `{"name": ${props.nftTitle}, "description": "${props.metaDataLink}", "image": "${props.metaDataLink}"}`
    );
    console.log(`data:application/json;base64, ${encodedMetadata}`);

    if (!signingClient) return;

    signingClient
      ?.execute(
        walletAddress, // sender address
        PUBLIC_CW721_CONTRACT, // cw721-base contract
        {
          mint: {
            token_id: nftTokenId.toString(),
            owner: `${walletAddress}`,
            token_uri: `data:application/json;base64, ${encodedMetadata}`,
          },
        }, // msg
        calculateFee(300_000, "20uconst")
      )
      .then((response) => {
        console.log(response);
        setNftTokenId(nftTokenId + 1);
        setLoading(false);
        alert("Successfully minted!");
      })
      .catch((error) => {
        setLoading(false);
        alert(`Error! ${error.message}`);
        console.log("Error signingClient?.execute(): ", error);
      });
  };

  return (
    <button className="custom_btn" onClick={handleMint}>
      mint
    </button>
  );
}
