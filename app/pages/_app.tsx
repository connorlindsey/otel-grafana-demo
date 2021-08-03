import type { AppProps } from "next/app"
import Router from "next/router"
import NPogress from "nprogress"
import Layout from "../components/Layout"

import "../styles/globals.css"
import "../styles/nprogress.css"

Router.events.on("routeChangeStart", () => NPogress.start())
Router.events.on("routeChangeComplete", () => NPogress.done())
Router.events.on("routeChangeError", () => NPogress.done())

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
