import { Provider } from 'next-auth/client'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ReactElement } from 'react'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>ROOMIES!!!</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
