import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini client to prevent crashes on startup if key is missing
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is required but was not found in environment variables. Define it in Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// AI Content Generation endpoint
app.post("/api/generate", async (req, res) => {
  try {
    const inputs = req.body;
    if (!inputs || !inputs.industry || !inputs.platforms || !inputs.platforms.length) {
      return res.status(400).json({ error: "Missing required generation fields (industry, platforms, goal)." });
    }

    const {
      name,
      brandName,
      industry,
      targetAudience,
      platforms,
      goal,
      description,
      keyMessage,
      tone
    } = inputs;

    const brandDisplay = brandName ? `${brandName} (acting as ${name || 'Representative'})` : (name || "Independent Brand");
    
    const userPrompt = `
      Create a high-impact, professional social media campaign and content plan based on the following specific parameters:
      - Brand/Creator: ${brandDisplay}
      - Industry & Domain: ${industry}
      - Target Audience: ${targetAudience || 'General Audience interested in ' + industry}
      - Platform Selection: ${platforms.join(', ')}
      - Primary Objective: ${goal}
      - Business/Post Description: ${description}
      - Core Message: ${keyMessage}
      - Selected Tone: ${tone}

      Ensure to output copy matching exactly these constraints:
      1. Tailor the captions specifically for each platform ordered:
         - Instagram captions and layouts should use elegant emojis, spaced visual paragraphing, and detailed visual styling directions.
         - LinkedIn posts should have a thought-provoking, mature hooks, spacing, and structured professional headers.
         - Facebook updates should feel conversational, welcoming, clear, and action-oriented.
      2. Keep everything premium, modern, and high-impact. Do not use generic placeholders.
      3. Supply 3 distinct content concepts and specific hashtag collections.
    `;

    const ai = getGenAI();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: "You are an elite, premium social media strategist and expert copywriter. You specialize in crafting high-converting captions, custom multi-slide frameworks, and viral-ready execution guides that read perfectly natural, high quality, and completely tailored to specific platforms. Avoid clichés.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: {
              type: Type.STRING,
              description: "A gorgeous, striking tagline reflecting the campaign vision",
            },
            overview: {
              type: Type.STRING,
              description: "A summary outline of the strategic core direction",
            },
            ideas: {
              type: Type.ARRAY,
              description: "Three tailored content ideas to produce immediately",
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: "A highly clickable title of the proposed post" },
                  concept: { type: Type.STRING, description: "Uniquely designed content premise or visual outline" },
                  visualSuggestion: { type: Type.STRING, description: "Suggested visuals, style, video reel framing, or graphic aesthetic" }
                },
                required: ["title", "concept", "visualSuggestion"]
              }
            },
            platformSpecifics: {
              type: Type.ARRAY,
              description: "Specific caption, outline, and tags for each selected platform",
              items: {
                type: Type.OBJECT,
                properties: {
                  platform: { type: Type.STRING, description: "Must match Instagram, LinkedIn, or Facebook" },
                  caption: { type: Type.STRING, description: "Full publication-ready copy following the exact tone and system goals" },
                  hashtags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "High-reach modern hashtags relevant to industry" },
                  outline: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Step-by-step layout framework (e.g. Page 1 text, Page 2 text, or transition guidelines)" },
                  engagementTip: { type: Type.STRING, description: "Targeted comment triggers, polls, or high-conversion question to end the post" }
                },
                required: ["platform", "caption", "hashtags", "outline", "engagementTip"]
              }
            },
            brandingAdvisory: {
              type: Type.STRING,
              description: "A professional recommendation on publish times, layout guidelines, or visual palette custom to this brand campaign"
            }
          },
          required: ["headline", "overview", "ideas", "platformSpecifics", "brandingAdvisory"]
        }
      }
    });

    if (!response.text) {
      throw new Error("No text content returned from Google Gemini API.");
    }

    const resultData = JSON.parse(response.text.trim());
    return res.json(resultData);

  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    return res.status(500).json({ error: error.message || "An unexpected error occurred during content curation." });
  }
});

// Configure Vite middleware or production static deployment
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Support wildcard routing for client SPA
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Social Presence AI server running on http://0.0.0.0:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
});
