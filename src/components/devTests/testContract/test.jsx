import { useEffect } from "react";
import { useSigningClient } from "../../../context/cosmwasm";
import { calculateFee } from "@cosmjs/stargate";

export default function TestContract() {
  const { walletAddress, signingClient } = useSigningClient();

  function executeSmartContract() {
    console.log("test execute", signingClient);
    signingClient
      ?.execute(
        walletAddress,
        "archway19nhk3a94lpvtwgp3z7fuz75jrkv2y5seuwrt883y9362jrz4w42qelsk6e",
        {
          instantiate_stored_contract: {
            code_id: 633,
            init_msg:
              "eyJtaW50ZXIiOiJhcmNod2F5MXFxNjV3amVmdTZubnF4MG42dnZ4NXh6ejN4bWN1eTc1dmF1aHE5IiwgIm5hbWUiOiJ0ZXN0IiwgInN5bWJvbCI6InRlc3QifQ==",
            admin: "archway1qq65wjefu6nnqx0n6vvx5xzz3xmcuy75vauhq9",
            label: "test",
          },
        },
        calculateFee(600_000, "20uconst")
      )
      .then((response) => {
        console.log(response);
        alert("Success!", response.text);
      })
      .catch((error) => {
        alert("Error during minted.");
        if (process.env.NODE_ENV === "development") {
          console.log(error);
        }
      });
  }

  function getAddress() {
    console.log("Getting address...");
    signingClient.getTx(
        "351D15952B166AA515A0E67028690AE685111DA0FD980C210599D0766BB179E1"
      )
      .then((response) => {
        let data = JSON.parse(response.rawLog)[0].events
        console.log(data);
        alert("Success!", );
      });
  }

  useEffect(() => {
    console.log("recieved signingClient");
  }, [signingClient]);

  return (
    <>
      <button onClick={executeSmartContract}>execute</button>
      <button onClick={getAddress}>address</button>
    </>
  );
}
