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
    // En [...nextauth].ts:
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id || user.id
                token.nombre = user.nombre
                token.rol = user.rol // <-- ESTO FALTA
            }
            return token
        },
        async session({ session, token }) {
            session.user._id = token._id
            session.user.nombre = token.nombre
            session.user.rol = token.rol // <-- ESTO FALTA
            return session
        },
    },
    pages: {
        signIn: "/auth/signin",
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };