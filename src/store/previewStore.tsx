import { makeObservable, action, observable } from "mobx";

class previewStore {
  public previewFile = null;

  public constructor() {
    makeObservable(this, {
      setPreview: action,
      previewFile: observable,
    });
  }

  public setPreview(file: any) {
    this.previewFile = file;
    console.log("setting preview in previewStore: ", file);
  }
}

export default new previewStore();
