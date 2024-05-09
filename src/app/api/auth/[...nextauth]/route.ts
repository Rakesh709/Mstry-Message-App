import NextAuth from "next-auth/next";

import { authOptions } from "./options";

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}

//handler is because of framework so handler will be used as verb GET , POST

//providers and configration check from doc