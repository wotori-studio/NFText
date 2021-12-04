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

    formData.append("File", selectedFile);

    // axios.post("/api/pinata/post", { data: "data" }).then((resp) => {
    //   console.log("response data: ", resp);
    // });

    fetch("/api/pinata/post", {
      method: "POST",
      body: formData,
    }).then((resp) => {
      console.log(resp);
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
