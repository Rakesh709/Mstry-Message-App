import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth"{
    interface User{
        _id?: string;
        isVerified?:boolean;
        isAcceptingMessages?:boolean;
        username?: string
    }
    interface Session{
        user:{
        _id?: string;
        isVerified?:boolean;
        isAcceptingMessages?:boolean;
        username?: string
        } & DefaultSession['user']
    }
}

//alternate way of above
declare module 'next-auth/jwt'{
    interface JWT {
        _id?: string;
        isVerified?:boolean;
        isAcceptingMessages?:boolean;
        username?: string
    }
    
}

//this is the way you inmport the module and use the interface and make the changes of that interface with your data