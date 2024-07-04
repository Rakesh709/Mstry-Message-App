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
import { useState } from "react"


function page() {

    const [username,setUsername] = useState('')
    const [ usernameMessage, setUsernameMessage] = useState('')
    const [isCheckingUsername,setIsCheckingUsername] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)


  return (
    <div>page</div>
  )
}

export default page