export interface NFT {
  id: number;
  owner: string;
  name: string;
  type: "text" | "img" | "gltf";
  href: string;
  content: string;
}

