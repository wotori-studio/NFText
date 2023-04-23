import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

// .env
const PUBLIC_CW721_CONTRACT = process.env.NEXT_PUBLIC_CW721 as string;

async function getNftTokenAmount(
  signingClient: SigningCosmWasmClient,
  setter: Function | null = null
) {
  return await signingClient
    .queryContractSmart(PUBLIC_CW721_CONTRACT, { num_tokens: {} })
    .then((response) => {
      let tokenId = response.count + 1;
      console.log("TokenID", tokenId);

      if (setter) {
        setter(tokenId);
      } else {
        return tokenId;
      }
    })
    .catch((error) => {
      alert(`Error! ${error.message}`);
      console.log(
        "Error signingClient.queryContractSmart() num_tokens: ",
        error
      );
    });
}

export default getNftTokenAmount;
