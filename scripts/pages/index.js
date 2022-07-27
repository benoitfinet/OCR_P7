import { RecipesFactory } from "../factories/RecipesFactory.js";
import { RecipeCard } from "../templates/RecipeCard.js";

const tags = document.getElementById('tags');
const listIngredients = document.getElementById('ingredientsList');
const listDevices = document.getElementById('deviceList');
const listItems = document.getElementById('itemList');
let listOfTagsIngredients = [];
let listOfTagsDevices = [];
let listOfTagsItems = [];

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

/**
 * Push des différents éléments dans des tableaux uniques
 */
    
    data.recipes.forEach((item) => {
        const recipe = new RecipesFactory(item, "json")
        recipes.push(recipe)
        appliance.push(recipe.appliance)
        recipe.ingredients.forEach((item) => {
            ingredients.push(item.ingredient)
        })
        recipe.ustensils.forEach((item2) => {
            ustensils.push(item2)
        })
    })

/**
 * Ici on retire tout les éléments en double et on met en place la recherche par input
 */

    let filterIngredients = ingredients.filter(function(ele , pos){
        return ingredients.indexOf(ele) == pos;
    })

    inputIngredients.addEventListener("keyup", function() {
        let inputValue = document.getElementById("inputIngredients").value;
        if(inputValue.length > 0) {
            let newIngredientsList = filterIngredients.filter(ingredient => {
                if (ingredient.includes(inputValue)) {
                    return true;
                }
            });
            setIngredients(newIngredientsList)
            console.log(newIngredientsList)
        } else {
            setIngredients(filterIngredients)
        }
    })

    setIngredients(filterIngredients)

/**
 * Ici on retire tout les éléments en double et on met en place la recherche par input
 */

    let filterDevices = ustensils.filter(function(ele , pos){
        return ustensils.indexOf(ele) == pos;
    })

    inputDevices.addEventListener("keyup", function() {
        let inputValue = document.getElementById("inputDevices").value;
        if(inputValue.length > 0) {
            let newDevicesList = filterDevices.filter(device => {
                if (device.includes(inputValue)) {
                    return true;
                }
            });
            setDevices(newDevicesList)
        } else {
            setDevices(filterDevices)
        }
    })

    setDevices(filterDevices)

/**
 * Ici on retire tout les éléments en double et on met en place la recherche par input
 */

    let filterAppliance = appliance.filter(function(ele , pos){
        return appliance.indexOf(ele) == pos;
    })

    inputItems.addEventListener("keyup", function() {
        let inputValue = document.getElementById("inputItems").value;
        if(inputValue.length > 0) {
            let newApplianceList = filterAppliance.filter(device => {
                if (device.includes(inputValue)) {
                    return true;
                }
            });
            setAppliance(newApplianceList)
        } else {
            setAppliance(filterAppliance)
        }
    })

    setAppliance(filterAppliance)

/**
 * Affichage et css
 */

    let closeIngredients = false
    searchByIngredients.addEventListener("click", function() {
        if(closeIngredients === false) {
            openIngredients.style.transform = "rotate(180deg)"
            closeIngredients = true
            listIngredients.style.display = "block"
            searchByDevices.style.left = "calc(17% + 780px)"
            searchByItems.style.left = "calc(30% + 780px)"
        } else if (closeIngredients === true) {
            openIngredients.style.transform = "rotate(0deg)"
            closeIngredients = false
            listIngredients.style.display = "none"
            searchByDevices.style.left = "17%"
            searchByItems.style.left = "30%"
        }
    })

    let closeDevices = false
    searchByDevices.addEventListener("click", function() {
        if(closeDevices === false) {
            openDevices.style.transform = "rotate(180deg)"
            listDevices.style.display = "block"
            closeDevices = true
            searchByItems.style.left = "calc(30% + 430px)"
        } else if (closeDevices === true) {
            openDevices.style.transform = "rotate(0deg)"
            listDevices.style.display = "none"
            closeDevices = false
            searchByItems.style.left = "30%"
        }
    })

    let closeItems = false
    searchByItems.addEventListener("click", function() {
        
        if(closeItems === false) {
            openItems.style.transform = "rotate(180deg)"
            listItems.style.display = "block"
            closeItems = true
        } else if (closeItems === true) {
            openItems.style.transform = "rotate(0deg)"
            listItems.style.display = "none"
            closeItems = false
        }
    })

/**
 * Events au clic : nouvel affichage en fonction des choix
 */

    inputSearch.addEventListener("keyup", function() {
        let newRecipe = sortAll(recipes)
        displayNewRecipe(newRecipe)
    })
    
    ingredientsList.addEventListener("click", function() {
        let newRecipe = sortAll(recipes)
        displayNewRecipe(newRecipe)
    })

    deviceList.addEventListener("click", function() {
        let newRecipe = sortAll(recipes)
        displayNewRecipe(newRecipe)
    })

    itemList.addEventListener("click", function() {
        let newRecipe = sortAll(recipes)
        displayNewRecipe(newRecipe)
    })

    return recipes
}

/**
 * Tri complet, avec input et tags
 */

function sortAll(newRecipes) {
    let newRecipe = []
    newRecipe = sortInput(newRecipes)
    newRecipe = sortIngredients(newRecipe)
    newRecipe = sortAppliance(newRecipe)
    newRecipe = sortUstensils(newRecipe)
    return newRecipe
}

/**
 * Tri par input
 */

function sortInput(recipes) {

    let inputValue = document.getElementById("inputSearch").value;

    if(inputValue.length >= 3) {
        let newRecipes = recipes.filter(recipe => {

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
        return newRecipes
    } else {
        return recipes
    }
}

/**
 * Tri par tag ingrédient
 */

function sortIngredients(newRecipes) {
    let newRecipe = newRecipes.filter(recipe => {
        let isValid = true
        listOfTagsIngredients.forEach(tag => {
            recipe.ingredients.forEach(ingredient => {
                if(!ingredient.ingredient.includes(tag)) {
                    isValid = false;
                }
            })
        })
        return isValid
    })
    return newRecipe
}

/**
 * Tri par tag Ustensiles
 */

function sortUstensils(newRecipes) {
    let newRecipe = newRecipes.filter(recipe => {
        let isValid = true
        listOfTagsDevices.forEach(tag => {
            if(!recipe.ustensils.includes(tag)) {
                isValid = false;
            }
        })
        return isValid
    })
    return newRecipe
}

/**
 * Tri par tag Appareils
 */

function sortAppliance(newRecipes) {
    let newRecipe = newRecipes.filter(recipe => {
        let isValid = true
        listOfTagsItems.forEach(tag => {
            if(!recipe.appliance.includes(tag)) {
                isValid = false;
            }
        })
        return isValid
    })
    return newRecipe
}

/**
 * Affichage de toutes les recettes
 */
    
async function displayRecipes(recipeItems) {
    let nodes = document.querySelector('.allCards');
    
    recipeItems.forEach((recipe) => {
        
        let template = new RecipeCard(recipe)
        const userCardDOM = template.createRecipe();
        nodes.append(userCardDOM);
    });
};

/**
 * Affichage des recettes fitrées
 */

function displayNewRecipe(recipeItems) {
    let recipes = document.querySelector(".allCards");
    recipes.innerHTML = "";

    displayRecipes(recipeItems);
}

/**
 * Selection et création des tags Ingrédients
 */

function setIngredients(filter) {

    listIngredients.innerHTML = "";

    filter.forEach((item) => {
        let p = document.createElement("p")
        p.onclick = function() {
            let bal = document.createElement("p")
            bal.textContent = p.innerHTML
            bal.classList.add("ingredientTag");
            tags.append(bal)
            listOfTagsIngredients.push(p.innerHTML)
            let icon = document.createElement("i")
            icon.classList.add("fa-regular", "fa-circle-xmark","fa-xl", "closeTag");
            icon.onclick = function() {
                bal.style.display = "none"
            }
            bal.append(icon)};
        p.textContent = item
        listIngredients.append(p)
    });
};

/**
 * Selection et création des tags Appareils
 */

function setDevices(filter) {

    listDevices.innerHTML = "";

    filter.forEach((item) => {
        let p = document.createElement("p")
        p.onclick = function() {
            let bal = document.createElement("p")
            bal.textContent = p.innerHTML
            bal.classList.add("deviceTag");
            tags.append(bal)
            listOfTagsDevices.push(p.innerHTML)
            let icon = document.createElement("i")
            icon.classList.add("fa-regular", "fa-circle-xmark","fa-xl", "closeTag");
            icon.onclick = function() {
                bal.style.display = "none"
            }
            bal.append(icon)};
        p.textContent = item
        listDevices.append(p)
    });
};

/**
 * Selection et création des tags Ustensiles
 */

function setAppliance(filter) {

    listItems.innerHTML = "";

    filter.forEach((item) => {
        let p = document.createElement("p")
        p.onclick = function() {
            let bal = document.createElement("p")
            bal.textContent = p.innerHTML
            bal.classList.add("applianceTag");
            tags.append(bal)
            listOfTagsItems.push(p.innerHTML)
            let icon = document.createElement("i")
            icon.classList.add("fa-regular", "fa-circle-xmark","fa-xl", "closeTag");
            icon.onclick = function() {
                bal.style.display = "none"
            }
            bal.append(icon)};
        p.textContent = item
        listItems.append(p)
    });
};

async function init() {
    const recipes = await getRecipes();
    displayNewRecipe(recipes);
};

init();