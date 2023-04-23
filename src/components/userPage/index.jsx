import { useEffect, useState } from "react";
import { useSigningClient } from "../../context/cosmwasm";
import { calculateFee } from "@cosmjs/stargate";

export default function UserPage() {
  const { walletAddress, signingClient } = useSigningClient();
  let [txHash, setTxHash] = useState(0);
  let [newContract, setNewContract] = useState(0);
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
          id: "2",
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
          id: "1",
          image:
            "https://ipfs.io/ipfs/QmTY4xbcUe5bNA6yC85LbuwojTk6ZAKjAExtzgfFqDKgNt",
          owner: "owner_address_1",
        },
      ],
    },
  ]);

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

    executeContract(
      signingClient,
      walletAddress,
      "archway19nhk3a94lpvtwgp3z7fuz75jrkv2y5seuwrt883y9362jrz4w42qelsk6e",
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

    executeContract(
      signingClient,
      walletAddress,
      newContract,
      {
        mint: {
          token_id: "1",
          owner: `${walletAddress}`,
          token_uri: `data:application/json;base64, test`,
        },
      },
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
      <button onClick={executeSmartContract}>execute</button>
      <button onClick={getAddress}>address</button>
      <button onClick={mintNFT}>mint</button>

      <div style={{ marginBottom: "20px" }}>
        <h2>Create a new NFT Collection</h2>
        <button onClick={executeSmartContract}>Mint Collection</button>
      </div>
      <div>
        <h2>My NFT Collections:</h2>

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
