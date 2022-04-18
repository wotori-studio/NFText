import { useEffect } from "react";

export default function SayHi() {
  useEffect(() => {
    const isDevelopment = process.env.NODE_ENV === "production";
    let url = "https://wotori-api.herokuapp.com/hi";
    if (isDevelopment) {
      fetch(url, { method: "GET" });
    }
  }, []);

  return null;
}
