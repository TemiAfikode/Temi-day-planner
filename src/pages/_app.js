import { getSession, SessionProvider } from "next-auth/react";
import axios from "axiosFetch";

import UserState from "context/user/userState";
import TaskState from "context/task/taskState";
import UiState from "context/ui/uiState";
import "styles/globals.css";

function MyApp({ Component, pageProps }) {
  if (typeof window !== "undefined") {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${pageProps.token}`;
  }

  return (
    <SessionProvider refetchInterval={5 * 60} session={pageProps.session}>
      <UserState>
        <TaskState>
          <UiState>
            <Component {...pageProps} />
          </UiState>
        </TaskState>
      </UserState>
    </SessionProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  try {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = (await Component.getInitialProps(ctx)) || {};
    }
    if (ctx.req && ctx.res) {
      const session = await getSession({ req: ctx.req });
      if (session && session?.token) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${session.token}`;
        pageProps.token = session.token;
        pageProps.user = session.user;
        pageProps.session = session;
      }
    }

    return { pageProps };
  } catch (error) {
    console.log(error);
  }
};

export default MyApp;
