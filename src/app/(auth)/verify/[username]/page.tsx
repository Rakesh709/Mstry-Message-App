"use client";


import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { signUpSchema } from "@/schemas/signUpSchema";
import { verifySchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import { Description } from "@radix-ui/react-toast";
import axios, { AxiosError } from "axios";
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

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    //one request and data feed
    try {
      const response = await axios.post(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      });

      toast({
        title: "Success",
        description: response.data.message,
      });

      // to route to other place
      router.replace("sign-in");
    } catch (error) {
      console.log("Error in signup of user", error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: "SignUp fail",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className=" w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify your Account
          </h1>
          <p className="mb-4">
            Enter the verification code sent to your email
          </p>
        </div>
        {/* //form  */}
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <Input placeholder="code" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form> 
      </div>
    </div>
  );
}

export default VerifyAccount;
