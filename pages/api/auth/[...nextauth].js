import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "../../../helpers/mongohelper";
import User from "../../../models/user";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async signIn({ account, profile }) {
      try {
        await connectDB();
        const userExist = await User.findOne({ email: profile.email });
        if (!userExist) {
          await User.create({
            email: profile.email,
            userName: profile.name,
            image: profile.picture,
            venmo: false,
            zelle: false,
            cashapp: false,
            apple_pay: false
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
      }
    },
  },
};
const handler = NextAuth(authOptions);

export default handler;
