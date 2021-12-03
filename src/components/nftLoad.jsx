import axios from "axios";
import { useEffect, useState } from "react";

function NftLoad() {
  const [img, setImg] = useState(null);

  useEffect(() => {
    axios.get("/api/nft/query").then((response) => {
      let data = response.data.data;
      let url = data.token_uri_data.image.slice(7);
      let convertedUrl = `https://ipfs.io/ipfs/${url}`;
      setImg(convertedUrl);
    });
  }, []);

  return <img src={img} />;
}

export default NftLoad;
