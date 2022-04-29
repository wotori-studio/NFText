import { makeObservable, action, observable, toJS } from "mobx";

import { TypeNft } from "./../models/Nft";

type OperatingMode = "create" | "explore";

class NFTStore {
  public operatingMode: OperatingMode = "create";
  public typeNFT: TypeNft = "text";
  public loadedNFT: Array<any> = [];
  public tree: Array<any> = [];

  public constructor() {
    makeObservable(this, {
      operatingMode: observable,
      typeNFT: observable,
      loadedNFT: observable,
      tree: observable,
      setOperatingMode: action,
      setNftType: action,
      setLoadedNFT: action,
      setTree: action,
    });
  }

  public setOperatingMode(mode: OperatingMode) {
    this.operatingMode = mode;
  }

  public setNftType(type: TypeNft) {
    this.typeNFT = type;
  }

  public setLoadedNFT(data: any) {
    console.log("MOBX. setLoadedNFT:", data);
    this.loadedNFT = data;
    this.setTree();
  }

  public setTree() {
    console.log("Let's build a tree! Nfts are here:", toJS(this.loadedNFT));
    let treeProxy: any = {};

    for (const i in this.loadedNFT) {
      let curObj = this.loadedNFT[i];

      if (!treeProxy[curObj.parent]) {
        treeProxy[curObj.parent] = [];
      }

      if (curObj.parent) {
        treeProxy[curObj.parent].push(curObj.id);
      }
    }
    this.tree = treeProxy;
    console.log("MOBX. Tree builded! Here it is: ", treeProxy);
  }
}

export default new NFTStore();
