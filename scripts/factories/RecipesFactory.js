import { Recipes } from "../models/Recipes.js";

export class RecipesFactory {
    constructor(data, type) {
        if (type === 'json') {
            return new Recipes(data)
        } else {
            throw 'Unknown type format'
        }
    }
}