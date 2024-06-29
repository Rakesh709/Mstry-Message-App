//method by nextjs, to get info from session


import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import { use } from "react";


export async function POST(request: Request) {
    await dbConnect()

    //current login user
    //getServerSession required authOptions
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

    const userId = user._id
    const { acceptMessages } = await request.json()

    try {
        // from this you will get the updated value
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessage: acceptMessages },
            { new: true }
        )

        //check user found or not
        if (!updatedUser) {
            return Response.json({
                success: false,
                message: "Failed to update user status to accept messages"
            }, {
                status: 401
            })
        }

        return Response.json({
            success: false,
            message: "Message acceptance status updated successfully",
            updatedUser
        }, {
            status: 200
        })



    } catch (error) {
        console.log("Failed to update user status to accept messages")
        return Response.json({
            success: false,
            message: "Failed to update user status to accept messages"
        }, {
            status: 500
        })
    }

}