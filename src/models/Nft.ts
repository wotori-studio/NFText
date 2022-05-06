export interface Nft {
  id: number;
  owner: string;
  name: string;
  type: TypeNft;
  href: string;
  content: string;
  parent: number;
  preview: string;
}

export type TypeNft = "text" | "img" | "3d";

export type TypeTrade = "buy" | "sell";

export type PlatformName = "Blockchain" | "Database";
