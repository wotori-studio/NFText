import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@mui/material";
import ThreeScene from "../../3D/cube";
import uploadPinataMeta from "../../tools/uploader/metaUploader";
import MintButton from "../mintButton";

export default function Uploader(props) {
  const [mode, setMode] = useState("");

  useEffect(() => {
    // without useEffect causing Infinity loop
    // updating programm mode state
    setMode(props.mode);
  });

  const [mintReady, setMintReady] = useState(false);
  const [metaDataLink, setMetaDataLink] = useState("");
  const [metaData, setMetaData] = useState("");

  const [selectedFile, setSelectedFile] = useState("");
  const [isSelected, setSelected] = useState(false); // TODO: if selected make clickable upload button
  const [imgLink, setImgLink] = useState(null);

  const changeHandler = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setSelectedFile(file);
    setSelected(true);
    // TODO: check if file is in propper format. (.png/ .jpg for img and .gltf for 3D)
  };

  const [textNft, setTextNft] = useState("");
  const handleText = (e) => {
    setTextNft(e.target.value);
  };

  const handleSubmission = () => {
    const apiKey = process.env.NEXT_PUBLIC_APP_PINATA_API_KEY;
    const secretKey = process.env.NEXT_PUBLIC_APP_PINATA_SECRET_API_KEY;
    const apiUrl = process.env.NEXT_PUBLIC_APP_PINATA_API_URL;

    const metadata = JSON.stringify({
      name: selectedFile.name,
      keyvalues: {
        wallet_address: "archway1sfpyg3jnvqzf4ser62vpeqjdtvet3mfzp2v7za",
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
    axios
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
        if (mode === "img") setImgLink(`https://ipfs.io/ipfs/${hash}`);
        setMintReady(true);

        let metaProxy = {};
        metaProxy.name = nftTitle;
        metaProxy.description = textNft;
        if (mode === "img") metaProxy.type = "img";
        if (mode === "text") {
          metaProxy.type = "text";
        }
        if (mode === "gltf") metaProxy.type = "gltf";

        console.log("metaProxy collected:", metaProxy);

        uploadPinataMeta(`https://ipfs.io/ipfs/${hash}`, metaProxy).then(
          (data) => {
            setMetaDataLink(data.IpfsHash);
            console.log("Metadata uploaded", data);
          }
        );
      });
  };

  const [nftTitle, setNftTitle] = useState("");
  const handleInputChange = (e) => {
    setNftTitle(e.target.value);
  };

  const handleMint = () => {};

  return (
    <>
      <style jsx>
        {`
          .flexy {
            display: flex;
          }
          .img {
            display: ${imgLink && mode === "img" ? true : "none"};
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
                <button className="custom_btn" onClick={handleSubmission}>
                  upload
                </button>
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

        {mode === "img" ? (
          // display img div
          <div className="div-img">
            <img className="img" src={imgLink ? imgLink : null}></img>
          </div>
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
            <div className="padding-upload">
              <button className="custom_btn" onClick={handleSubmission}>
                upload
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div>
        {mode === "paint" ? <div>Paint interface should be here</div> : null}
      </div>

      {mintReady || mode === "text" || mode === "paint" ? (
        <div>
          <MintButton nftTitle={nftTitle} metaDataLink={metaDataLink} />
        </div>
      ) : null}
    </>
  );
}
