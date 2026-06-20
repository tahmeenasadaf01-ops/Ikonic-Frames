var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var aiClient = null;
function getGenAI() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is required but was not found in environment variables. Define it in Secrets.");
    }
    aiClient = new import_genai.GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}
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
    const brandDisplay = brandName ? `${brandName} (acting as ${name || "Representative"})` : name || "Independent Brand";
    const userPrompt = `
      Create a high-impact, professional social media campaign and content plan based on the following specific parameters:
      - Brand/Creator: ${brandDisplay}
      - Industry & Domain: ${industry}
      - Target Audience: ${targetAudience || "General Audience interested in " + industry}
      - Platform Selection: ${platforms.join(", ")}
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
        systemInstruction: "You are an elite, premium social media strategist and expert copywriter. You specialize in crafting high-converting captions, custom multi-slide frameworks, and viral-ready execution guides that read perfectly natural, high quality, and completely tailored to specific platforms. Avoid clich\xE9s.",
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.OBJECT,
          properties: {
            headline: {
              type: import_genai.Type.STRING,
              description: "A gorgeous, striking tagline reflecting the campaign vision"
            },
            overview: {
              type: import_genai.Type.STRING,
              description: "A summary outline of the strategic core direction"
            },
            ideas: {
              type: import_genai.Type.ARRAY,
              description: "Three tailored content ideas to produce immediately",
              items: {
                type: import_genai.Type.OBJECT,
                properties: {
                  title: { type: import_genai.Type.STRING, description: "A highly clickable title of the proposed post" },
                  concept: { type: import_genai.Type.STRING, description: "Uniquely designed content premise or visual outline" },
                  visualSuggestion: { type: import_genai.Type.STRING, description: "Suggested visuals, style, video reel framing, or graphic aesthetic" }
                },
                required: ["title", "concept", "visualSuggestion"]
              }
            },
            platformSpecifics: {
              type: import_genai.Type.ARRAY,
              description: "Specific caption, outline, and tags for each selected platform",
              items: {
                type: import_genai.Type.OBJECT,
                properties: {
                  platform: { type: import_genai.Type.STRING, description: "Must match Instagram, LinkedIn, or Facebook" },
                  caption: { type: import_genai.Type.STRING, description: "Full publication-ready copy following the exact tone and system goals" },
                  hashtags: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING }, description: "High-reach modern hashtags relevant to industry" },
                  outline: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING }, description: "Step-by-step layout framework (e.g. Page 1 text, Page 2 text, or transition guidelines)" },
                  engagementTip: { type: import_genai.Type.STRING, description: "Targeted comment triggers, polls, or high-conversion question to end the post" }
                },
                required: ["platform", "caption", "hashtags", "outline", "engagementTip"]
              }
            },
            brandingAdvisory: {
              type: import_genai.Type.STRING,
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
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    return res.status(500).json({ error: error.message || "An unexpected error occurred during content curation." });
  }
});
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Social Presence AI server running on http://0.0.0.0:${PORT}`);
  });
}
start().catch((err) => {
  console.error("Failed to start server:", err);
});
//# sourceMappingURL=server.cjs.map
