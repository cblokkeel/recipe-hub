export interface LLM {
	generateText(prompt: string): Promise<string>;
	generateImage(prompt: string): Promise<string>;
}
