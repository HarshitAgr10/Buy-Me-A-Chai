import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'
import mongoose from 'mongoose';
import User from '@/models/User';
import Payment from '@/models/Payment';
import connectDb from '@/db/connectDb';

// console.log("GITHUB_CLIENT_ID:", process.env.GITHUB_CLIENT_ID);
// console.log("GITHUB_CLIENT_SECRET:", process.env.GITHUB_CLIENT_SECRET);

export const authoptions = NextAuth({
  providers: [
    // OAuth authentication providers...
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    //   AppleProvider({
    //     clientId: process.env.APPLE_ID,
    //     clientSecret: process.env.APPLE_SECRET
    //   }),
    //   FacebookProvider({
    //     clientId: process.env.FACEBOOK_ID,
    //     clientSecret: process.env.FACEBOOK_SECRET
    //   }),
    //   GoogleProvider({
    //     clientId: process.env.GOOGLE_ID,
    //     clientSecret: process.env.GOOGLE_SECRET
    //   }),
    //   // Passwordless / email sign in
    //   EmailProvider({
    //     server: process.env.MAIL_SERVER,
    //     from: 'NextAuth.js <no-reply@example.com>'
    //   }),
  ],
  callbacks: {
    /** 
     * signIn Callback function is triggered when a user tries to sign in.
     * Only GitHub authentication is handled here.
    */
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider == "github") {
        await connectDb()

        // Check if user already exists in the database
        const currentUser = await User.findOne({ email: email })
        // console.log(currentUser)

        if (!currentUser) {
          // Create a new user if not found in the database
          const newUser = await User.create({
            email: user.email,
            username: user.email.split("@")[0],   // Generate username from email
          })
        }
        return true;   // Allow sign-in
      }
    },

    /**
     * session Callback function modifies the session object before sending it to the client.
     * It fetches the user details from DB using the email and assigns the username to the session.
    */
    async session({ session, user, token }) {
      const dbUser = await User.findOne({ email: session.user.email })
      // console.log(dbUser)
      session.user.name = dbUser.username
      return session
    },
  }
})

/* Exports the authentication options as GET and POST handlers. */
export { authoptions as GET, authoptions as POST }