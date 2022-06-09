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

                let isValid = false
                recipe.ingredients.forEach((ingredient) => {
                    if(ingredient.ingredient.includes(inputValue)) {
                        isValid = true;
                    }
                })

                return isValid

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
    
    recipeItems.forEach((recipe) => {
        
        let template = new RecipeCard(recipe)
        const userCardDOM = template.createRecipe();
        nodes.append(userCardDOM);
    });
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