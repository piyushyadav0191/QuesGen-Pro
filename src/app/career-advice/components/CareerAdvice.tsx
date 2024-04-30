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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { careerAdviceSchema } from "@/schemas/form/mcq";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


type Input = z.infer<typeof careerAdviceSchema>;

const CareerAdvice = () => {

  const router = useRouter();

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
        onSuccess: () => {
          router.push("/ai-answer");
        },
        onError: () => {
          toast.error("Error getting advice");
          router.push("/pricing")
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
          <CardHeader>
          <CardTitle className="text-2xl font-bold text-black dark:text-gray-300 ">
            Career Advice
          </CardTitle>
          <CardDescription className="text-black dark:text-gray-200">
            Get career advice based on your experience and topic.
          </CardDescription>
        </CardHeader>
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
                    This is your public display topic.
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
