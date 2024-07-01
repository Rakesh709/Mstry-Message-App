//here we are doing momgoodb aggregation pipeline

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import { use } from "react";
import mongoose from "mongoose";



export async function GET(request:Request){
    await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user as User


    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Not Authenticated"
        }, {
            status: 401
        })

    }
    //bea\cause we convert the user as string it will cause error 
    // so if the user id is string it will convert into mongoose object 
    // that is the goal
    const userId = new mongoose.Types.ObjectId(user._id);

    try {
        
    } catch (error) {
        
    }
}