import { useSigningClient } from "../../context/cosmwasm";

export default function RawFooter() {
  return (
    <div
      className="infoLine"
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        minHeight: "auto",
      }}
    >
      {/* <div>
        <a href="https://discord.gg/ZaQ8k3Sa" target="_blank">
          Discord
        </a>
      </div> */}
      <div>
        <a href="https://wotori.com" target="_blank">
          Wotori Studio
        </a>
        {/* {new Date().getFullYear()} */}
        {/* <p style={{ margin: 0 }}>{new Date().getFullYear()}</p> */}
      </div>
      {/* <div>
        <p>Login</p>
      </div> */}
    </div>
  );
}
