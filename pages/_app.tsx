import { RoomServiceProvider } from "@roomservice/react";
import { Provider } from "next-auth/client";
import Head from 'next/head'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Provider session={pageProps.session}>
    <Head>
      <title>ROOMIES!!!</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Component {...pageProps} />
  </Provider>
}

export default MyApp
