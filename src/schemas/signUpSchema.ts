import {z} from 'zod';

//here only single value in usernameValidation so no object
export const usernameValidation = z
    .string()
    .min(2,"username must be atleast 2 character")
    .max(20, "username cannot exceed 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/,"Username must not contain special character")

    // //here multiple value in signUpSchema so object
    export const signUpSchema = z.object({
        username: usernameValidation,
        email:z.string().email({message:"Invalid Email address"}),
        password:z.string().min(6,{message:"password must be at least 6 characters"})
    })