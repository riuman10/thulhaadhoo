import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/Layout";
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <meta charSet="UTF-8" />
        <title>Thulhaadhoo Dhaairaa 2024</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
    )
}
