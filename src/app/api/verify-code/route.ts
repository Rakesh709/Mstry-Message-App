import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";

import { usernameValidation } from "@/schemas/signUpSchema";
import { use } from "react";

//zod need to implement 

export async function POST(request: Request) {
    await dbConnect()

    try {

        const { username, code } = await request.json()

        //when we are getting some data from url it will be difficult 
        // best is to decode, here we are doing decoding part

        const decodedUsername = decodeURIComponent(username)
        //here is query
        const user = await UserModel.findOne({ username: decodedUsername })

        //if no user found
        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, {
                status: 500
            })
        }

        // if user found 

        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true
            await user.save()

            return Response.json({
                success: true,
                message: "Account verified successfully"
            }, {
                status: 200
            })
        }else if(!isCodeNotExpired){
            return Response.json({
                success: false,
                message: "Verification code has expired, Please signup again to get a new code"
            }, {
                status: 400
            })
        }else{
            return Response.json({
                success: false,
                message: "Incorrect Verification code"
            }, {
                status: 400
            })
        }




    } catch (error) {
        console.error("Error verifying user", error)
        return Response.json({
            success: false,
            message: "Error verifying user"
        }, {
            status: 500
        })
    }


}