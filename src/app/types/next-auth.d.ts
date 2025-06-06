// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        _id?: string
        email?: string | null
        nombre?: string | null
        rol?: string
    }

    interface Session {
        user?: {
            _id?: string
            email?: string | null
            nombre?: string | null
            rol?: string
            image?: string | null
            name?: string | null
        }
    }
}
