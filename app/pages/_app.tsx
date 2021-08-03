import type { AppProps } from "next/app"
import Router from "next/router"
import NPogress from "nprogress"

import "../styles/globals.css"
import "../styles/nprogress.css"

Router.events.on("routeChangeStart", () => NPogress.start())
Router.events.on("routeChangeComplete", () => NPogress.done())
Router.events.on("routeChangeError", () => NPogress.done())

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
