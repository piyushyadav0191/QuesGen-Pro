import { chatSession } from "@/lib/AI";
import { mcqCreationSchema } from "@/schemas/form/mcq";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { amount, topic, type,level } = mcqCreationSchema.parse(body);
    let questions: any;
    if (type === "open_ended") {
      questions = await  chatSession.sendMessage(`You are a helpful AI that is able to generate a ${amount} ${level} ${type}  question and answers about ${topic}, the length of each answer should not be more than 15 words, Question with answered in Json format, Give question and answered as field in JSON and don't use curly braces at start and end of the JSON.`)

      const result = (questions.response.text().replace('```json', '').replace('```', '' )).trim();
    // Wrap the result in square brackets to form a valid JSON array
    const validJsonString = `${result}`;
    console.log("string result from questions api", validJsonString);
      questions = JSON.parse(validJsonString);
    } else if (type === "mcq") {
      questions = await chatSession.sendMessage(
        `You are a helpful AI that is able to generate a ${amount} ${level} ${type} question and answers about ${topic}, the length of each answer should not be more than 15 words and options should be numbered like option1: "option1 with max length of 15 words", option2: "option2 with max length of 15 words", etc and should not be more than 4, Question with answered in Json format, Give question and answered as field in JSON. 
    
        The format should be as follows:
        
            "question": "question",
            "answer": "answer with max length of 15 words",
            "option1": "option1 with max length of 15 words",
            "option2": "option2 with max length of 15 words",
            "option3": "option3 with max length of 15 words",
            "option4": "option4 with max length of 15 words"
        `
    );
    
    const result = (questions.response.text().replace('```json', '').replace('```', '' )).trim();
    // Wrap the result in square brackets to form a valid JSON array
    const validJsonString = `[${result}]`;
    console.log("string result from questions api", validJsonString);
      questions = JSON.parse(validJsonString);
      // console.log("jsonresponse from questions api", JsonResponse);
     
    }
      
    return NextResponse.json(
      {
        questions,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        }
      );
    } else {
      console.error("error", error);
      return NextResponse.json(
        { error: error },
        {
          status: 500,
        }
      );
    }
  }
};
