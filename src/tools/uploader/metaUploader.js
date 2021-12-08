import axios from "axios";

export default async function uploadPinataMeta(ipfsFileUrl) {
  const apiKey = process.env.NEXT_PUBLIC_APP_PINATA_API_KEY;
  const secretKey = process.env.NEXT_PUBLIC_APP_PINATA_SECRET_API_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_APP_PINATA_API_URL;

  let meta = {
    name: " meta.name",
    description: "meta.description",
    external_url: "meta.external_url",
    image: ipfsFileUrl,
    attributes: [
      {
        trait_type: "type",
        value: "meta.type",
      },
    ],
  };
  var file = new Blob([JSON.stringify(meta)], {
    type: "text/plain;charset=utf-8",
  });
  const formData = new FormData();
  formData.append("file", file, "meta.txt");

  const res = await axios.post(apiUrl, formData, {
    headers: {
      "Content-Type": `multipart/form-data; boundary= ${formData._boundary}`,
      pinata_api_key: apiKey,
      pinata_secret_api_key: secretKey,
    },
  });
  return await res.data;
}
