import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},

      async authorize(credentials, req) {
        try {
          const { email, password } = credentials;
          const baseURL =
            process.env.NODE_ENV === "production"
              ? process.env.NEXT_PROD_API_URL
              : process.env.NEXT_LOCAL_API_URL;
          const { data } = await axios.post(
            `${baseURL}/users/login`,
            { email, password },
            { headers: { "Content-Type": "application/json" } }
          );
          if (data.isSuccessful) {
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${data.token}`;
            return Promise.resolve(data);
          }
        } catch (error) {
          if (error.response) {
            return Promise.reject(error.response.data.error);
          } else {
            console.log(error.message);
            return Promise.reject(error.message);
          }
        }
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token.data.token}`;
      return Promise.resolve(token);
    },
    async session({ session, token }) {
      if (token.data) {
        session.user = token.data.data;
        session.token = token.data.token;

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${session.token}`;
        return Promise.resolve(session);
      }
    },
  },
  pages: {
    newUser: "/",
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  secret: process.env.NEXT_AUTH_SECRET,
  jwt: {
    secret: process.env.NEXT_JWT_SECRET,
  },
  session: {
    strategy: "jwt",
  },
});
