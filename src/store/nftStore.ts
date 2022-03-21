import { makeObservable, action, observable } from "mobx";

import { TypeNft } from "./../models/Nft";

type OperatingMode = "create" | "explore";

class NFTStore {
  public operatingMode: OperatingMode = "create";
  public typeNFT: TypeNft = "text";

  public constructor() {
    makeObservable(this, {
      operatingMode: observable,
      typeNFT: observable,
      setOperatingMode: action,
      setNftType: action
    });
  }

  public setOperatingMode(mode: OperatingMode) {
    this.operatingMode = mode;
  }

  public setNftType(type: TypeNft) {
    this.typeNFT = type;
  }
} 

export default new NFTStore();
