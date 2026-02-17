# ⚡ GitPunk: Protocolo de Inicio

**GitPunk** es una guía interactiva y visual estilo Cyberpunk para aprender Git y GitHub desde cero. Diseñada para principiantes, combina una estética futurista (High-Tech / Apple-style) con herramientas de simulación y asistencia por IA.

## 🚀 Características Principales

- **🎮 Gamificación del Aprendizaje:** Roadmap progresivo dividido en Fases y Nodos, desde la instalación hasta el despliegue.
- **🖥️ Simulador de Terminal:** Consola interactiva que simula la escritura y ejecución de comandos reales en Windows (PowerShell) y Mac/Linux (Bash).
- **✨ Estética Cyberpunk & Clean:** Diseño UI moderno con efectos de cristal (glassmorphism), neones, animaciones fluidas y sonidos SFX inmersivos.
- **🌗 Temas Dinámicos:** Soporte completo para **Modo Oscuro** (Cyberpunk Void) y **Modo Claro** (High-Tech Lab).
- **🤖 Asistente IA (Gemini):** Un chat integrado (GitPunk AI) restringido estrictamente al contexto de Git/GitHub para resolver dudas, potenciado por Google Gemini.
- **📊 Visualizador de Flujo:** Gráficos animados que explican visualmente el ciclo de vida de los archivos (Working Dir -> Staging -> Repo -> Remote).
- **🧠 Matriz de Protocolos:** Una "Cheat Sheet" holográfica con los comandos esenciales accesible en cualquier momento.
- **🌍 Bilingüe:** Soporte nativo para Español e Inglés con cambio instantáneo.

## 🛠️ Tech Stack

- **Core:** React 19, TypeScript.
- **Estilos:** Tailwind CSS (con variables CSS nativas para theming).
- **IA:** Google GenAI SDK (Gemini 3 Flash).
- **Iconos:** Lucide React.
- **Audio:** Web Audio API (Sintetizador personalizado sin archivos externos).

## 📦 Instalación y Uso

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/GitPunk.git
   cd GitPunk
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar API Key (Opcional para IA):**
   Para habilitar el chat con la Inteligencia Artificial (GitPunk AI), sigue estos pasos:
   
   1. Ve a [Google AI Studio](https://aistudio.google.com/app/apikey) y genera una API Key gratuita.
   2. En la raíz del proyecto, crea un archivo llamado `.env` (sin nombre, solo la extensión).
   3. Abre el archivo y pega tu clave con el siguiente formato:
      ```env
      API_KEY=AIzaSyTuClaveSecretaDeGoogleGemini
      ```
   4. Guarda el archivo. El sistema leerá `process.env.API_KEY` automáticamente.

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

## 🤝 Contribución

Las contribuciones son bienvenidas. Si tienes ideas para nuevos "Nodos" de aprendizaje o mejoras visuales, por favor abre un issue o un pull request.

---

<p align="center">
  Protocolo Iniciado por <strong>herwingx</strong>
</p>