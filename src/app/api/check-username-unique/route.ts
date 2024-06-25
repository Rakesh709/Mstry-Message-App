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
}