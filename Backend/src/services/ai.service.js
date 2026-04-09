import { GoogleGenAI } from "@google/genai";
const {z} = require("zod");
const {zodToJsonSchema} = require("zod-to-json-schema");
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEN_API_KEY,
});

async function invokeGenAi(){
    const response = await ai.generateContent({
        model: "models/gemini-2.5-flash",
        contents:"Hello, how are you?"
    });
    console.log(response.text);

}
async function generateInterviewReport(resume,selfDescription,overallScore,technicalQuestions,behavioralQuestions,skillGaps,preparationPlan){
    const interviewReportSchema = z.object({
        jobDescription: z.string(),
    });
}
module.exports = {
    invokeGenAi
};