import { getLLM } from '../ai/getLLM';
import { Recipe } from '../recipe';

class RecipeCoverGenerator {
	public async generateCoverFromRecipe(recipe: Recipe): Promise<string | undefined> {
		const prompt = `
Create a realistic, high‑resolution food photograph of the final prepared dish: "${recipe.name}".
This is a fully cooked, beautifully plated version, as it would be served in a high-end restaurant.
Do not show raw ingredients such as whole eggs, butter blocks, or uncooked flour.
The dish should be presented on a clean white plate, photographed from a slight overhead angle,
with subtle natural lighting and a shallow depth of field that highlights the texture and color of the food.
The style should be appetizing, elegant, and professional — perfect for a recipe book cover.
`;
		const responseContent = await getLLM().generateImage(prompt);
		return responseContent;
	}
}

export const recipeCoverGenerator = new RecipeCoverGenerator();
