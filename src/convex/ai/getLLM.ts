import { LLM } from './llm.interface';

export function getLLM(): LLM {
	const llmName = process.env.LLM_TO_USE || 'openai';

	switch (llmName) {
		case 'openai':
			const { openaiLLM } = require('./openai');
			return openaiLLM;
		default:
			throw new Error(`Unsupported model: ${llmName}`);
	}
}
