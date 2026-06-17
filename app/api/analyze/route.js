import { GoogleGenAI } from "@google/genai";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image");

    if (!image) {
      return Response.json({ error: "No image provided" }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const mimeType = image.type;

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `You are a nutrition expert. Analyze this food image and respond ONLY in this exact JSON format, no markdown, no extra text:
{
  "foodName": "name of the food",
  "confidence": "high/medium/low",
  "servingSize": "estimated serving size",
  "calories": 000,
  "macros": {
    "protein": 00,
    "carbs": 00,
    "fat": 00,
    "fiber": 00
  },
  "ingredients": ["ingredient1", "ingredient2"],
  "healthScore": 0,
  "tip": "one short health tip about this food"
}

If you cannot identify food in the image, return:
{"error": "No food detected in image"}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      // config: {
      //   temperature: 0,
      // },
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType: mimeType,
                data: base64,
              },
            },
            { text: prompt },
          ],
        },
      ],
    });

    const text = response.candidates[0].content.parts[0].text.trim();
    const cleaned = text.replace(/```json|```/g, "").trim();
    const data = JSON.parse(cleaned);

    return Response.json(data);
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ error: "Failed to analyze image" }, { status: 500 });
  }
}