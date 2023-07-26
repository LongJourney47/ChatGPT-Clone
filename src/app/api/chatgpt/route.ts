import openai from "@/app/utils/openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { product } = await req.json();

  const prompt =
    "Respond in 6-7 sentences about the topic, using the King James writing style.";
  // const prompt = 'Respond in 4-5 sentences about the topic, as if you were a batman. When signing off be sure to warn and remind the user to follow the law.'

  const messages = [
    { role: "system", content: `${prompt}` },
    {
      role: "user",
      content: ` ${product}`,
    },
  ];

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 0.7,
  });

  const responseText = completion.data.choices[0].message.content;
  return NextResponse.json({ item: responseText });
}
