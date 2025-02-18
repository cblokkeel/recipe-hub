import { Recipe } from "~/server/models/Recipe.model";

type PromiseResolvedType<T> = T extends Promise<infer R> ? R : never;

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const key: string = body.Key;

    if (!key) {
        throw createError({
            statusCode: 400,
            message: "no key"
        });
    }

    const [_, __, fileName] = key.split("/");

    // TODO: validate fileName
    const query = Recipe.findOne({
        "minio_id": fileName.split(".")[0],
    });

    let recipe: PromiseResolvedType<ReturnType<typeof query.exec>>

    try {
        recipe = await query.exec();
    } catch (err) {
        throw createError({
            statusCode: 500,
            message: "error retrieving recipe",
        });
    }

    if (!recipe) {
        throw createError({
            statusCode: 404,
            message: "no recipe found"
        });
    }

    recipe.img_url = `${process.env.MINIO_API_URL}/${key}`;

    await recipe.save();

    return;
});

