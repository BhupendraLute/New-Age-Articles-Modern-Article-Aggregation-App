import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function summarizeArticle(
	article: any
): Promise<any> {
	const apiKey = process.env.GEMINI_API_KEY;

	if (!apiKey) {
		console.error("GEMINI_API_KEY is not set.");
		return null;
	}

	try {
		const genAI = new GoogleGenerativeAI(apiKey);
		const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

		const prompt = `
      Summarize the following article (provided in markdown format) in about 150 words:
      ${article}
    `;

		const result = await model.generateContent(prompt);
		const response = await result.response;
		const summary = response.text();

		return summary;
	} catch (error: any) {
		console.error("Error summarizing article:", error);
		return null;
	}
}
