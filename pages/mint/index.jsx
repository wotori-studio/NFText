import { Button, Input } from "@mui/material";
import axios from "axios";
import React, { Component, useState } from "react";

const index = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const [isSelected, setSelected] = useState(false);

  const changeHandler = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setSelectedFile(file);
    setSelected(true);
  };

  const handleSubmission = () => {
    const formData = new FormData();
    const apiUrl = "https://api.pinata.cloud/pinning/pinFileToIPFS";
    formData.append("file", selectedFile);

    const metadata = JSON.stringify({
      name: "TheCat#003",
      keyvalues: {
        wallet_address: "archway1sfpyg3jnvqzf4ser62vpeqjdtvet3mfzp2v7za",
      },
    });
    formData.append("pinataMetadata", metadata);

    const apiKey = process.env.NEXT_PUBLIC_APP_PINATA_API_KEY;
    const secretKey = process.env.NEXT_PUBLIC_APP_PINATA_SECRET_API_KEY;

    axios
      .post(apiUrl, formData, {
        headers: {
          "Content-Type": `multipart/form-data; boundary= ${formData._boundary}`,
          pinata_api_key: apiKey,
          pinata_secret_api_key: secretKey,
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <div>
      <Input type="file" name="file" onChange={changeHandler} />
      <p> Filename: {selectedFile.name}</p>
      <button onClick={handleSubmission}>Submit</button>
    </div>
  );
};

export default index;
