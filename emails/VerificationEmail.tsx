//https://react.email/


import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,

} from "@react-email/components"

interface VerificationEmailProps{
    username:string;
    otp:string;
}

export default function  VerificationEmail({username,otp}:VerificationEmailProps){
    return(
        <Html lang="en" dir="ltr">
      <Button href="https://example.com" style={{ color: "#61dafb" }}>
        Click me
      </Button>
    </Html>
    )
}