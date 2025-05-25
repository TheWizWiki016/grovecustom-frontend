import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Correo", type: "email" },
                password: { label: "Contraseña", type: "password" },
            },
            async authorize(credentials) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    }),
                });

                const user = await res.json();

                if (res.ok && user) {
                    // user debe tener id, email, nombre
                    return user;
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.nombre = user.nombre;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.nombre = token.nombre;
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
