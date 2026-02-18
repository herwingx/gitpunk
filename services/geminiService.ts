import { GoogleGenAI } from "@google/genai";

// Declaración para que TypeScript no se queje si no hay node_modules
declare interface ImportMeta {
  readonly env: {
    readonly [key: string]: string | undefined;
  };
}

import { GET_AI_INSTRUCTION } from "../constants";
import { Language } from "../types";

let client: GoogleGenAI | null = null;

const getClient = () => {
  if (!client) {
    // 🔑 CONFIGURACIÓN API KEY:
    // Se usa el estándar de Vite para acceder a variables de entorno.
    const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || (import.meta as any).env.VITE_API_KEY || '';

    if (apiKey) {
      client = new GoogleGenAI({ apiKey });
    } else {
      console.warn("API Key not found. AI features will be disabled.");
    }
  }
  return client;
};

export const generateAiResponse = async (prompt: string, language: Language = 'es'): Promise<string> => {
  const ai = getClient();
  if (!ai) return language === 'es' ? "Error: API Key de conexión neuronal no detectada." : "Error: Neural connection API Key not detected.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: {
        systemInstruction: GET_AI_INSTRUCTION(language),
      }
    });
    return response.text || (language === 'es' ? "Sin respuesta del núcleo." : "No response from core.");
  } catch (error: any) {
    console.error("Error connecting to Gemini:", error);

    const errorMessage = error.toString().toLowerCase();

    // Handle Rate Limiting
    if (errorMessage.includes('429') || errorMessage.includes('quota') || errorMessage.includes('resource exhausted')) {
      return language === 'es'
        ? "⚠️ SOBRECARGA DE RED: Límite de velocidad alcanzado. Espera 20 segundos."
        : "⚠️ NETWORK OVERLOAD: Rate limit reached. Please wait 20 seconds.";
    }

    // Handle Service Unavailable
    if (errorMessage.includes('503') || errorMessage.includes('overloaded')) {
      return language === 'es'
        ? "⚠️ SERVIDOR OCUPADO: La matriz está saturada. Reintentando..."
        : "⚠️ SERVER BUSY: The matrix is overloaded. Retrying...";
    }

    return language === 'es'
      ? "Error Crítico: Interferencia en la señal del núcleo AI."
      : "Critical Error: AI Core signal interference.";
  }
};