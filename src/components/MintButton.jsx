import { useState, useEffect } from "react";
import { useSigningClient } from "../context/cosmwasm";
import { calculateFee } from "@cosmjs/stargate";

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
    const metadata = JSON.stringify({
      title: props.nftTitle,
      content: props.contentLink,
      type: props.type,
    });

    const encodedMetadata = Buffer.from(metadata).toString("base64");
    console.log(metadata);
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
