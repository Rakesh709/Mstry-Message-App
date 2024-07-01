//here we are doing momgoodb aggregation pipeline

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import { use } from "react";
import mongoose from "mongoose";



export async function GET(request: Request) {
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
    //because we convert the user as string it will cause error 
    // so if the user id is string it will convert into mongoose object 
    // that is the goal
    const userId = new mongoose.Types.ObjectId(user._id);

    try {
        //here i want to get all the msges (possible using pipeline aggregation)
        const user = await UserModel.aggregate([
            //these are the pipeline aggregation
            //get the user
            { $match: { id: userId } },
            //unwind the array || on array the sysntax
            { $unwind: 'messages' },
            { $sort: { 'messages.createdAT': -1 } },
            //Now grouping
            { $group: { _id: '$_id', messages: { $push: '$messages' } } }
        ])

        //if we didn't get any user and length is zero
        if (!user || user.length === 0) {
            return Response.json({
                success: false,
                message: "User not found"
            }, {
                status: 401
            })
        }

        return Response.json({
            success: true,
            // return from the aggregation pipeline is array
            messages: user[0].messages
        }, {
            status: 200
        })



    } catch (error) {

    }
}