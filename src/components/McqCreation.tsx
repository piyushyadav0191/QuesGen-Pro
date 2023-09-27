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
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { BookIcon, CopyCheck } from "lucide-react";
import { Separator } from "./ui/separator";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import LoadingQuestions from "./LoadingQuestions";

type Input = z.infer<typeof mcqCreationSchema>;

type Props = {
  topicParam: string;
};

const McqCreation = ({ topicParam }: Props) => {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(false);
  const [finished, setFinished] = useState(false);
  const { mutate: getQuestions, isLoading } = useMutation({
    mutationFn: async ({ amount, topic, type }: Input) => {
      const response = await axios.post("/api/game", {
        amount,
        topic,
        type,
      });
      return response.data;
    },
  });

  const form = useForm<Input>({
    // @ts-ignore
    resolver: zodResolver(mcqCreationSchema),
    defaultValues: {
      amount: 3,
      topic: topicParam || "",
      type: "open_ended",
    },
  });

  const onSubmit = (input: Input) => {
    setShowLoader(true);
    getQuestions(
      {
        amount: input.amount,
        topic: input.topic,
        type: input.type,
      },
      {
        onSuccess: ({ gameId }) => {
          setFinished(true);
          setTimeout(() => {
            if (form.getValues("type") === "open_ended") {
              router.push(`/play/open-ended/${gameId}`);
            } else if (form.getValues("type") === "mcq") {
              router.push(`/play/mcq-test/${gameId}`);
            } else {
              router.push("/");
            }
          }, 1000);
        },
        onError: () => {
          setShowLoader(false);
        },
      }
    );
  };

  form.watch();

  if (showLoader && isLoading) {
    return <LoadingQuestions finished={finished} />;
  }

  return (
    <div className="absolute top-[170px] left-[650px] bg-white">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black dark:text-gray-300 ">
            MCQ/OE creation
          </CardTitle>
          <CardDescription className="text-black dark:text-gray-200">
            Choose a Topic
          </CardDescription>
        </CardHeader>
        <CardContent className="dark:bg-gray-900 ">
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
                          form.setValue("amount", parseInt(e.target.value));
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
              <div className="flex justify-between">
                <Button
                  type="button"
                  className="text-black"
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
                  className="text-black"
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
