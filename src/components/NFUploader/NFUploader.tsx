// Styles
import styles from "./NFUploader.module.sass";
import globalStyles from "./../../globalStyles/styles.module.sass";

// Dependencies
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import axios from "axios";
import { Container } from "@mui/material";
import { calculateFee } from "@cosmjs/stargate";

// Components
import SceneWithModel from "./../SceneWithModel/SceneWithModel";

// Contexts
import { useSigningClient } from "../../context/cosmwasm";

// Services
import nftService from "./../../services/nftService";

// Stores
import nftStore from "./../../store/nftStore";

// .env
const PUBLIC_CW721_CONTRACT = process.env
  .NEXT_PUBLIC_APP_CW721_CONTRACT as string;

interface Properties {
  modalMode: string | null;
  parentId: number | null;
}

const NFUploader = observer((props: Properties) => {
  const [nftTokenId, setNftTokenId] = useState(0);
  const [nftTitle, setNftTitle] = useState("");
  const [textNft, setTextNft] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const { walletAddress, signingClient } = useSigningClient();

  useEffect(() => {
    console.log("props: ", props);
    if (!signingClient) return;

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
  }, [signingClient, alert, props.modalMode]);

  function getFile(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
    }
  }

  function getDescriptionForNFText(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setTextNft(event.target.value);
  }

  function writeNFTitle(event: React.ChangeEvent<HTMLInputElement>) {
    setNftTitle(event.target.value);
  }

  async function uploadPinata() {
    console.log("uploading to pinata...");

    if (
      (((nftStore.typeNFT !== "text" && !selectedFile) ||
        (nftStore.typeNFT == "text" && !textNft)) &&
        !props.modalMode) ||
      (props.modalMode !== "text" && !selectedFile) ||
      (props.modalMode == "text" && !textNft)
    ) {
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_APP_PINATA_API_KEY as string;
    const secretKey = process.env
      .NEXT_PUBLIC_APP_PINATA_SECRET_API_KEY as string;
    const apiUrl = process.env.NEXT_PUBLIC_APP_PINATA_API_URL as string;

    const metadata = JSON.stringify({
      keyvalues: {
        test: "test",
      },
    });
    let formData = new FormData();
    formData.append("pinataMetadata", metadata);

    if (
      (nftStore.typeNFT !== "text" && selectedFile && !props.modalMode) ||
      (props.modalMode !== "text" && selectedFile)
    ) {
      formData.append("file", selectedFile);
    }

    if (
      (nftStore.typeNFT === "text" && !props.modalMode) ||
      props.modalMode === "text"
    ) {
      var file = new Blob([textNft], { type: "text/plain;charset=utf-8" });
      formData.append("file", file, "nftext.txt");
    }

    console.log("axios...");
    return await axios
      .post(apiUrl, formData, {
        headers: {
          "Content-Type": `multipart/form-data;`,
          pinata_api_key: apiKey,
          pinata_secret_api_key: secretKey,
        },
      })
      .then((response) => {
        let IpfsHash = response.data.IpfsHash;
        let contentLinkAxios = `https://ipfs.io/ipfs/${IpfsHash}`;
        console.log("pinata axios response recieved...", contentLinkAxios);
        return contentLinkAxios;
      });
  }

  async function createMint() {
    let contentLinkAxios = await uploadPinata();
    if (!contentLinkAxios) {
      alert("Select a file or enter text to upload.");
      return;
    } else {
      console.log("Ready for minting", contentLinkAxios);
    }

    const metadata = JSON.stringify({
      title: nftTitle,
      content: contentLinkAxios,
      type: props.modalMode ? props.modalMode : nftStore.typeNFT,
      parent: props.parentId,
    });
    console.log("Metadata:", metadata);
    const encodedMetadata = Buffer.from(metadata).toString("base64");

    if (!signingClient) {
      throw new Error(`Not valid value of signingClient: ${signingClient}`);
    }

    signingClient
      ?.execute(
        walletAddress,
        PUBLIC_CW721_CONTRACT,
        {
          mint: {
            token_id: nftTokenId.toString(),
            owner: `${walletAddress}`,
            token_uri: `data:application/json;base64, ${encodedMetadata}`,
          },
        },
        calculateFee(300_000, "20uconst")
      )
      .then((response: any) => {
        setLoading(false);
        alert("Successfully minted!");
      })
      .catch((error: any) => {
        setLoading(false);
        alert("Error during minted.");
        if (process.env.NODE_ENV === "development") {
          console.log(error);
        }
      });
  }

  return (
    <div className={styles.overview}>
      <input
        type="text"
        placeholder="NFT`s title"
        onChange={(event) => writeNFTitle(event)}
        className={`${styles.titleInput} ${styles.overviewChild}`}
      />

      {/* WRITE TEXT */}
      {(nftStore.typeNFT === "text" && !props.modalMode) ||
      props.modalMode === "text" ? (
        <textarea
          className={`${styles.textField} ${styles.overviewChild}`}
          onChange={(event) => getDescriptionForNFText(event)}
          placeholder="Imagine..."
        ></textarea>
      ) : null}

      {/* SELECT FILE */}
      {((nftStore.typeNFT === "img" ||
        (nftStore.typeNFT === "3d" && !selectedFile)) &&
        !props.modalMode) ||
      props.modalMode === "img" ||
      (props.modalMode === "3d" && !selectedFile) ? (
        <label
          className={`${globalStyles.customButtonActive} ${styles.overviewChild}`}
        >
          select file
          <input
            className={globalStyles.hide}
            type="file"
            accept={
              (nftStore.typeNFT === "img" && !props.modalMode) ||
              props.modalMode === "img"
                ? "image/*"
                : ".glb, .gltf"
            }
            onChange={(event) => getFile(event)}
          />
        </label>
      ) : nftStore.typeNFT !== "text" ? (
        <input
          className={`${globalStyles.customButtonActive} ${styles.overviewChild}`}
          type="button"
          value="delete file"
          onClick={() => setSelectedFile(undefined)}
        />
      ) : null}

      {/* IMAGE PREVIEW */}
      {(nftStore.typeNFT === "img" && selectedFile && !props.modalMode) ||
      (props.modalMode === "img" && selectedFile) ? (
        <>
          <span className={`${styles.selectedFile} ${styles.overviewChild}`}>
            {selectedFile &&
              nftService.getLimitedString(selectedFile.name, 30, 4)}
          </span>
          <img
            style={{ display: "none" }}
            src={URL.createObjectURL(selectedFile)}
            alt="preview image"
            onLoad={(event) =>
              nftService.setImageLimits(
                event,
                window.innerWidth < 720 ? window.innerWidth - 50 : 700
              )
            }
          />
        </>
      ) : null}

      {/* MODEL PREVIEW */}
      {(nftStore.typeNFT === "3d" && selectedFile && !props.modalMode) ||
      (props.modalMode === "3d" && selectedFile) ? (
        <>
          <span className={`${styles.selectedFile} ${styles.overviewChild}`}>
            {selectedFile &&
              nftService.getLimitedString(selectedFile.name, 30, 4)}
          </span>
          <div className={styles.webGL}>
            <Container sx={{ height: 500 }}>
              <SceneWithModel file={URL.createObjectURL(selectedFile)} />
            </Container>
          </div>
        </>
      ) : null}

      {/* MINT */}
      <button
        className={`${globalStyles.customButtonActive} ${styles.overviewChild}`}
        onClick={() => createMint()}
      >
        mint
      </button>
    </div>
  );
});

export default NFUploader;
