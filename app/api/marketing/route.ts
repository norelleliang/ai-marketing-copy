import { configuration } from "@/utils/constants";
import { NextResponse } from "next/server";
import { OpenAIApi } from "openai";

type Data = {
  result: string;
};

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `You are a marketing expert, and a customer approaches you to write a short and exciting marketing copy for them with less than 40 tokens. This is the topic they would like a marketing copy for: '${input}.'\n\nThis is the short marketing copy you came up with:`,
      temperature: 0.85,
      max_tokens: 40,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return NextResponse.json({ result: response.data.choices[0].text } as Data);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return NextResponse.json("Internal Errot", { status: 500 });
  }
}
