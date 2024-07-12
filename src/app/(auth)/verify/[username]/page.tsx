import { useToast } from "@/components/ui/use-toast";
import { signUpSchema } from "@/schemas/signUpSchema";
import { verifySchema } from "@/schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Description } from "@radix-ui/react-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { describe } from "node:test";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

function VerifyAccount() {
  //verify it
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const { toast } = useToast();

  //zod implementation
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>)=>{
    //one request and data feed 
    try {

      const response = await axios.post(`/api/verify-code`,{
        username: params.username,
        code:data.code
      })

      toast({
        title:"Success",
        description : response.data.message
      })
      
    } catch (error) {
      
    }
  }






  return <div>VerifyAccount</div>;
}

export default VerifyAccount;
