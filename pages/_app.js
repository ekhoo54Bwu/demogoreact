import Head from "next/head";
import "../styles/globals.css";
import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <title>Master title page</title>
      <meta name="master tag" content="show in all pages"></meta>
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </>
  );
}

export default MyApp;
