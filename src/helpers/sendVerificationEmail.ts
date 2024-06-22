import { resend } from "@/lib/resend";

import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { types } from "util";


import { promises } from "dns";
import { verify } from "crypto";

//email is always async because they will take time for sure


export async function sendVerificationEmail(
    email: string,
    username: string,
    //verification is OTP
    verifyCode: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Mystry message | Verification Code',
            react: VerificationEmail({ username, otp: verifyCode }),
          });
    return { success: true, message: " Verification email send successfully" }

   } catch (emailError) {
    console.log("Error sending verification email", emailError)
    return { success: false, message: "Failed to send verification email" }
   }
}