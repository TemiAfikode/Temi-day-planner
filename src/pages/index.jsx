import axiosFetch from "axiosFetch";
import About from "components/about";
import Contact from "components/contact";
import Features from "components/features";
import Navbar from "components/navbar";
import Pricing from "components/pricing";
import Showcase from "components/showcase";
import { getSession } from "next-auth/react";

export default function Home() {
  return (
    <>
      <Navbar />
      <Showcase />
      <About />
      <Features />
      <Pricing />
      <Contact />
    </>
  );
}

export const getServerSideProps = async ({ req }) => {
  let user = null;
  if (req) {
    const session = await getSession({ req });
    if (session && session.token) {
      axiosFetch.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${session.token}`;
      if (session?.user?.id) {
        user = session.user;
      }
    }
  }
  return {
    props: { user },
  };
};
