// Styles
import globalStyles from "./../src/globalStyles/styles.module.sass";
import UserPage from "../src/components/userPage";
// Dependencies
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

// Components
import ModeSelector from "../src/components/ModeSelector/ModeSelector";
import ModeToggle, { Mode } from "../src/components/ModeToggle/ModeToggle";
import RawFooter from "../src/components/footer";

// Contexts
import { useSigningClient } from "../src/context/cosmwasm";

// Stores
import nftStore from "../src/store/nftStore";
import Wallet from "../src/components/Wallet";
import { isMobile } from "react-device-detect";

import { LoginHeader } from "../src/components/LoginHeader";
import Select from "react-select";
import { getCollectionDataHibrid } from "../src/utils/findCollections";
import { useAtom } from "jotai/react";
import { globalStateAtom } from "../src/jotai/activeCollection";
import CollectionForm from "../src/components/CollectionForm";

const PUBLIC_CW721_CONTRACT = process.env.NEXT_PUBLIC_CW721 as string;

const Main = observer(() => {
  let mod = [];
  mod = [
    {
      name: "create",
      action: () => {
        nftStore.setOperatingMode("create");
      },
    },
    {
      name: "explore",
      action: () => {
        nftStore.setOperatingMode("explore");
      },
    },
    {
      name: "trade",
      action: () => {
        nftStore.setOperatingMode("trade");
      },
    },
  ];
  const [modes, setModes] = useState<Mode[]>(mod);
  const { walletAddress, connectWallet, signingClient, disconnect, client } =
    useSigningClient();
  const [userPageOpen, setUserPageOpen] = useState(false);
  const [collections, setCollections] = useState([
    { value: PUBLIC_CW721_CONTRACT, label: "Community" },
  ]);
  const [globalState, setGlobalState] = useAtom(globalStateAtom);

  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    if (signingClient && walletAddress) {
      const fetchData = async () => {
        const data = await getCollectionDataHibrid(
          walletAddress,
          signingClient
        );
        console.log("GOT ALL COLLECTIONS DATA", data);

        // Create an array of new collections
        const newCollections = data.map((collection) => ({
          value: collection.address,
          label: collection.name,
        }));

        // Update the state with new collections
        setCollections((prevState) => {
          // Remove duplicates
          const existingAddresses = new Set(prevState.map((col) => col.value));
          const uniqueNewCollections = newCollections.filter(
            (col) => !existingAddresses.has(col.value)
          );

          return [...prevState, ...uniqueNewCollections];
        });
      };

      fetchData();
    }
  }, [signingClient, walletAddress, globalState]);

  return (
    <>
      <LoginHeader
        userPageSetter={setUserPageOpen}
        userPageState={userPageOpen}
      />
      {false ? ( //replace false with "userPageOpen" to load user interface
        <UserPage />
      ) : (
        <>
          <div className={globalStyles.app}>
            <div className={globalStyles.mainBlock}>
              <h1>NFText</h1> testnet:{" "}
              <a
                href="https://docs.archway.io/resources/networks"
                target="_blank"
              >
                contantine-2
              </a>
              <div className={`${globalStyles.onlineModes}`}></div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "10px",
                  gap: "5px",
                }}
              >
                <Select
                  defaultValue={collections[0]}
                  options={collections}
                  onChange={(selectedOption) => {
                    if (selectedOption) {
                      console.log(
                        `Selected option label: ${selectedOption.value}`,
                        `Selected option value: ${selectedOption.label}`
                      );
                      setGlobalState({
                        cw721: selectedOption.value,
                        collectionName: selectedOption.label,
                        trigger: Math.random(),
                      });
                    }
                  }}
                />
                <CollectionForm />
              </div>
              {!isMobile && walletAddress && <Wallet />}
              <div className={globalStyles.modes}>
                <ModeToggle modes={modes} />
              </div>
              <ModeSelector />
            </div>
          </div>
        </>
      )}

      <RawFooter />
    </>
  );
});

export default Main;
