import GoogleProvider from "next-auth/providers/google";
import connectDB from "../config/database";
import User from "../models/User";

import type {NextAuthOptions} from "next-auth";

const {GOOGLE_CLIENT_ID = "", GOOGLE_CLIENT_SECRET = ""} = process.env; // https://stackoverflow.com/questions/73464345/next-auth-providers-with-a-typescript-error

export const authOptions = {
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
      await connectDB();
      const userExists = await User.findOne({email: profile?.email});

      if (!userExists) {
        const username = profile?.name?.slice(0, 20);

        await User.create({
          email: profile?.email,
          name: username,
          image: profile?.image,
        });
      }

      return true;
    },
    async session({session}) {
      const user = await User.findOne({email: session.user.email});

      // Assign user id from the session
      session.user.id = user._id.toString();
      return session;
    },
  },
} satisfies NextAuthOptions;

export default authOptions;
