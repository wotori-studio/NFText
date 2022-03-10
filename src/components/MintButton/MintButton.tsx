import { useState, useEffect } from "react";
import { useSigningClient } from "./../context/cosmwasm";
import { calculateFee } from "@cosmjs/stargate";

const PUBLIC_CW721_CONTRACT = process.env.NEXT_PUBLIC_APP_CW721_CONTRACT || "";

interface Properties {
  nftTitle: string;
  contentLink: string;
  type: string;
}

export default function MintButton(props: Properties) {
  const {nftTitle, contentLink, type} = props;

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
      title: nftTitle,
      content: contentLink,
      type: type,
    });

    const encodedMetadata = Buffer.from(metadata).toString("base64");

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
