// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            nombre?: string;
            email?: string | null;
            image?: string | null;
            name?: string | null;
        };
    }

    interface User {
        id: string;
        nombre?: string;
        email?: string | null;
    }
}
