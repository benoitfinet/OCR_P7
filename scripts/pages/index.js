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
    let ingredients = [];
    let appliance = [];
    let ustensils = [];
    
    data.recipes.forEach((item) => {
        const recipe = new RecipesFactory(item, "json")
        recipes.push(recipe)
        appliance.push(recipe.appliance)
        recipe.ingredients.forEach((item) => {
            ingredients.push(item.ingredient)
        })
        recipe.ustensils.forEach((test) => {
            ustensils.push(test)
        })
    })

    /**
     * Retourne les ingrédients sans les doublons
     */
    let filterIngredients = ingredients.filter(function(ele , pos){
        return ingredients.indexOf(ele) == pos;
    }) 

    let filterUstensils = ustensils.filter(function(ele , pos){
        return ustensils.indexOf(ele) == pos;
    })

    let filterAppliance = appliance.filter(function(ele , pos){
        return appliance.indexOf(ele) == pos;
    })
    console.log(filterAppliance)

    openIngredients.addEventListener("click", function() {
        let close = false
        const list = document.getElementById('ingredientsList')
        if(close = false) {
            openIngredients.style.transform = "rotate(180deg)"
            list.innerHTML = filterIngredients.join("</br>")
            close = true
            console.log(close)
        } else if (close = true) {
            openIngredients.style.transform = "rotate(180deg)"
            list.innerHTML = ""
            close = false
        }
    })

    openDevices.addEventListener("click", function() {
        let close = false
        const list = document.getElementById('deviceList')
        if(close === false) {
            openDevices.style.transform = "rotate(180deg)"
            list.innerHTML = filterUstensils.join("</br>")
            close = true
            console.log(close)
        } else if (close === true) {
            openDevices.style.transform = "rotate(180deg)"
            list.innerHTML = ""
            close = false
        }
    })

    let close = false
    openItems.addEventListener("click", function() {
        const list = document.getElementById('itemList')
        if(close === false) {
            openItems.style.transform = "rotate(180deg)"
            list.innerHTML = filterAppliance.join("</br>")
            close = true
            console.log(close)
        } else if (close === true) {
            openItems.style.transform = "rotate(180deg)"
            list.innerHTML = ""
            close = false
        }
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
        } else {
            displayNewRecipe(recipes);
        }
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