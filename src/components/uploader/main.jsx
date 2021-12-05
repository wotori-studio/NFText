import { useEffect, useState } from "react";
import axios from "axios";

export default function Uploader(props) {
  const [mode, setMode] = useState("");
  useEffect(() => {
    setMode(props.mode);
    console.log("Oooo", mode);
  });

  const [selectedFile, setSelectedFile] = useState("");
  const [isSelected, setSelected] = useState(false); // TODO: if selected make clickable upload button
  const [imgLink, setImgLink] = useState(null);

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
      name: selectedFile.name,
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
        let hash = res.data.IpfsHash;
        setImgLink(`https://ipfs.io/ipfs/${hash}`);
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
            display: ${imgLink ? true : "none"};
            max-width: 400px;
            max-heigh: 400px;
            border-style: solid;
            border-width: 1px;
            padding-top: 20px;
          }
          .div-pad-top {
            padding-top: 13px;
          }
        `}
      </style>
      <div className="flexy">
        <div>
          {console.log("mode", mode)}
          {mode === "img" || mode == "gltf" ? (
            <div>
              <label className="custom_file_btn">
                <div>select file</div>
                <input className="hide" type="file" onChange={changeHandler} />
              </label>
            </div>
          ) : (
            <div></div>
          )}

          <button className="custom_btn" onClick={handleSubmission}>
            upload
          </button>
        </div>

        {mode === "img" || mode == "gltf" ? (
          <div className="vertical_alignment">
            <div className="result">{selectedFile.name}</div>
          </div>
        ) : (
          <div />
        )}
        
      </div>
      <div className="div-pad-top">
        <img className="img" src={imgLink ? imgLink : null}></img>
      </div>
    </>
  );
}
