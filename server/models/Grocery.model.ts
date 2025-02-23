import mongoose, { Schema, Document } from "mongoose";

export interface GroceryDAO extends Document {
    _id: string;
    user_id: string;
    list: string[];
}

const grocerySchema = new mongoose.Schema(
    {
        _id: {
            type: Schema.Types.ObjectId,
            auto: true,

        },
        user_id: {
            type: String,
            required: true,
        },
        list: {
            type: Array<string>,
            required: true,
        },
    } as const,
    { _id: false },
);

export const Grocery = mongoose.model<GroceryDAO>("Grocery", grocerySchema);
