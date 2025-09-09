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


import { GoogleGenerativeAI } from '@google/generative-ai';
import * as pdfjsLib from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';

// Configure PDF.js worker (Vite-compatible)
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

// Load environment variables
const API_KEY = import.meta.env.VITE_API_KEY;

class GeminiService {
  constructor() {
    if (!API_KEY) {
      throw new Error('API_KEY is not defined in environment variables');
    }
    this.genAI = new GoogleGenerativeAI(API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }

  async analyzeResume(jobDescription, resumeText) {
    try {
      const prompt = `
        Please analyze the following resume against the job description and provide detailed feedback.

        Job Description:
        ${jobDescription}

        Resume:
        ${resumeText}

        Please provide your analysis in the following JSON format:
        {
          "positives": ["list of positive points about the resume"],
          "negatives": ["list of areas that need improvement"],
          "improvements": ["specific suggestions for improvement"],
          "overallScore": number between 1-100
        }

        Focus on:
        1. Skills alignment with job requirements
        2. Experience relevance
        3. Formatting and presentation
        4. Keywords matching
        5. Overall fit for the position
      `;

      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      // Robust JSON extraction (handles nested braces)
      let parsed;
      try {
        const match = text.match(/\{(?:[^{}]|{[^{}]*})*\}/);
        if (!match) throw new Error('No JSON object found in model response.');
        parsed = JSON.parse(match[0]);
      } catch (err) {
        console.error('Raw model response:', text);
        throw new Error('Failed to parse API response as JSON.');
      }

      return parsed;
    } catch (error) {
      console.error('Error analyzing resume:', error);
      throw new Error(`Analysis failed: ${error.message}`);
    }
  }

  // ✅ Only for resumes (PDF upload)
  async extractResumeText(file) {
    try {
      if (file.type !== 'application/pdf') {
        throw new Error('Please upload a PDF resume.');
      }

      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      let textContent = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const text = await page.getTextContent();
        const strings = text.items.map(item => item.str.trim());
        textContent += strings.join(' ') + '\n\n';
      }

      return textContent;
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      throw new Error(`Failed to extract text from PDF: ${error.message}`);
    }
  }
}

export default new GeminiService();
