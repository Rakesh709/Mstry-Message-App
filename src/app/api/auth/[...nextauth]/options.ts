import { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

//part 1
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
                        //either find by email or username
                        $or:[
                            {email: credentials.identifier},
                            {username: credentials.identifier}
                        ]
                    })

                    //if user not found
                    if(!user){
                        throw new Error("No user found with this email")
                    }

                    //if user found but not verified
                    if(!user.isVerified){
                        throw new Error('Please verify your account before login')
                    }

                    //idenfier will get credentials.identifier but password you will get direct

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

                    if(isPasswordCorrect){
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
    //part3
    callbacks:{
        //in session alsways return session
        async session({ session, token }) {
            if(token){
               session.user._id = token._id 
               //_id is not as per the module so we are making changes in next-auth.d.ts here we defined our data & same for all
               session.user.isVerified= token.isVerified
               session.user.isAcceptingMessages = token.isAcceptingMessages
               session.user.username = token.username
            }
            return session
          },
          //if you are using jwt return token or else lot of bugs will get
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
    //part2
    // now the complete controll to next auth, it will create the page now
    pages:{
        signIn:'/sign-in'
    },
    session:{
        strategy:"jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
    //SECRET IS IMP 
}