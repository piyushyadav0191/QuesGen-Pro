"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { careerAdviceSchema } from "@/schemas/form/mcq";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import { useChat } from 'ai/react';
import { set } from "date-fns";


type Props = {};
type Input = z.infer<typeof careerAdviceSchema>;

const CareerAdvice = (props: Props) => {

  const [advices, setAdvices] = useState([]);  

  const form = useForm<z.infer<typeof careerAdviceSchema>>({
    resolver: zodResolver(careerAdviceSchema),
    defaultValues: {
      topic: "",
      experienced: "fresher",
    },
  });

  const { mutate: getAdvice, isLoading,  } = useMutation({
    mutationFn: async ({ topic, experienced }: Input) => {
      const response = await axios.post("/api/learning", {
        topic,
        experienced,
      });
      return response.data;
    },
  });
  const onSubmit = (input: Input) => {
    getAdvice(
      {
        topic: input.topic,
        experienced: input.experienced,
      },
      {
        onSuccess: (data) => {
          // setAdvices(data)
          // console.log(data)
          // router.push("/ai-answer");
        },
        onError: (error) => {
          // @ts-ignore
          // if (error?.response?.data?.error) {
          //   router.push("/pricing");
          // }
          toast.error("Error getting advice");
        },
      }
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>

      <div className="min-h-screen flex items-center justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="topic..." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experienced"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="">
                      <SelectItem value="experienced">experienced</SelectItem>
                      <SelectItem value="fresher">fresher</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default CareerAdvice;
