export interface Nft {
  id: number;
  owner: string;
  name: string;
  type: TypeNft;
  href: string;
  content: string;
  parent: number
}

export type TypeNft = "text" | "img" | "3d";

export type PlatformName = "Blockchain" | "Database";
