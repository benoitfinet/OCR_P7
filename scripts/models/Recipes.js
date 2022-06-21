export class Recipes {
    constructor(recipe) {
        this._id = recipe.id
        this._name = recipe.name
        this._servings = recipe.servings
        this._ingredients = recipe.ingredients
        this._time = recipe.time
        this._description = recipe.description
        this._appliance = recipe.appliance
        this._ustensils = recipe.ustensils
    }

    get name() {
        return this._name
    }

    get id() {
        return this._id
    }

    get time() {
        return this._time
    }

    get servings() {
        return this._servings
    }

    get ingredients() {
        return this._ingredients
    }

    get description() {
        return this._description
    }

    get appliance() {
        return this._appliance
    }

    get ustensils() {
        return this._ustensils
    }
}