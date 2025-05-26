import { NextResponse } from "next/server";
import OpenAI from "openai";

// Use VOICE_OPENAI_API_KEY if defined, fall back to OPENAI_API_KEY otherwise
const apiKey = process.env.VOICE_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: apiKey,
});

export async function POST(req: Request) {
  try {
    // Retrieve the entire JSON object from the request.
    const body = await req.json();

    // Spread the entire body into the API call.
    const completion = await openai.chat.completions.create({
      ...body,
    });

    return NextResponse.json(completion);
  } catch (error: any) {
    console.error("Error in /chat/completions:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
