import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

import { Message } from "@/model/User";

export async function POST(request:Request){
    await dbConnect()

    //get the value

    const {username,content}= await request.json()

    //find the user

    try {
        const user = await UserModel.findOne({username})
        if(!user){
            return Response.json({
                success: false,
                message: "User not found"
            }, {
                status: 404
            })
        }

        //if user found , is user accepting the message

        if(!user.isAcceptingMessage){
            return Response.json({
                success: false,
                message: "User is not accepting the messages"
            }, {
                status: 403
            })
        }

        const newMessage = {content, createdAt: new Date()}
    } catch (error) {
        
    }
}