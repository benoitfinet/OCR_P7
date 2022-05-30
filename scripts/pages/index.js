import { RecipesFactory } from "../factories/RecipesFactory.js";
import { RecipeCard } from "../templates/RecipeCard.js";

async function getRecipes() {
    let data = await fetch('/data/recipes.json')
    .then(response => {
        return response.json()
    })
    .catch(error => {
        console.log(error)
    })
    
    let recipes = [];
    
    data.recipes.forEach((item) => {
        const recipe = new RecipesFactory(item, "json")
        recipes.push(recipe)
    })

    return recipes
}
    
async function displayRecipes(recipeItems) {
    let nodes = document.querySelector('.allCards');
    
    recipeItems.forEach((recipe) => {
        
        let template = new RecipeCard(recipe)
        const userCardDOM = template.createRecipe();
        nodes.append(userCardDOM);
    });
};

async function init() {
    const recipes = await getRecipes();
    displayRecipes(recipes);
};

init();