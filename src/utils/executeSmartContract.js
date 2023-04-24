import { calculateFee } from "@cosmjs/stargate";

export async function executeContract(
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
