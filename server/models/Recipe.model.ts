import mongoose from "mongoose";

interface RecipeDAO extends Document {
    _id: string;
    user_id: string;
    origin: string;
    ingredients: string[];
    instructions: string[];
}

const userSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
        },
        user_id: {
            type: String,
            required: true,
        },
        origin: {
            type: String,
            required: true,
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

export const Recipe = mongoose.model<RecipeDAO>("Recipe", userSchema);
