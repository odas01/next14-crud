import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

const authOptions: NextAuthOptions = {
   session: {
      strategy: 'jwt',
   },
   providers: [
      GoogleProvider({
         clientId: GOOGLE_CLIENT_ID,
         clientSecret: GOOGLE_CLIENT_SECRET,
      }),
   ],
   pages: {
      signIn: '/login',
   },
   callbacks: {
      async signIn({ account, profile }) {
         if (!profile?.email) {
            throw new Error('No profile');
         }
         return true;
      },
      async redirect({ url, baseUrl }) {
         return baseUrl;
      },
   },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
