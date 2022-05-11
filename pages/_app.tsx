import Head from "next/head";
import SayHi from "../src/components/SayHi";
import { SigningCosmWasmProvider } from "./../src/context/cosmwasm";
import Loading from "../src/components/Loading...";
import "../styles.sass";
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
      <Loading />
      <SayHi />
      <Component {...pageProps} />
    </SigningCosmWasmProvider>
  );
}
