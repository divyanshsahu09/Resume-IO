// import { GoogleGenerativeAI } from '@google/generative-ai';
// import * as pdfjsLib from 'pdfjs-dist';
// import workerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';

// // Configure PDF.js worker (Vite-compatible)
// pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

// // Load environment variables
// const API_KEY = import.meta.env.VITE_API_KEY;

// class GeminiService {
//   constructor() {
//     if (!API_KEY) {
//       throw new Error('API_KEY is not defined in environment variables');
//     }
//     this.genAI = new GoogleGenerativeAI(API_KEY);
//     this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
//   }

//   async analyzeResume(jobDescription, resumeText) {
//     try {
//       const prompt = `
//         Please analyze the following resume against the job description and provide detailed feedback.

//         Job Description:
//         ${jobDescription}

//         Resume:
//         ${resumeText}

//         Please provide your analysis in the following JSON format:
//         {
//           "positives": ["list of positive points about the resume"],
//           "negatives": ["list of areas that need improvement"],
//           "improvements": ["specific suggestions for improvement"],
//           "overallScore": number between 1-100
//         }

//         Focus on:
//         1. Skills alignment with job requirements
//         2. Experience relevance
//         3. Formatting and presentation
//         4. Keywords matching
//         5. Overall fit for the position
//       `;

//       const result = await this.model.generateContent(prompt);
//       const response = result.response;
//       const text = response.text();

//       // Robust JSON extraction (handles nested braces)
//       let parsed;
//       try {
//         const match = text.match(/\{(?:[^{}]|{[^{}]*})*\}/);
//         if (!match) throw new Error('No JSON object found in model response.');
//         parsed = JSON.parse(match[0]);
//       } catch (err) {
//         console.error('Raw model response:', text);
//         throw new Error('Failed to parse API response as JSON.');
//       }

//       return parsed;
//     } catch (error) {
//       console.error('Error analyzing resume:', error);
//       throw new Error(`Analysis failed: ${error.message}`);
//     }
//   }

//   async extractTextFromFile(file) {
//     try {
//       if (file.type !== 'application/pdf') {
//         throw new Error('Please upload a PDF file.');
//       }

//       const arrayBuffer = await file.arrayBuffer();
//       const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
//       const pdf = await loadingTask.promise;
//       let textContent = '';

//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const text = await page.getTextContent();
//         const strings = text.items.map(item => item.str.trim());
//         textContent += strings.join(' ') + '\n\n';
//       }

//       return textContent;
//     } catch (error) {
//       console.error('Error extracting text from PDF:', error);
//       throw new Error(`Failed to extract text from PDF: ${error.message}`);
//     }
//   }
// }

// export default new GeminiService();


// import { GoogleGenerativeAI } from '@google/generative-ai';
// import * as pdfjsLib from 'pdfjs-dist';
// import workerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';

// // Configure PDF.js worker (Vite-compatible)
// pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

// // Load environment variables
// const API_KEY = import.meta.env.VITE_API_KEY;

// class GeminiService {
//   constructor() {
//     if (!API_KEY) {
//       throw new Error('API_KEY is not defined in environment variables');
//     }
//     this.genAI = new GoogleGenerativeAI(API_KEY);
//     this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
//   }

//   async analyzeResume(jobDescription, resumeText) {
//     try {
//       const prompt = `
//         Please analyze the following resume against the job description and provide detailed feedback.

//         Job Description:
//         ${jobDescription}

//         Resume:
//         ${resumeText}

//         Please provide your analysis in the following JSON format:
//         {
//           "positives": ["list of positive points about the resume"],
//           "negatives": ["list of areas that need improvement"],
//           "improvements": ["specific suggestions for improvement"],
//           "overallScore": number between 1-100
//         }

//         Focus on:
//         1. Skills alignment with job requirements
//         2. Experience relevance
//         3. Formatting and presentation
//         4. Keywords matching
//         5. Overall fit for the position
//       `;

//       const result = await this.model.generateContent(prompt);
//       const response = result.response;
//       const text = response.text();

//       // Robust JSON extraction (handles nested braces)
//       let parsed;
//       try {
//         const match = text.match(/\{(?:[^{}]|{[^{}]*})*\}/);
//         if (!match) throw new Error('No JSON object found in model response.');
//         parsed = JSON.parse(match[0]);
//       } catch (err) {
//         console.error('Raw model response:', text);
//         throw new Error('Failed to parse API response as JSON.');
//       }

//       return parsed;
//     } catch (error) {
//       console.error('Error analyzing resume:', error);
//       throw new Error(`Analysis failed: ${error.message}`);
//     }
//   }

//   // ✅ Only for resumes (PDF upload)
//   async extractResumeText(file) {
//     try {
//       if (file.type !== 'application/pdf') {
//         throw new Error('Please upload a PDF resume.');
//       }

//       const arrayBuffer = await file.arrayBuffer();
//       const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
//       const pdf = await loadingTask.promise;
//       let textContent = '';

//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const text = await page.getTextContent();
//         const strings = text.items.map(item => item.str.trim());
//         textContent += strings.join(' ') + '\n\n';
//       }

//       return textContent;
//     } catch (error) {
//       console.error('Error extracting text from PDF:', error);
//       throw new Error(`Failed to extract text from PDF: ${error.message}`);
//     }
//   }
// }

// export default new GeminiService();



// import { GoogleGenerativeAI } from "@google/generative-ai";
// import * as pdfjsLib from "pdfjs-dist";
// import workerUrl from "pdfjs-dist/build/pdf.worker.mjs?url";

// pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

// const GEMINI_KEY = import.meta.env.VITE_API_KEY;
// const OPENROUTER_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

// class GeminiService {
//   constructor() {
//     if (!GEMINI_KEY && !OPENROUTER_KEY) {
//       throw new Error("No AI API key configured.");
//     }

//     if (GEMINI_KEY) {
//       this.genAI = new GoogleGenerativeAI(GEMINI_KEY);
//       this.model = this.genAI.getGenerativeModel({
//         model: "gemini-2.0-flash",
//       });
//     }
//   }

//   createPrompt(jobDescription, resumeText) {
//     return `
// Please analyze the following resume against the job description and provide detailed feedback.

// Job Description:
// ${jobDescription}

// Resume:
// ${resumeText}

// Return ONLY valid JSON.

// {
//   "positives": [],
//   "negatives": [],
//   "improvements": [],
//   "overallScore": 0
// }

// Focus on:
// 1. Skills alignment
// 2. Experience relevance
// 3. Formatting
// 4. Keyword matching
// 5. Overall fit
// `;
//   }

//   extractJSON(text) {
//     const match = text.match(/\{[\s\S]*\}/);
//     if (!match) throw new Error("No JSON found.");
//     return JSON.parse(match[0]);
//   }

//   // -------------------------
//   // Gemini
//   // -------------------------
//   async analyzeWithGemini(prompt) {
//     const result = await this.model.generateContent(prompt);
//     return this.extractJSON(result.response.text());
//   }

//   // -------------------------
//   // OpenRouter
//   // -------------------------
//   async analyzeWithOpenRouter(prompt) {
//     const response = await fetch(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${OPENROUTER_KEY}`,
//           "Content-Type": "application/json",
//           "HTTP-Referer":
//             import.meta.env.VITE_SITE_URL || "http://localhost:5173",
//           "X-Title":
//             import.meta.env.VITE_SITE_NAME || "Resume Analyzer",
//         },
//         body: JSON.stringify({
//           model: "gemini-2.5-flash",
//           messages: [
//             {
//               role: "user",
//               content: prompt,
//             },
//           ],
//           temperature: 0.2,
//         }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`OpenRouter Error ${response.status}`);
//     }

//     const data = await response.json();

//     const text = data.choices[0].message.content;

//     return this.extractJSON(text);
//   }

//   // -------------------------
//   // Main function with fallback
//   // -------------------------
//   async analyzeResume(jobDescription, resumeText) {
//     const prompt = this.createPrompt(jobDescription, resumeText);

//     // Try Gemini first
//     if (this.model) {
//       try {
//         console.log("Using Gemini...");
//         return await this.analyzeWithGemini(prompt);
//       } catch (err) {
//         console.warn("Gemini failed. Switching to OpenRouter.", err);
//       }
//     }

//     // Fallback to OpenRouter
//     if (OPENROUTER_KEY) {
//       try {
//         console.log("Using OpenRouter...");
//         return await this.analyzeWithOpenRouter(prompt);
//       } catch (err) {
//         console.error("OpenRouter failed.", err);
//         throw new Error("Both Gemini and OpenRouter failed.");
//       }
//     }

//     throw new Error("No AI provider available.");
//   }

//   // -------------------------
//   // Resume PDF Extraction
//   // -------------------------
//   async extractResumeText(file) {
//     try {
//       if (file.type !== "application/pdf") {
//         throw new Error("Please upload a PDF resume.");
//       }

//       const arrayBuffer = await file.arrayBuffer();
//       const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
//       const pdf = await loadingTask.promise;

//       let textContent = "";

//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const text = await page.getTextContent();
//         textContent +=
//           text.items.map((item) => item.str.trim()).join(" ") + "\n\n";
//       }

//       return textContent;
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   }
// }

// export default new GeminiService();



import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import * as pdfjsLib from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

const GEMINI_KEY = import.meta.env.VITE_API_KEY;
const OPENROUTER_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

class GeminiService {
  constructor() {
    if (!GEMINI_KEY && !OPENROUTER_KEY) {
      throw new Error("No AI API key configured.");
    }

    // -----------------------------
    // Google Gemini
    // -----------------------------
    if (GEMINI_KEY) {
      this.genAI = new GoogleGenerativeAI(GEMINI_KEY);
      this.model = this.genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
      });
    }

    // -----------------------------
    // OpenRouter
    // -----------------------------
    if (OPENROUTER_KEY) {
      this.openrouter = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: OPENROUTER_KEY,
        dangerouslyAllowBrowser: true,
        defaultHeaders: {
          "HTTP-Referer":
            import.meta.env.VITE_SITE_URL || window.location.origin,
          "X-Title":
            import.meta.env.VITE_SITE_NAME || "Resume Analyzer",
        },
      });
    }
  }

  // ---------------------------------------
  // Prompt
  // ---------------------------------------
  createPrompt(jobDescription, resumeText) {
    return `
Please analyze the following resume against the job description and provide detailed feedback.

Job Description:
${jobDescription}

Resume:
${resumeText}

Return ONLY valid JSON.

{
  "positives": [],
  "negatives": [],
  "improvements": [],
  "overallScore": 0
}

Focus on:
1. Skills alignment
2. Experience relevance
3. Formatting
4. Keyword matching
5. Overall fit
`;
  }

  // ---------------------------------------
  // Extract JSON
  // ---------------------------------------
  extractJSON(text) {
    if (!text) {
      throw new Error("Empty AI response.");
    }

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const match = cleaned.match(/\{[\s\S]*\}/);

    if (!match) {
      throw new Error("No JSON found in AI response.");
    }

    return JSON.parse(match[0]);
  }

  // ---------------------------------------
  // Gemini
  // ---------------------------------------
  async analyzeWithGemini(prompt) {
    const result = await this.model.generateContent(prompt);

    const text = result.response.text();

    return this.extractJSON(text);
  }

  // ---------------------------------------
  // OpenRouter
  // ---------------------------------------
  async analyzeWithOpenRouter(prompt) {
    const completion = await this.openrouter.chat.completions.create({
      // You can change this model anytime
      model: "nvidia/nemotron-3-ultra-550b-a55b:free",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      reasoning: {
        enabled: true,
      },

      temperature: 0.2,
    });

    const message = completion.choices?.[0]?.message;

    if (!message?.content) {
      throw new Error("Empty OpenRouter response.");
    }

    // Optional: inspect reasoning
    if (message.reasoning_details) {
      console.log("Reasoning:", message.reasoning_details);
    }

    return this.extractJSON(message.content);
  }

  // ---------------------------------------
  // Main Analysis (Gemini -> OpenRouter)
  // ---------------------------------------
  async analyzeResume(jobDescription, resumeText) {
    const prompt = this.createPrompt(jobDescription, resumeText);

    // Try Gemini first
    if (this.model) {
      try {
        console.log("Using Google Gemini...");
        return await this.analyzeWithGemini(prompt);
      } catch (error) {
        console.warn("Gemini failed. Switching to OpenRouter.");
        console.error(error);
      }
    }

    // Fallback to OpenRouter
    if (this.openrouter) {
      try {
        console.log("Using OpenRouter...");
        return await this.analyzeWithOpenRouter(prompt);
      } catch (error) {
        console.error("OpenRouter failed.");
        console.error(error);
      }
    }

    throw new Error("Both Gemini and OpenRouter failed.");
  }

  // ---------------------------------------
  // PDF Resume Extraction
  // ---------------------------------------
  async extractResumeText(file) {
    try {
      if (file.type !== "application/pdf") {
        throw new Error("Please upload a PDF resume.");
      }

      const arrayBuffer = await file.arrayBuffer();

      const loadingTask = pdfjsLib.getDocument({
        data: arrayBuffer,
      });

      const pdf = await loadingTask.promise;

      let textContent = "";

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);

        const text = await page.getTextContent();

        textContent +=
          text.items
            .map((item) => ("str" in item ? item.str : ""))
            .join(" ") + "\n\n";
      }

      return textContent.trim();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new GeminiService();