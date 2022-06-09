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

    for (let i = 0; i < data.recipes.length; i++) {
        const recipe = new RecipesFactory(data.recipes[i], "json")
        recipes.push(recipe)
    }
    
    inputSearch.addEventListener("keyup", function() {
        let inputValue = document.getElementById("inputSearch").value;
        if(inputValue.length >= 3) {
            let newRecipe = recipes.filter(recipe => {

                if (recipe.name.includes(inputValue)) {
                    return true;
                }

                if (recipe.description.includes(inputValue)) {
                    return true;
                }

                for (let i = 0; i < recipe.ingredients.length; i++) {
                    if(recipe.ingredients[i].ingredient.includes(inputValue)) {
                        return true;
                    }
                }

            });

            displayNewRecipe(newRecipe);
            console.log("OKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK");
            console.log(newRecipe);
            console.log(recipes);
        } else {
            displayNewRecipe(recipes);
            console.log("NON");
        }
    })
    console.log(recipes);
    return recipes
}
    
async function displayRecipes(recipeItems) {
    let nodes = document.querySelector('.allCards');
    
    for (let i = 0; i < recipeItems.length; i++) {
        let template = new RecipeCard(recipeItems[i])
        const userCardDOM = template.createRecipe();
        nodes.append(userCardDOM);
    }
};

function displayNewRecipe(recipeItems) {
    let recipes = document.querySelector(".allCards");
    recipes.innerHTML = "";

    displayRecipes(recipeItems);
}

async function init() {
    const recipes = await getRecipes();
    displayNewRecipe(recipes);
};

init();