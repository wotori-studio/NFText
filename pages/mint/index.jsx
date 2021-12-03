import { Button, Input } from "@mui/material";
import React, { Component, useState } from "react";

const index = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const [selected, setSelected] = useState(false);

  const changeHandler = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setSelectedFile(file)
    setSelected(true);
  };

  const handleSubmission = () => {};

  return (
    <div>
      <Input type="file" name="file" onChange={changeHandler} />
      <p> Filename: {selectedFile.name}</p>
      <button onClick={handleSubmission}>Submit</button>
    </div>
  );
};

export default index;
