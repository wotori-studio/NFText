import axios from "axios";

export default async function uploadPinataMeta(ipfsFileUrl, meta) {
  const apiKey = process.env.NEXT_PUBLIC_APP_PINATA_API_KEY;
  const secretKey = process.env.NEXT_PUBLIC_APP_PINATA_SECRET_API_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_APP_PINATA_API_URL;


  let description = meta.description.substr(0, 20)
  let metaProxy = {
    name: meta.name,
    description: description,
    external_url: "https://wotori.com",
    image: ipfsFileUrl,
    attributes: [
      {
        trait_type: "type",
        value: meta.type,
      },
    ],
  };
  var file = new Blob([JSON.stringify(metaProxy)], {
    type: "text/plain;charset=utf-8",
  });
  const formData = new FormData();
  formData.append("file", file, "meta.json");

  const res = await axios.post(apiUrl, formData, {
    headers: {
      "Content-Type": `multipart/form-data; boundary= ${formData._boundary}`,
      pinata_api_key: apiKey,
      pinata_secret_api_key: secretKey,
    },
  });
  return await res.data;
}
