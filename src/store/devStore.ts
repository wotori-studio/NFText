import { action, observable } from "mobx";

type PlatformName = "Blockchain" | "Database";

class DevStore {
  public readonly DATA_PLATFORMS: PlatformName[] = ["Blockchain", "Database"];
  @observable public dataPlatform: PlatformName = "Blockchain";

  @action public setDataPlatform(platformName: PlatformName) {
    this.dataPlatform = platformName;
  }
}

export default new DevStore();
