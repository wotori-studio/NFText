import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate/build/cosmwasmclient";
import { Nft } from "../../models/Nft";
import dappState from "../../store/dappState";
import nftStore from "../../store/nftStore";

const PUBLIC_CW721_CONTRACT = process.env.NEXT_PUBLIC_CW721 as string;

async function query(client: CosmWasmClient | null, children: any) {
  if (!client) return;
  dappState.setStateAndOn("Query NFTs")
  console.log("start query nft.", children);
  if (typeof children === "number") {
    children = Array.from({ length: children - 1 }, (x, i) => i + 1);
    console.log("converted:", children);
  }

  const manyMetadata = [];
  for (const prop in children) {
    manyMetadata.push(
      client.queryContractSmart(PUBLIC_CW721_CONTRACT, {
        all_nft_info: { token_id: children[prop] + "" },
      })
    );
  }

  await Promise.all(manyMetadata).then((manyMetadata) => {
    const NFTs: Nft[] = manyMetadata.map((metadata, index) => {
      const decodedMetadata = JSON.parse(
        Buffer.from(metadata.info.token_uri.slice(30), "base64").toString()
      );
      const newNFT: Nft = {
        id: decodedMetadata.id ? Number(decodedMetadata.id) : index + 1, // TODO: get real index
        creator: decodedMetadata.creator,
        owner: metadata.access.owner,
        name: decodedMetadata.title,
        type: decodedMetadata.type,
        href: `/items/${index + 1}`,
        content: decodedMetadata.content || "https://dummyimage.com/404x404",
        parent: decodedMetadata.parent,
        preview:
          decodedMetadata.preview ||
          "https://dummyimage.com/600x400/1aeddf/ffffff&text=3D+file",
      };
      dappState.setOff()
      return newNFT;
    });

    console.log("query: ", NFTs);
    nftStore.setLoadedNFT(NFTs);
    return NFTs;
  });
}

export default query;
