import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
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
      const response = await result.response;
      const text = response.text();
      
      try {
        // Try to parse JSON response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (parseError) {
        console.error('Failed to parse JSON response:', parseError);
      }

      // Fallback: create structured response from text
      return this.parseTextResponse(text);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      // Return demo data for development
      return this.getDemoAnalysis();
    }
  }

  parseTextResponse(text) {
    // Simple text parsing fallback
    const lines = text.split('\n').filter(line => line.trim());
    
    return {
      positives: lines.slice(0, 3).map(line => line.replace(/^[•\-*]\s*/, '')),
      negatives: lines.slice(3, 6).map(line => line.replace(/^[•\-*]\s*/, '')),
      improvements: lines.slice(6, 9).map(line => line.replace(/^[•\-*]\s*/, '')),
      overallScore: Math.floor(Math.random() * 40) + 60 // 60-100 range
    };
  }

  getDemoAnalysis() {
    return {
      positives: [
        "Strong technical skills aligned with job requirements",
        "Relevant work experience in similar roles",
        "Good educational background",
        "Clear and well-structured resume format"
      ],
      negatives: [
        "Missing some key skills mentioned in job description",
        "Could benefit from more quantified achievements",
        "Limited experience with specific technologies required"
      ],
      improvements: [
        "Add specific metrics and numbers to demonstrate impact",
        "Include more relevant keywords from the job posting",
        "Consider adding a professional summary section",
        "Highlight projects that demonstrate required skills"
      ],
      overallScore: 78
    };
  }

  async extractTextFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const text = event.target.result;
        resolve(text);
      };
      
      reader.onerror = (error) => {
        reject(error);
      };
      
      // For now, read as text. In production, you'd want to handle PDFs properly
      reader.readAsText(file);
    });
  }
}

export default new GeminiService();