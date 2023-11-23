import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {connectDB} from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
const handler = NextAuth({

 providers: [
    // Credentials Provider configuration
    CredentialsProvider({
        name: 'credentials',
        credentials: {
            email: {label: "email", type: "email", placeholder: "example@example"},
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
                // Authorization logic
            await connectDB();
                
            const userFound = await User.findOne({ email:credentials?.email}).select("+password");
            if (!userFound) throw new Error("Invalid Email");

            const passwordMatch = await bcrypt.compare(credentials!.password,userFound.password);
            if(!passwordMatch) throw new Error("Invalid Password");
           

            const isAdmin = userFound.isAdmin;

            const user = {
                id: userFound._id,
                name: userFound.name,
                email: userFound.email,
                isAdmin: isAdmin,
              };
              
              return user
              
            },
            
        }),

    ],  pages: {
        signIn: "/login",
        signOut: "/",
      },
      session: {
        strategy: "jwt",
      },
        callbacks: {
             // JWT token and session callbacks
            async jwt({ token, user }) {
                if (user) token.user = user;
                    return token;
                    },
                        async session({ session, token }) {
                            session.user = token.user as any;
                            return session;
                        },
        },
})

export { handler as GET, handler as POST, handler as DELETE, handler as PUT}

