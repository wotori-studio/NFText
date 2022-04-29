import { makeObservable, action, observable } from "mobx";

class treeStore {
  public tree: any = null;

  public constructor() {
    makeObservable(this, {
      setTree: action,
      tree: observable,
    });
  }

  public setTree(data: any) {
    this.tree = data;
    console.log("setting tree in previewStore: ", data);
  }
}

export default new treeStore;
