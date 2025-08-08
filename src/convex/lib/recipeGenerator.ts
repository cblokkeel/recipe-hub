import { getLLM } from '../ai/getLLM';

interface Recipe {
	title: string;
	ingredients: string[];
	instructions: string[];
}

class RecipeGenerator {
	public async generateRecipeFromText(rawText: string): Promise<Recipe> {
		const prompt = `
Extract recipe information from the following webpage text and return it in JSON format with exactly these fields:
- title: string (the recipe name)
- ingredients: array of strings (each ingredient as a separate string)
- instructions: array of strings (each step as a separate string)

The text you will receive has no spaces in it. Make sure to return the title with proper spacing and capitalization.

Webpage text:
${rawText}

Return only valid JSON with no additional text or formatting.
`;
		const responseContent = await getLLM().generateText(prompt);
		const recipe: Recipe = JSON.parse(responseContent);

		// TODO: implement better validation (zod)
		if (
			typeof recipe.title !== 'string' ||
			!Array.isArray(recipe.ingredients) ||
			!Array.isArray(recipe.instructions)
		) {
			throw new Error('Invalid recipe format received from AI');
		}

		return recipe;
	}
	catch(error: any) {
		if (error instanceof SyntaxError) {
			throw new Error('Failed to parse JSON response from AI');
		}
		throw error;
	}
}

export const recipeGenerator = new RecipeGenerator();
