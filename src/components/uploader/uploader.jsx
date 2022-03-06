import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@mui/material";
import ThreeScene from "../../3D/cube";
import MintButton from "../MintButton";

import styles from './uploader.module.css';
import globalStyles from './../../global-styles/styles.module.css';

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
    return await axios
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
        let contentLinkAxios = `https://ipfs.io/ipfs/${hash}`;
        setContentLink(contentLinkAxios);
        setMintReady(true);
        return contentLinkAxios;
      });
  }

  const handleMint = async () => {
    let contentLinkAxios = await uploadPinata();
    const metadata = JSON.stringify({
      title: nftTitle,
      content: contentLinkAxios,
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
    <div className={styles.overview}>
      <input
        type="text"
        placeholder="NFT`s title"
        onChange={handleInputChange}
        className={`${styles.titleInput} ${styles.overviewChild}`}
      />

      {mode === "text" &&
        <textarea className={`${styles.textField} ${styles.overviewChild}`} onChange={handleText} placeholder="Imagine...">
        </textarea>
      }
      
      {/* Get file button, and file name */}
      {(mode === "img" || mode === "gltf") &&
        <div className={`${styles.fileArea} ${styles.overviewChild}`}>
          <label className={globalStyles.customButtonActive}>
            select file
            <input
              className={globalStyles.hide}
              type="file"
              onChange={changeHandler}
            />
          </label>
          <div className={styles.selectedFile}>{selectedFile.name}</div>
        </div>
      }

      {/* File preview */}
      {mode === "img" && filePreview && <img className={`${styles.overviewChild}`} src={filePreview} alt="preview image" width="400" />}

      {/* 3D canvas */}
      {mode === "gltf" &&
        <div className={`${styles.webGL} ${styles.overviewChild}`}>
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
      }
      {mode === "paint" && <div>Paint interface should be here</div>}

      <button className={`${globalStyles.customButtonActive} ${styles.overviewChild}`} onClick={handleMint}>
        mint
      </button>
    </div>
  );
}
