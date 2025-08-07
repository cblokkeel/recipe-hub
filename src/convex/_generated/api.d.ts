/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as ai_client from "../ai/client.js";
import type * as auth from "../auth.js";
import type * as http from "../http.js";
import type * as lib_recipeCoverGenerator from "../lib/recipeCoverGenerator.js";
import type * as lib_recipeExtractor from "../lib/recipeExtractor.js";
import type * as lib_recipeGenerator from "../lib/recipeGenerator.js";
import type * as recipe from "../recipe.js";
import type * as user from "../user.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "ai/client": typeof ai_client;
  auth: typeof auth;
  http: typeof http;
  "lib/recipeCoverGenerator": typeof lib_recipeCoverGenerator;
  "lib/recipeExtractor": typeof lib_recipeExtractor;
  "lib/recipeGenerator": typeof lib_recipeGenerator;
  recipe: typeof recipe;
  user: typeof user;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
