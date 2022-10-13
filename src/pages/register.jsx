import axiosFetch from 'axiosFetch';
import AuthComp from 'components/auth'
import { getSession } from 'next-auth/react';

export default function Register() {
  return (
    <AuthComp />
  )
}


export const getServerSideProps = async ({ req }) => {
    if (req) {
      const session = await getSession({ req });
      if (session && session.token) {
        axiosFetch.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${session.token}`;
        return {
          redirect: {
            destination: "/dashboard",
            permanent: false,
          },
        };
      }
    }
    return {
      props: {},
    };
  };