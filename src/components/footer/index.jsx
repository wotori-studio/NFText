export default function RawFooter() {
  return (
    <footer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          minHeight: "auto",
        }}
      >
        <div style={{ textAlign: "center" }}>
          {/* <a href="https://discord.gg/3bnmr2Yk">Discord</a> */}
        </div>
        <div style={{ textAlign: "center" }}>
          <a href="https://wotori.com">Wotori Studio</a> {new Date().getFullYear()}
          {/* <p style={{ margin: 0 }}>{new Date().getFullYear()}</p> */}
        </div>
        <div style={{ textAlign: "center" }}>
          {/* <a href="https://github.com/wotori-studio">GitHub</a> */}
        </div>
      </div>
    </footer>
  );
}
