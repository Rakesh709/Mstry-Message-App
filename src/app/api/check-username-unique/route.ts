import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
//whenever you are taking zod you need schema from somewhere in this case signupschema,ts file 

import {usernameValidation} from "@/schemas/signUpSchema";

import {signUpSchema} from "@/schemas/signUpSchema"

//query schemacreating

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

//now make get call and checking it

export async function GET(request:Request){
    await dbConnect()

    //below will be the example of the url from url find the username
    //localhost:3000/api/checkuserunique?username=rakesh&phone=android
    try {
        const {searchParams}= new URL(request.url)
        //below is the syntax
        const queryParam ={
            username: searchParams.get("username")
        }

        //validate username with zod
        const result = UsernameQuerySchema.safeParse(queryParam)
        console.log(result) //todo remove


        if (!result.success) {
            const usernameErrors= result.error.format().username?._errors
              ||  []
            return Response.json({
                success:false,
                message: "Invalid query parameters"
            },{
                status:400
            })
            }


    } catch (error) {
        console.error("Error checking username",error)
        return Response.json({
            success:false,
            message: "Error checking username"
        },{
            status:500
        })
    }
}