import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST() {
  const { text } = await generateText({
    model: openai("gpt-4.1-nano"),
    prompt: "Write a short product description for a modern lamp.",
  });
  return Response.json({ text });
}
