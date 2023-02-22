import { useEffect } from "react";

const WOTORI_API_URL = process.env.NEXT_PUBLIC_APP_WOTORI_API || "";

export default function SayHi() {
  useEffect(() => {
    console.log("Say Hi!", WOTORI_API_URL);
    const isProduction = process.env.NODE_ENV === "production";
    if (isProduction) {
      fetch(WOTORI_API_URL, { method: "GET" });
    }
  }, []);

  return null;
}
