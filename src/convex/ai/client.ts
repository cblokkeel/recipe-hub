import { OpenAI } from 'openai/client.js';

export let openai: OpenAI;

export function getOrCreateOpenAIClient(): OpenAI {
	if (!openai) {
		openai = new OpenAI({
			apiKey: process.env.OPENAI_API_KEY
		});
	}
	return openai;
}
