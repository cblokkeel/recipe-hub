import mongoose, { Schema } from "mongoose";

export interface RecipeDAO extends Document {
    _id: string;
    title: string;
    user_id: string;
    minio_id: string;
    img_url: string;
    origin: string;
    ingredients: string[];
    instructions: string[];
}

const recipeSchema = new mongoose.Schema(
    {
        _id: {
            type: Schema.Types.ObjectId,
            auto: true,

        },
        user_id: {
            type: String,
            required: true,
        },
        origin: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        minio_id: {
            type: String,
            required: true,
        },
        img_url: {
            type: String,
            required: false,
        },
        ingredients: {
            type: Array<String>,
            required: true,
        },
        instructions: {
            type: Array<String>,
            required: true,
        }
    } as const,
    { _id: false },
);

export const Recipe = mongoose.model<RecipeDAO>("Recipe", recipeSchema);
