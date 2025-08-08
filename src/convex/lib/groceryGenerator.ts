import { getLLM } from '../ai/getLLM';
import { Recipe } from '../recipe';

class GroceryGenerator {
	public async generateGroceryListFromRecipes(recipes: Recipe[]) {
		const flattenIngredients = recipes.reduce((acc, recipe) => {
			acc.push(...recipe.ingredients);
			return acc;
		}, [] as string[]);

		const prompt = `
        You are a helpful assistant that organizes grocery items.

You will be given a list of ingredients (as strings). Your task is to:
1. Remove duplicates and merge similar items (e.g., "tomato" and "tomatoes" → "Tomatoes").
2. Preserve any quantities or measurements if provided (e.g., "2 cups milk", "500g chicken breast").
3. Sort the items in a logical grocery shopping order, grouping implicitly by type:
   - Produce (fruits, vegetables, herbs)
   - Dairy & Eggs
   - Meat & Seafood
   - Pantry (dry goods, oils, canned items)
   - Frozen
   - Beverages
   - Spices & Seasonings
   - Other
4. Do NOT label the categories — just return a single flat list of strings in the sorted order.
5. Keep formatting clean: each item capitalized properly.

Here is the list of ingredients:
${flattenIngredients.map((item) => `- ${item}`).join('\n')}

Return only the final sorted list of strings, one per line.
        `;

		const llm = getLLM();

		const response = await llm.generateText(prompt);

		// TODO: Improve parsing to handle edge cases
		const groceryList = response
			.split('\n')
			.map((item) => item.trim())
			.filter((item) => item.length > 0);

		return groceryList;
	}
}

export const groceryGenerator = new GroceryGenerator();
