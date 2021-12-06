// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Docs: https://nodejs.org/api/child_process.html#child-process
// Stackoverflow: https://stackoverflow.com/questions/1880198/how-to-execute-shell-command-in-javascript
import { execSync } from "child_process";

export default function cmd(req, res) {
  const output = execSync("ls -a", { encoding: "utf-8" });
  res.status(200).json({ output: output });
}
