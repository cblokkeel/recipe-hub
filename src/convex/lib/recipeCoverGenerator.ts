import { OpenAI } from 'openai/client.js';
import { Recipe } from '../recipe';

class RecipeCoverGenerator {
	public async generateCoverFromRecipe(
		recipe: Recipe,
		openai: OpenAI
	): Promise<string | undefined> {
		const prompt = `Create a realistic, high‑resolution photo of the final dish described by the following recipe.
Ingredients: ${recipe.ingredients.join('; ')}.
Instructions: ${recipe.instructions.join('; ')}.
The image should look like a professionally plated, well‑lit restaurant dish photographed from a slight overhead angle, with a clean white plate, subtle natural lighting, and a shallow depth of field that highlights texture and color.`;

		const response = await openai.images.generate({
			model: 'dall-e-3',
			prompt,
			n: 1,
			size: '1024x1024'
		});

		return response.data?.[0].url;
	}
}

export const recipeCoverGenerator = new RecipeCoverGenerator();
