'use node';

import { parse } from 'node-html-parser';

class RecipeExtractor {
	private removeSpaces(txt: string): string {
		return txt.replace(/\s+/g, '');
	}

	private removeHtmlTags(html: string) {
		const root = parse(html);

		const tagsToRemove = ['script', 'footer', 'header', 'style', 'head', 'link', 'noscript'];
		tagsToRemove.forEach((tag) => {
			const elements = root.querySelectorAll(tag);
			elements.forEach((element) => {
				element.remove();
			});
		});

		return root.toString();
	}

	public async extractByURL(url: string): Promise<string> {
		const res = await fetch(url);
		const html = await res.text();

		return this.removeSpaces(this.removeHtmlTags(html));
	}
}

export const recipeExtractor = new RecipeExtractor();
