import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@mui/material";
import ThreeScene from "../../3D/cube";
import MintButton from "../MintButton";

import { useSigningClient } from "../../context/cosmwasm";
import { calculateFee } from "@cosmjs/stargate";
const PUBLIC_CW721_CONTRACT = process.env.NEXT_PUBLIC_APP_CW721_CONTRACT || "";

export default function Uploader(props) {
  const [mode, setMode] = useState("");
  const [nftTitle, setNftTitle] = useState("");
  const { walletAddress, signingClient, connectWallet } = useSigningClient();
  const [nftTokenId, setNftTokenId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    if (!signingClient) return;

    // Gets minted NFT amount
    signingClient
      .queryContractSmart(PUBLIC_CW721_CONTRACT, { num_tokens: {} })
      .then((response) => {
        setNftTokenId(response.count + 1);
        console.log("TokenID", nftTokenId);
      })
      .catch((error) => {
        alert(`Error! ${error.message}`);
        console.log(
          "Error signingClient.queryContractSmart() num_tokens: ",
          error
        );
      });
  }, [signingClient, alert]);

  useEffect(() => {
    // without useEffect causing Infinity loop
    // updating programm mode state
    setMode(props.mode);
  });

  const [textNft, setTextNft] = useState("");
  const [mintReady, setMintReady] = useState(false);

  const [selectedFile, setSelectedFile] = useState("");
  const [isSelected, setSelected] = useState(false); // TODO: if selected make clickable upload button
  const [contentLink, setContentLink] = useState(null);

  const changeHandler = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setSelectedFile(file);
    setSelected(true);
    // TODO: check if file is in propper format. (.png/ .jpg for img and .gltf for 3D)
    setFilePreview(URL.createObjectURL(file));
    console.log(filePreview);
  };

  const handleText = (e) => {
    setTextNft(e.target.value);
  };
  const handleInputChange = (e) => {
    setNftTitle(e.target.value);
  };
  async function uploadPinata() {
    const apiKey = process.env.NEXT_PUBLIC_APP_PINATA_API_KEY;
    const secretKey = process.env.NEXT_PUBLIC_APP_PINATA_SECRET_API_KEY;
    const apiUrl = process.env.NEXT_PUBLIC_APP_PINATA_API_URL;

    const metadata = JSON.stringify({
      name: selectedFile.name,
      keyvalues: {
        test: "test",
      },
    });
    let formData = new FormData();
    formData.append("pinataMetadata", metadata);

    if (mode !== "text") {
      formData.append("file", selectedFile);
    }

    if (mode === "text") {
      var file = new Blob([textNft], { type: "text/plain;charset=urg-8" });
      formData.append("file", file, "nftext.txt");
    }

    //upload
    await axios
      .post(apiUrl, formData, {
        headers: {
          "Content-Type": `multipart/form-data; boundary= ${formData._boundary}`,
          pinata_api_key: apiKey,
          pinata_secret_api_key: secretKey,
        },
      })
      .then((res) => {
        console.log("File uploaded:", res.data);
        let hash = res.data.IpfsHash;
        setContentLink(`https://ipfs.io/ipfs/${hash}`);
        setMintReady(true);
      });
  }

  const handleMint = async () => {
    await uploadPinata();
    const metadata = JSON.stringify({
      title: nftTitle,
      content: contentLink,
      type: props.mode,
    });

    const encodedMetadata = Buffer.from(metadata).toString("base64");
    console.log(metadata);
    console.log(`data:application/json;base64, ${encodedMetadata}`);

    if (!signingClient) return;

    signingClient
      ?.execute(
        walletAddress, // sender address
        PUBLIC_CW721_CONTRACT, // cw721-base contract
        {
          mint: {
            token_id: nftTokenId.toString(),
            owner: `${walletAddress}`,
            token_uri: `data:application/json;base64, ${encodedMetadata}`,
          },
        }, // msg
        calculateFee(300_000, "20uconst")
      )
      .then((response) => {
        console.log(response);
        setNftTokenId(nftTokenId + 1);
        setLoading(false);
        alert("Successfully minted!");
      })
      .catch((error) => {
        setLoading(false);
        alert(`Error! ${error.message}`);
        console.log("Error signingClient?.execute(): ", error);
      });
  };

  return (
    <>
      <style jsx>
        {`
          .flexy {
            display: flex;
          }
          .img {
            display: ${contentLink && mode === "img" ? true : "none"};
            max-width: 400px;
            max-heigh: 400px;
            border-style: solid;
            border-width: 1px;
            padding-top: 20px;
          }
          .web-gl {
            margin-top: 20px;
            border-style: solid;
            border-width: 1px;
            min-width: 380px;
          }
          .div-img {
            padding-top: 13px;
          }
          .text-box {
            width: 372px;
            height: 121px;
          }
          .padding-upload {
            margin-bottom: 10px;
          }
        `}
      </style>
      <div /*img and gltf*/>
        <input
          type="text"
          placeholder="NFT`s title"
          onChange={handleInputChange}
        />
        <div className="flexy">
          <div>
            {mode === "img" || mode == "gltf" ? (
              <div>
                <label className="custom_file_btn">
                  <div>select file</div>
                  <input
                    className="hide"
                    type="file"
                    onChange={changeHandler}
                  />
                </label>
              </div>
            ) : null}
          </div>

          {mode === "img" || mode == "gltf" ? (
            // display selected file name
            <div className="vertical_alignment">
              <div className="result">{selectedFile.name}</div>
            </div>
          ) : null}
        </div>

        {mode === "img" && filePreview ? (
          // display img div
          <img src={filePreview} alt="preview image" width="400" height="400" />
        ) : null}
        {mode === "gltf" ? (
          // display 3D convas
          <div className="web-gl">
            {/* <iframe
              width="600px"
              height="400px"
              src={
                "https://wotori.mypinata.cloud/ipfs/QmUR2XyUZvGvsNMmLBA5joPduT4f95jSMGzzzmCkckKSF4/?object=Qmb3yAjLrrrchdShAwSG1hKwJ4fN8zsAN4Vrhw9ahSQtCz&filename=monkey.glb"
              }
            ></iframe> */}
            <Container sx={{ height: 500 }}>
              <ThreeScene />
            </Container>
          </div>
        ) : null}
      </div>

      <div>
        {mode === "text" ? (
          <div>
            <textarea className="text-box" onChange={handleText}>
              Imagine ...
            </textarea>
          </div>
        ) : null}
      </div>

      <div>
        {mode === "paint" ? <div>Paint interface should be here</div> : null}
      </div>
      <div>
        <button className="custom_btn" onClick={handleMint}>
          mint
        </button>
      </div>
    </>
  );
}
