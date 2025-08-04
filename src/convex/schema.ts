import { defineSchema, defineTable } from 'convex/server';
import { authTables } from '@convex-dev/auth/server';
import { v } from 'convex/values';
import { recipeSchema } from './recipe';

const schema = defineSchema({
	...authTables,
	recipes: defineTable(recipeSchema)
});

export default schema;
