import { defineSchema, defineTable } from 'convex/server';
import { authTables } from '@convex-dev/auth/server';
import { recipeSchema } from './recipe';
import { userSchema } from './user';
import { grocerySchema } from './grocery';

const schema = defineSchema({
	...authTables,
	users: defineTable(userSchema).index('email', ['email']),
	recipes: defineTable(recipeSchema).index('by_user', ['user_id']),
	groceries: defineTable(grocerySchema).index('by_user', ['user_id'])
});

export default schema;
