import { Translator } from "../api";

export class GeminiTranslator implements Translator {
  name = "Gemini";
  apiKey: string;
  model: string;
  prompt: string;

  constructor(apiKey: string, model: string, prompt: string) {
    this.apiKey = apiKey;
    this.model = model;
    this.prompt = prompt;
  }

  async translate(text: string, targetLang: string): Promise<string> {
    const url = "https://generativelanguage.googleapis.com/v1beta/models/" +
      encodeURIComponent(this.model) + ":generateContent?key=" + encodeURIComponent(this.apiKey);
    const body = {
      contents: [
        {
          parts: [
            { text: this.prompt.replace("{text}", text).replace("{lang}", targetLang) }
          ]
        }
      ]
    };
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error("Gemini API error: " + res.status);
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  }
}
