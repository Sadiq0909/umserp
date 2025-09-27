import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "@/database/connect";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        await connect();
        const user = await User.findOne({ Email: credentials.email });
        if (!user) return null;
        const isValid = bcrypt.compareSync(credentials.password, user.Password_Hash);
        if (!isValid) return null;
        return {
          id: user._id.toString(),
          name: user.Username,
          email: user.Email,
          role: user.Role,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  pages: { signIn: "/sign-in" },
  secret: process.env.NEXTAUTH_SECRET,
};

// Wrap handler in async functions for GET and POST
const handler = (req, res) => NextAuth(req, res, authOptions);

export async function GET(req, res) {
  return handler(req, res);
}

export async function POST(req, res) {
  return handler(req, res);
}
