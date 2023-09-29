import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { feedbackSchema } from "@/schemas/feedback";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./ui/use-toast";

export function FeedbackSheet() {
  const { toast } = useToast();

  type Input = z.infer<typeof feedbackSchema>;

  const { mutate: getFeedback, isLoading } = useMutation({
    mutationFn: async ({ feedback, name }: Input) => {
      const response = await axios.post("/api/feedback", {
        feedback,
        name,
      });
      return response.data;
    },
  });

  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      feedback: "",
    },
  });
  function onSubmit(values: z.infer<typeof feedbackSchema>) {
    getFeedback(
      {
        name: values.name,
        feedback: values.feedback,
      },
      {
        onSuccess: () => {
          toast({
            title: "Feedback Submitted",
          });
        },
        onError: () => {
          toast({
            title: "Something went wrong",
          });
        },
      }
    );
  }
  form.watch();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Give Feedback</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>How was the Test?</SheetTitle>
          <SheetDescription>
            By taking the feedback from you, We can make our test more better
            and comfortable.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="write you name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feedback</FormLabel>
                  <FormControl>
                    <Input placeholder="write you feedback..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter>
              <SheetClose asChild>
                <Button disabled={isLoading} type="submit">
                  Send
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
