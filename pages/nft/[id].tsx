import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ModelViewer from "../../src/components/ModelViewer";
import NFImage from "../../src/components/NFImage/NFImage";
import NFText from "../../src/components/NFText/NFText";

const PUBLIC_CW721_CONTRACT = process.env
  .NEXT_PUBLIC_APP_CW721_CONTRACT as string;

const rpcEndpoint = process.env.NEXT_PUBLIC_CHAIN_RPC_ENDPOINT as string;

const NFTID = () => {
  const router = useRouter();
  const { id } = router.query;
  const token_id = id;
  const [client, setClient] = useState<CosmWasmClient>();
  const [nft, setNft] = useState();

  useEffect(() => {
    const getClient = async () => {
      const res = await CosmWasmClient.connect(rpcEndpoint);
      setClient(res);
      console.log("signingClient: ", client);
    };

    if (!client) {
      console.log("getting client");
      getClient();
    }

    if (token_id && client) {
      console.log("start query smart-contract");
      client
        .queryContractSmart(PUBLIC_CW721_CONTRACT, {
          all_nft_info: { token_id: token_id + "" },
        })
        .then((meta) => {
          console.log("meta:", meta);
          const decodedMetadata = JSON.parse(
            Buffer.from(meta.info.token_uri.slice(30), "base64").toString()
          );
          setNft(decodedMetadata);
          console.log("decoded meta", decodedMetadata);
        });
    }
  }, [token_id]);

  return (
    <div>
      <div>page {token_id}</div>
    </div>
  );
};

export default NFTID;
