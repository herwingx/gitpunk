import { GoogleGenAI } from "@google/genai";
import { GET_AI_INSTRUCTION } from "../constants";
import { Language } from "../types";

let client: GoogleGenAI | null = null;

const getClient = () => {
  if (!client) {
    // 🔑 CONFIGURACIÓN API KEY:
    // La app espera encontrar la 'API_KEY' en las variables de entorno (process.env.API_KEY).
    // No la escribas directamente aquí por seguridad si vas a compartir el código.
    const apiKey = process.env.API_KEY || '';
    
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
      model: 'gemini-3-flash-preview',
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