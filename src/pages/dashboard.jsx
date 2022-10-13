import axiosFetch from "axiosFetch";
import { getSession } from "next-auth/react";
import DashboardComp from "components/dashboard/dashboard";

export default function Dashboard({ user }) {
  return (
    <>
      <DashboardComp user={user} />
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
      user = session.user;
    } else {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  }
  return {
    props: { user },
  };
};
