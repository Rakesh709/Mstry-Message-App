'use client'

// import { useSession, signIn, signOut } from "next-auth/react"

// export default function Component() {
//   const { data: session } = useSession()
//   if (session) {
//     return (
//       <>
//         Signed in as {session.user.email} <br />
//         <button onClick={() => signOut()}>Sign out</button>
//       </>
//     )
//   }
//   return (
//     <>
//       Not signed in <br />
//       <button className="bg-orange-500 px-3 py-1 m-4 rounded" onClick={() => signIn()}>Sign in</button>
//     </>
//   )
// }


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z  from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceValue } from 'usehooks-ts'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios,{AxiosError } from 'axios';
import { ApiResponse } from "@/types/ApiResponse"

function page() {

    const [username,setUsername] = useState('')
    const [ usernameMessage, setUsernameMessage] = useState('')
    const [isCheckingUsername,setIsCheckingUsername] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    //getting user value by debaouncing not usestate
    const debouncedUserame= useDebounceValue(username,300)
    //toast
    const { toast } = useToast()

    //router navigation 
    const router = useRouter();

    //zod implementation 
    const form = useForm({
      resolver:zodResolver(signUpSchema),
      defaultValues:{
        username:"",
        email :"",
        password: ""
        //later you can add more input form
      }
    })

    //now i want debaunced value 
    useEffect(()=>{
      //now check the username

      const checkUsernameUnique = async()=>{
        if(debouncedUserame){
          setIsCheckingUsername(true)
          setUsernameMessage('')

          try {
            const response = await axios.get(`/api/check-username-unique?username=${debouncedUserame}`)

            setUsernameMessage(response.data.message)
          } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            setUsernameMessage(
              axiosError.response?.data.message || "Error checking username"
            )
          }finally{
            setIsCheckingUsername(false)
          }
        }
      }

      //now run the method
      checkUsernameUnique()
    },[ debouncedUserame])

      //submit method 

      



  return (
    <div>page</div>
  )
}

export default page