import { makeAutoObservable } from "mobx";

class DevStore {
  modeProject: string = "Production";

  public constructor() {
    makeAutoObservable(this);
  }

  public setDev() {
    this.modeProject = "Development";
  }

  public setProd() {
    this.modeProject = "Production";
  }

  public setTest() {
    this.modeProject = "Test";
  }
}

export default new DevStore();
