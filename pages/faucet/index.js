import axios from "axios";
import { useState } from "react";

export default function Index() {
  let [address, setAddress] = useState("");
  let [responseData, setResponseData] = useState("");

  const handleRequest = () => {
    let url = "https://faucet.constantine-1.archway.tech";
    let request = {
      denom: "uconst",
      address: address,
    };
    axios.post(url, request).then((r) => {
      let message = JSON.stringify(r.data.transfers[0]);
      console.log(message);
      setResponseData(message);
    });
  };

  const hadleUnputChange = (e) => {
    setAddress(e.target.value);
    console.log(address);
  };
  return (
    <>
      <input onChange={hadleUnputChange}></input>
      <button onClick={handleRequest}>request funds</button>
      {responseData ? <p>{responseData}</p> : <></>}
    </>
  );
}
