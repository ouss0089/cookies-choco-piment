
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from "../types";

// Always create a new GoogleGenAI instance right before making an API call to ensure it uses the latest key
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateRecipeImage = async (recipeName: string, description: string): Promise<string> => {
  const ai = getAI();
  // Prompt renforcé pour garantir la présence d'un cookie au centre de l'image
  const prompt = `Luxurious professional food photography of a single, thick, gourmet chocolate cookie with spices, named "${recipeName}". 
    The cookie is the absolute central subject, showing rich texture, melting chocolate pools, and a dusting of exotic spices.
    Context: ${description}. 
    Style: Moody lighting, chiaroscuro, dark elegant stone background, subtle gold leaf accents on the cookie, high-end fine dining aesthetic. 
    8k resolution, cinematic lighting, sharp macro focus on the cookie texture.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9"
      }
    }
  });

  // Iterate through parts to find the inlineData containing the image as per SDK guidelines
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("Failed to generate image");
};

export const generateStepVideo = async (stepDescription: string, recipeContext: string): Promise<string> => {
  const ai = getAI();
  const prompt = `Artistic slow-motion video of a pastry chef's hands preparing a gourmet cookie: "${stepDescription}". 
    The recipe is: ${recipeContext}. Luxury kitchen environment, warm dramatic lighting, focus on textures of cookie dough, melting chocolate, and spices.`;

  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt,
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: '16:9'
    }
  });

  // Poll for operation completion as per video generation documentation
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!downloadLink) throw new Error("Video generation failed");

  // Appending API key to fetch the video bytes from the generated URI
  const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};
