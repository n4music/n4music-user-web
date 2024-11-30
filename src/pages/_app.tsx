import "@/styles/globals.css"
import "@/styles/login.css"
import "@/styles/step1.css"
import '@/styles/step2.css'
import '@/styles/step3.css'
import '@/styles/step4.css'
import '@/styles/list.css'
import '@/styles/play.css'
import '@/styles/playbar.css'

import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}