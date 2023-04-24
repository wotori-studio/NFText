import { useEffect, useState } from "react";
import { useSigningClient } from "../../context/cosmwasm";
import { calculateFee } from "@cosmjs/stargate";
import {
  findUserCollections,
  findCollectionsData,
  getCollectionDataHibrid,
} from "../../utils/findCollections";

const CW721_CODE_ID = process.env.NEXT_PUBLIC_CW721_CODE_ID;
const CW721Factory = process.env.NEXT_PUBLIC_CW_FACTORY;
const MARKETPLACE = process.env.NEXT_PUBLIC_CW_MARKETPLACE;

async function executeContract(
  client,
  walletAddress,
  contractAddress,
  executeMsg,
  memo,
  coins,
  onSuccess,
  onError
) {
  try {
    const result = await client.execute(
      walletAddress,
      contractAddress,
      executeMsg,
      calculateFee(600_000, "20uconst"),
      memo,
      coins
    );
    console.log(result);
    onSuccess(result);
  } catch (error) {
    console.error(error);
    onError(error);
  }
}

export default function UserPage() {
  const { walletAddress, signingClient } = useSigningClient();
  let [txHash, setTxHash] = useState(0);
  let [newContract, setNewContract] = useState(0);
  const [userCollections, setUserCollections] = useState([]);

  let [collections, setCollections] = useState([
    {
      name: "Sample Collection 1",
      symbol: "SC1",
      contractAddress: "contract_address_1",
      nfts: [
        {
          id: "1",
          image:
            "https://ipfs.io/ipfs/QmTY4xbcUe5bNA6yC85LbuwojTk6ZAKjAExtzgfFqDKgNt",
          owner: "owner_address_1",
        },
        {
          id: "2",
          image:
            "https://ipfs.io/ipfs/QmTY4xbcUe5bNA6yC85LbuwojTk6ZAKjAExtzgfFqDKgNt",
          owner: "owner_address_1",
        },
        {
          id: "3",
          image:
            "https://ipfs.io/ipfs/QmTY4xbcUe5bNA6yC85LbuwojTk6ZAKjAExtzgfFqDKgNt",
          owner: "owner_address_1",
        },
        {
          id: "4",
          image:
            "https://ipfs.io/ipfs/QmTY4xbcUe5bNA6yC85LbuwojTk6ZAKjAExtzgfFqDKgNt",
          owner: "owner_address_1",
        },
      ],
    },
    {
      name: "Sample Collection 2",
      symbol: "SC2",
      contractAddress: "contract_address_2",
      nfts: [
        {
          id: "1",
          image:
            "https://ipfs.io/ipfs/QmTY4xbcUe5bNA6yC85LbuwojTk6ZAKjAExtzgfFqDKgNt",
          owner: "owner_address_1",
        },
        {
          id: "2",
          image:
            "https://ipfs.io/ipfs/QmTY4xbcUe5bNA6yC85LbuwojTk6ZAKjAExtzgfFqDKgNt",
          owner: "owner_address_1",
        },
      ],
    },
  ]);

  function instantiateCW721() {
    console.log("instantiate new collection", signingClient);
    let newSmartContractData = {
      minter: walletAddress,
      name: "Akira27",
      symbol: "Akira",
    };
    const base64Str = btoa(JSON.stringify(newSmartContractData));
    let instantiateMessage = {
      instantiate_stored_contract: {
        code_id: Number(CW721_CODE_ID),
        admin: walletAddress,
        init_msg: base64Str,
        label: "test",
      },
    };
    console.log("smart contract data: ", newSmartContractData, base64Str);

    executeContract(
      signingClient,
      walletAddress, // MARKETPLACE should be here if we want to trade the collections
      CW721Factory,
      instantiateMessage,
      undefined,
      undefined,
      (result) => {
        let txHashResp = result.transactionHash;
        alert(`Success! TxHash: ${txHashResp}`);
        setTxHash(txHashResp);
        console.log(result);
      },
      (error) => {
        alert("Error during minted.");
        if (process.env.NODE_ENV === "development") {
          console.log(error);
        }
      }
    );
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
    let mintMessage = {
      mint: {
        token_id: "1",
        owner: `${walletAddress}`,
        token_uri: `data:application/json;base64, test`,
      },
    };
    executeContract(
      signingClient,
      walletAddress,
      newContract,
      mintMessage,
      undefined,
      undefined,
      (result) => {
        alert("Successfully minted!", result);
      },
      (error) => {
        alert("Error during minted.");
        if (process.env.NODE_ENV === "development") {
          console.log(error);
        }
      }
    );
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
        padding: "20px",
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      <p>txHash: {txHash}</p>
      <p>new contract address: {newContract}</p>
      <button onClick={instantiateCW721}>execute</button>
      <button onClick={getAddress}>address</button>
      <button onClick={mintNFT}>mint</button>
      <button
        onClick={async () => {
          let data = await findUserCollections(walletAddress, signingClient);
          setUserCollections(data);
          console.log(data);
        }}
      >
        find
      </button>
      <button
        onClick={async () => {
          console.log("load collections data");
          let data = await findCollectionsData(userCollections, signingClient);
          console.log(data);
        }}
      >
        load collections data
      </button>
      <button
        onClick={() => {
          console.log("getting data");
          getCollectionDataHibrid(walletAddress, signingClient);
        }}
      >
        hybrid
      </button>

      <div style={{ marginBottom: "20px" }}>
        <h2>Create a new NFT Collection</h2>
        <button onClick={instantiateCW721}>Mint Collection</button>
      </div>
      <div>
        <h2>{walletAddress} NFT Collections:</h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {collections.map((collection, index) => (
            <div
              key={index}
              style={{
                marginBottom: "20px",
                border: "1px solid black",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <h3>
                {collection.name} ({collection.symbol})
              </h3>
              <p>Contract address: {collection.contractAddress}</p>
              <button onClick={mintNFT}>Mint NFT to {collection.symbol}</button>
              <div>
                <h4>NFTs in this collection:</h4>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(100px, 1fr))",
                    gap: "10px",
                  }}
                >
                  {collection.nfts.map((nft, nftIndex) => (
                    <div
                      key={nftIndex}
                      style={{
                        position: "relative",
                        width: "100px",
                        height: "100px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={nft.image}
                        alt={`NFT ${nft.id}`}
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: "50%",
                          height: "100%",
                          width: "auto",
                          transform: "translate(-50%, -50%)",
                          minWidth: "100%",
                          minHeight: "100%",
                        }}
                      />
                      <p>Owner: {nft.owner}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
