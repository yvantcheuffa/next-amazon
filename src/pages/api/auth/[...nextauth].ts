import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        // You may add more providers here...
    ],
    // A database is optional, but reauired to persist accounts in a database
})