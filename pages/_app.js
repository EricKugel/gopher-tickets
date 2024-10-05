import Layout from "../components/Layout";
import { Toaster } from "react-hot-toast";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default MyApp;
