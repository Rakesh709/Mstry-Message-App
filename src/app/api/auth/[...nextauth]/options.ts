import { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { error } from "console";
import { use } from "react";

export const authOptions:NextAuthOptions={
    providers:[
        CredentialsProvider({
            id: "credentails",
            name: "Credentails",
            credentials:{
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials:any):Promise<any> {
                await dbConnect();
                try {
                    const user= await UserModel.findOne({
                        $or:[
                            {email: credentials.identifier},
                            {username: credentials.identifier}
                        ]
                    })
                    if(!user){
                        throw new Error("No user found with this email")
                    }
                    if(user.isVerified){
                        throw new Error('Please verify your account before login')
                    }
                    const isPasswordCorrcet = await bcrypt.compare(credentials.password, user.password)

                    if(isPasswordCorrcet){
                        return user
                    }else{
                        throw new Error('Incorrect  Password')
                    }
                    
                } catch (error:any) {
                    throw new Error(error)
                }
            }
        })
    ],
    callbacks:{
        async session({ session, token }) {
            if(token){
               session.user._id = token._id 
            }
            return session
          },
          async jwt({ token, user  }) {
            if (user) {
                token._id = user._id?.toString()
                token.isVerified= user.isVerified;
                token.isAcceptingMesages= user.isAcceptingMessages;
                token.username= user.username;
            }
            return token
          },
    },
    pages:{
        signIn:'/sign-in'
    },
    session:{
        strategy:"jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
    //SECRET IS IMP 
}