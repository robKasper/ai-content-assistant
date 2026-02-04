import Anthropic from "@anthropic-ai/sdk";

export async function GET() {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 100,
      messages: [{ role: "user", content: "Say hello!" }],
    });

    return Response.json({
      success: true,
      message:
        message.content[0].type === "text" ? message.content[0].text : "",
    });
  } catch (error) {
    return Response.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
