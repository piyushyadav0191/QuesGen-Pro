"use client";

import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useForm } from "react-hook-form";
import { mcqCreationSchema } from "@/schemas/form/mcq";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { BookIcon, CopyCheck } from "lucide-react";
import { Separator } from "./ui/separator";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

type InputType = z.infer<typeof mcqCreationSchema>;

type Props = {
  topicParam: string;
};

const McqCreation = ({ topicParam }: Props) => {

  const router = useRouter();
  const { mutate: getQuestions } = useMutation({
    mutationFn: async ({ amount, topic, type,level }: InputType) => {
      const response = await axios.post("/api/game", {
        amount,
        topic,
        type,
        level
      });
      return response.data;
    },
  });

  const form = useForm<InputType>({
    resolver: zodResolver(mcqCreationSchema),
    defaultValues: {
      amount: 3,
      topic: topicParam || "",
      type: "open_ended",
      level: "easy",
    },
  });

  const onSubmit = (input: InputType) => {
   const loading =  toast.loading("Please wait...");
    getQuestions(
      {
        amount: input.amount,
        topic: input.topic,
        type: input.type,
        level: input.level
      },
      {
        onSuccess: ({ gameId }) => {
          toast.dismiss(loading);
          toast.success("Game created successfully");
            if (form.getValues("type") === "open_ended") {
              router.push(`/play/open-ended/${gameId}`);
            } else if (form.getValues("type") === "mcq") {
              router.push(`/play/mcq-test/${gameId}`);
            } else {
              router.push("/");
            }
        },
        onError: () => {
          toast.dismiss(loading)
          toast.error("Error creating game");
        },
      }
    );
  };

  form.watch();

  return (
    <div className="flex h-screen justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black dark:text-gray-300 ">
           See the Magic like ABRACA-DABRA
          </CardTitle>
          <CardDescription className="text-black dark:text-gray-200">
            Choose a Topic
          </CardDescription>
        </CardHeader>
        <CardContent className=" ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black dark:text-gray-300">
                      Topic
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a topic...."
                        className="text-black dark:text-gray-300"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-black dark:text-gray-400">
                      Please provide a topic
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black dark:text-gray-300">
                      Number of Questions
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-black dark:text-gray-300"
                        type="number"
                        min={1}
                        max={10}
                        placeholder="Enter a amount...."
                        {...field}
                        onChange={(e) => {
                          form.setValue("amount", Number.parseInt(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormDescription className="text-black dark:text-gray-500">
                      Please provide an amount
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Difficulty level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Difficulty Level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="easy">easy</SelectItem>
                  <SelectItem value="medium">medium</SelectItem>
                  <SelectItem value="hard">hard</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="text-black dark:text-gray-500">
                     For now, we have only easy level
                    </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
              <div className="flex justify-between">
                <Button
                  type="button"
                  className=""
                  variant={
                    form.getValues("type") === "mcq" ? "mcqButton" : "outline"
                  }
                  onClick={() => {
                    form.setValue("type", "mcq");
                  }}
                >
                  <CopyCheck className="w-4 h-4 mr-2" />
                  MCQ
                </Button>
                <Separator orientation="vertical" />
                <Button
                  className=""
                  type="button"
                  variant={
                    form.getValues("type") === "open_ended"
                      ? "mcqButton"
                      : "outline"
                  }
                  onClick={() => {
                    form.setValue("type", "open_ended");
                  }}
                >
                  <BookIcon className="w-4 h-4 mr-2" />
                  Open Ended
                </Button>
              </div>
              <Button variant={"mcqButton"} type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default McqCreation;
