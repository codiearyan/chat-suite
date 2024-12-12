export const AI_MODEL_DISPLAY = {
  "gpt-4o": {
    name: "GPT-4o",
    logo: "/providers/openai.webp",
    vision: true,
    isComingSoon: false,
  },
  "claude-3-5-sonnet-latest": {
    name: "Claude 3.5 Sonnet",
    logo: "/providers/anthropic.jpeg",
    vision: true,
    isComingSoon: false,
  },
  "gemini-1.5-pro-latest": {
    name: "Gemini 1.5 Pro",
    logo: "/providers/gemini.png",
    vision: true,
    isComingSoon: false,
  },
  "llama-3.3-70b-versatile": {
    name: "Llama 3.3 70b",
    logo: "/providers/meta.png",
    vision: false,
    isComingSoon: true,
  },
  
  "qwen-2.5-72b-instruct": {
    name: "Qwen 2.5 72b",
    logo: "/providers/qwen.png",
    vision: true,
    isComingSoon: true,
  },
} as const;

// ... rest of the file remains same ...

// Get model IDs from the display object
export const AI_MODELS = Object.keys(AI_MODEL_DISPLAY) as Array<
  keyof typeof AI_MODEL_DISPLAY
>;

// Type for model IDs
export type AIModel = keyof typeof AI_MODEL_DISPLAY;

// Type for model display info
export type AIModelDisplayInfo = {
  id: AIModel;
  name: string;
  logo: string;
};

// List of models with their display info
export const availableModels: AIModelDisplayInfo[] = AI_MODELS.map((model) => ({
  id: model,
  name: AI_MODEL_DISPLAY[model].name,
  logo: AI_MODEL_DISPLAY[model].logo,
}));
