import Head from "next/head";
import { SigningCosmWasmProvider } from "./../src/context/cosmwasm";

interface Properties {
  Component: any;
  pageProps: object;
}

export default function App(props: Properties) {
  const { Component, pageProps } = props;

  return (
    <SigningCosmWasmProvider>
        <Head>
          <title>NFText</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <Component {...pageProps} />
    </SigningCosmWasmProvider>
  );
}
