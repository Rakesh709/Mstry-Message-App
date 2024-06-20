// abhi kai lia haam sirf user and messg kaia data hai
import mongoose,{Schema,Document} from "mongoose";


//message schema 
export interface Message extends  Document {
        content : string;
        createdAt : Date
}

//mongoose mai string capital String
//typescript mai string small string
const MessageSchema: Schema<Message> = new Schema({
        content:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            required:true,
            default:Date.now
        }
})

//user schema 
export interface User extends  Document {
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVerified: boolean;
    isAcceptingMessage:boolean;
    messages:Message[];
}

// schema
const UserSchema: Schema<User> = new Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        trim:true,
        unique:true
    },
    email: {
        type: String,
        required: [true, "Email field cannot be empty."],
        unique:true,
        match:[/.+\@.+\..+/,'Please use a valid email address']
    },
    password :{
        type: String,
        required:[true,'Password is required'],
    },
    verifyCode:{
        type:String,
        required: [true,"Verification code is required"],
    },
    verifyCodeExpiry:{
        type: Date,
        required: [true,"verify code Expiry is required"],
    },
    isVerified:{
        type: Boolean,
        default:false,
    },
    isAcceptingMessage:{
        type: Boolean,
        default:true,
    },
    messages: [MessageSchema]


})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel;