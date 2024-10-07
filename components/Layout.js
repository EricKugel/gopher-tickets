import Banner from "./Banner";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

const Layout = ({ children }) => {
  return (
    <div id="pageWrapper">
      <Head>
        <title>Gopher Tickets</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <Banner />
      <div id="contentPane">
        <main>
          <SessionProvider>{children}</SessionProvider>
        </main>
      </div>
      <style jsx global>{`
        body {
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default Layout;
