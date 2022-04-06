import { makeObservable, action, observable } from "mobx";

class previewStore {
  public previewFile = null;
  public trigger : any = Blob

  public constructor() {
    makeObservable(this, {
      setPreview: action,
      previewFile: observable,
      trigger: observable
    });
  }

  public setTrigger() {
    console.log("updating trigger");
    this.trigger = Math.random();
  }

  public setPreview(file: any) {
    this.previewFile = file;
    console.log("setting preview in previewStore: ", file);
  }
}

export default new previewStore();
