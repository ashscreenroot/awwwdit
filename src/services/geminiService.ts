import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "" });

const UX_AUDIT_PROMPT = `You are a professional UI/UX auditor. Analyze the provided image and identify UI/UX issues. 
Focus on:
- Visual hierarchy and layout
- Color contrast and accessibility
- Text readability and spacing
- User interaction patterns
- Information architecture
- Mobile responsiveness (if applicable)
- Consistency in design elements

For each issue found:
1. Provide a clear, concise title
2. Give a detailed description of the problem which is a single sentence of 30 words
3. Do not mention any strengths or what is working well

Return exactly {calloutCount} issues in the following JSON format:
{
  "title": "Audit summary",
  "subtitle": "Here are {calloutCount} issues observed in the screenshot:",
  "issues": [
    {
      "id": 1,
      "title": "Issue Title",
      "description": "Detailed description of the issue and its impact"
    }
    // ... more issues
  ]
}`;

export const analyzeImage = async (imageUrl: string, calloutCount: number) => {
  const modelName = "gemini-2.5-pro-exp-03-25";
  try {
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.status} ${imageResponse.statusText}`);
    }
    const blob = await imageResponse.blob();
    
    const base64Image = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(new Error("FileReader error: " + error));
      reader.readAsDataURL(blob);
    });

    const mimeType = blob.type;
    const imageData = base64Image.split(",")[1];

    const prompt = UX_AUDIT_PROMPT.replace(/{calloutCount}/g, calloutCount.toString());
    
    const result = await genAI.models.generateContent({
      model: modelName,
      contents: [
        { text: prompt },
        {
          inlineData: {
            mimeType: mimeType, 
            data: imageData
          }
        }
      ]
    });

    if (!result || typeof result.text !== 'string') {
      throw new Error("Invalid response structure from Gemini API.");
    }
    let text = result.text;

    // Clean the text if it's wrapped in JSON markdown
    const markdownJsonPrefix = "```json\n";
    const markdownSuffix = "\n```";
    if (text.startsWith(markdownJsonPrefix) && text.endsWith(markdownSuffix)) {
      text = text.substring(markdownJsonPrefix.length, text.length - markdownSuffix.length);
    } else if (text.startsWith("```") && text.endsWith("```")) {
      // Handle cases where it might just be ```text``` without the json specifier or newline
      text = text.substring(3, text.length - 3);
    }
    
    return JSON.parse(text);
  } catch (error) {
    console.error(`Error analyzing image with ${modelName}:`, error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("An unknown error occurred while analyzing the image.");
  }
};