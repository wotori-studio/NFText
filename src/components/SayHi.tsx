import { useEffect } from "react";

export default function SayHi() {
  useEffect(() => {
    let url = "https://wotori-api.herokuapp.com/hi";
    fetch(url, { method: "GET" });
  }, []);

  return null;
}
