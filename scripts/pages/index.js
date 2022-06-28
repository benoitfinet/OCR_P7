import { RecipesFactory } from "../factories/RecipesFactory.js";
import { RecipeCard } from "../templates/RecipeCard.js";

const tags = document.getElementById('tags');
const listIngredients = document.getElementById('ingredientsList');
const listDevices = document.getElementById('deviceList');
const listItems = document.getElementById('itemList');

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

    let filterIngredients = ingredients.filter(function(ele , pos){
        return ingredients.indexOf(ele) == pos;
    })
    
    setIngredients(filterIngredients)

    inputIngredients.addEventListener("keyup", function() {
        let inputValue = document.getElementById("inputIngredients").value;
        if(inputValue.length > 0) {
            let newIngredientsList = filterIngredients.filter(ingredient => {
                if (ingredient.includes(inputValue)) {
                    return true;
                }
            });
            setIngredients(newIngredientsList)
        } else {
            setIngredients(filterIngredients)
        }
    })

    let filterDevices = ustensils.filter(function(ele , pos){
        return ustensils.indexOf(ele) == pos;
    })

    setDevices(filterDevices)

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

    let filterAppliance = appliance.filter(function(ele , pos){
        return appliance.indexOf(ele) == pos;
    })

    setAppliance(filterAppliance)

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

    let closeIngredients = false
    openIngredients.addEventListener("click", function() {
        if(closeIngredients === false) {
            openIngredients.style.transform = "rotate(180deg)"
            closeIngredients = true
            listIngredients.style.display = "block"
        } else if (closeIngredients === true) {
            openIngredients.style.transform = "rotate(0deg)"
            closeIngredients = false
            listIngredients.style.display = "none"
        }
    })

    let closeDevices = false
    openDevices.addEventListener("click", function() {
        if(closeDevices === false) {
            openDevices.style.transform = "rotate(180deg)"
            listDevices.style.display = "block"
            closeDevices = true
        } else if (closeDevices === true) {
            openDevices.style.transform = "rotate(0deg)"
            listDevices.style.display = "none"
            closeDevices = false
        }
    })

    let closeItems = false
    openItems.addEventListener("click", function() {
        
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

                if (recipe.description.includes(tags.value) || recipe.name.includes(tags.value)) {
                    return true;
                }

                let isValid = false
                recipe.ingredients.forEach((ingredient) => {
                    if(ingredient.ingredient.includes(inputValue)) {
                        isValid = true;
                    }
                    if(ingredient.ingredient.includes(tags.value)) {
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

function setIngredients(filter) {

    listIngredients.innerHTML = "";
    filter.forEach((item) => {
        let p = document.createElement("p")
        p.onclick = function() {
            let bal = document.createElement("p")
            bal.textContent = p.innerHTML
            bal.classList.add("ingredientTag");
            tags.append(bal) };
        p.textContent = item
        listIngredients.append(p)
    });
};

function setDevices(filter) {

    listDevices.innerHTML = "";
    filter.forEach((item) => {
        let p = document.createElement("p")
        p.onclick = function() {
            let bal = document.createElement("p")
            bal.textContent = p.innerHTML
            bal.classList.add("deviceTag");
            tags.append(bal) };
        p.textContent = item
        listDevices.append(p)
    });
};

function setAppliance(filter) {

    listItems.innerHTML = "";
    filter.forEach((item) => {
        let p = document.createElement("p")
        p.onclick = function() {
            let bal = document.createElement("p")
            bal.textContent = p.innerHTML
            bal.classList.add("applianceTag");
            tags.append(bal) };
        p.textContent = item
        listItems.append(p)
    });
};

async function init() {
    const recipes = await getRecipes();
    displayNewRecipe(recipes);
};

init();