import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import type {NextAuthOptions} from "next-auth";

const {GOOGLE_CLIENT_ID = "", GOOGLE_CLIENT_SECRET = ""} = process.env; // https://stackoverflow.com/questions/73464345/next-auth-providers-with-a-typescript-error

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    // This will be invoked after a successful sign in
    async signIn({profile}) {
      // 1. Connect to database
      // 2. Check if user exists
      // 3. If not created, create user
      return true;
    },
    async session({session}) {
      // 1. Get user from database
      // 2. Assign user id from the session
      // 3. Return session
      return session;
    },
  },
};

export default NextAuth(authOptions);
