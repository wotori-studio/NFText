import { useEffect } from "react";

export default function SayHi() {
  useEffect(() => {
    const isProduction = process.env.NODE_ENV === "production";
    let url = "https://wotori-api.herokuapp.com/hi";
    if (isProduction) {
      fetch(url, { method: "GET" });
    }
  }, []);

  return null;
}
