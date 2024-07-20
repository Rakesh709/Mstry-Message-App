'use client'

import { useToast } from "@/components/ui/use-toast"
import { Message } from "@/model/User"
import { AcceptMessageSchema } from "@/schemas/acceptMessageSchema"
import { ApiResponse } from "@/types/ApiResponse"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import { useSession } from "next-auth/react"
import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"

function page() {

  const [ messages, setMessages] = useState<Message[]>([])
  const [ isLoading, setIsLoading]= useState(false)
  const [isSwitchLoading, setIsSwitchingLoading] = useState(false)

  const {toast} = useToast()

  //optimistic ui means ui mai show kr do ki kaam ya like hogya hai but backend mai later changes kr dengai and if anything goes wrong back to normal

  const handleDeleteMessage = (messageId:string) => {
    setMessages(messages.filter((message)=> message._id !== messageId))
  }

  const {data:session} = useSession()

  const form = useForm({
    resolver:zodResolver(AcceptMessageSchema)
  })

  const {register, watch , setValue} =form;

  const acceptMessages = watch ('acceptMessages')

  const featchAcceptMessage = useCallback(async () =>{
    setIsSwitchingLoading(true)
    try {
      const response = await axios.get('/api/accept-messages')
      setValue('acceptMessages',response.data.isAcceptingMessage)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
    }
  },[setValue])

  return (
    <div>Dashboard</div>
  )
}

export default page