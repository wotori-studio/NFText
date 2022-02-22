import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import React, { useState } from "react";

export default function TextBox(props) {
    let [text, setText] = useState("")
    axios.get(props.text_link).then(response =>{
        setText(response.data)
    })
  return (
    <div>
      <Box
        color="text.primary"
        sx={{
          bgcolor: "background.paper",
          boxShadow: 10,
          borderRadius: 5,
          p: 2,
          minWidth: 100,
          maxWidth: 200,
        }}
      >
        <Typography>{text.length > 100? text.slice(0, 100) + '...' : text}</Typography>
      </Box>
    </div>
  );
}
