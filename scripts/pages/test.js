import { RecipesFactory } from "../factories/RecipesFactory.js";
import { RecipeCard } from "../templates/RecipeCard.js";

const tags = document.getElementById('tags');
const listIngredients = document.getElementById('ingredientsList');
const listDevices = document.getElementById('deviceList');
const listItems = document.getElementById('itemList');
let listOfTagsIngredients = [];
let listOfTagsDevices = [];
let listOfTagsItems = [];
let ingredients = [];
let appliance = [];
let ustensils = [];
let recipes = [];

async function getRecipes() {
    let data = await fetch('/data/recipes.json')
    .then(response => {
        return response.json()
    })
    .catch(error => {
        
        console.log(error)
    })

    displayRecipesFromScratch(data.recipes, recipes)
    itemsSearch(inputIngredients, ingredients, setIngredients)
    itemsSearch(inputDevices, ustensils, setDevices)
    itemsSearch(inputItems, appliance, setAppliance)
    tagStyle()
    
    return recipes
}

/**
 * EventListener sur la recherche par input et tags
 */

inputSearch.addEventListener("keyup", function() {
    displaySortedRecipes(recipes)
})

ingredientsList.addEventListener("click", function() {
    displaySortedRecipes(recipes)
})

deviceList.addEventListener("click", function() {
    displaySortedRecipes(recipes)
})

itemList.addEventListener("click", function() {
    displaySortedRecipes(recipes)
})

/**
 * Affichage et CSS des tags
 */

function tagStyle() {

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
}

/**
 * Retirer les éléments en doubles et mise en place de la recherche par item
 */

function itemsSearch(id, array, setFunction) {

    let filteredArray = array.filter(function(ele , pos){
        return array.indexOf(ele) == pos;
    })

    id.addEventListener("keyup", function() {
        if(`${id.value}`.length > 0) {
            let newList = filteredArray.filter(item => {
                if (item.includes(`${id.value}`)) {
                    return true;
                }
            });
            setFunction(newList)
        } else {
            setFunction(filteredArray)
        }
    })

    setFunction(filteredArray)
}

/**
 * event pour l'ajout de la croix et effacer le tag (sans l'event pour reload les recettes)
 */

function createEventListener(tag, list) {
    let icon = document.createElement('i');
    icon.classList.add("fa-regular", "fa-circle-xmark","fa-xl", "closeTag");
    icon.setAttribute('id', "tagNumber" + list.length)
    if (icon) {
        icon.addEventListener('click', function() {
            tag.style.display = "none";
            list = list.filter(test => test !== tag.textContent)
            console.log(list)
            listOfTagsIngredients = list
            console.log(listOfTagsIngredients)
            const recipes = getRecipes()
            displaySortedRecipes(recipes)
        });
    }
    return icon
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
            let tag = createEventListener(bal, listOfTagsIngredients)
            bal.append(tag)
        };
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
            let tag = createEventListener(bal, listOfTagsDevices)
            bal.append(tag)
        };
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
            let tag = createEventListener(bal, listOfTagsItems)
            bal.append(tag)
        };
        p.textContent = item
        listItems.append(p)
    });
};

/**
 * Tri par tag ingrédient
 */

 function sortIngredients(newRecipes) {

    if(listOfTagsIngredients.length <= 0) {
        return newRecipes
    }
    console.log(newRecipes)
    let newRecipe = newRecipes.filter(recipe => {
        let isValid = false
        listOfTagsIngredients.forEach(tag => {
            recipe.ingredients.forEach(ingredient => {
                if(ingredient.ingredient.includes(tag)) {
                    isValid = true;
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

    if(listOfTagsDevices.length <= 0) {
        return newRecipes
    }
    let newRecipe = newRecipes.filter(recipe => {
        let isValid = false
        listOfTagsDevices.forEach(tag => {
            if(recipe.ustensils.includes(tag)) {
                isValid = true;
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

    if(listOfTagsItems.length <= 0) {
        return newRecipes
    }
    let newRecipe = newRecipes.filter(recipe => {
        let isValid = false
        listOfTagsItems.forEach(tag => {
            if(recipe.appliance.includes(tag)) {
                isValid = true;
            }
        })
        return isValid
    })
    return newRecipe
}

/**
 * Tri avec input, sur nom, description et ingrédients
 */

 function sortInput(recipes) {

    let inputValue = document.getElementById("inputSearch").value;

    if(inputValue.length >= 3) {
        return recipes.filter(recipe => {
            
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
    } else {
        return recipes
    }
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
 * Nouvel affichage après tri
 */

function displaySortedRecipes(recipes) {
    let newRecipe = sortAll(recipes)
    displayNewRecipe(newRecipe)
}



/**
 * Push dans le tableau des recettes
 */

function displayRecipesFromScratch (data, array) {
    data.forEach((item) => {
        const recipe = new RecipesFactory(item, "json")
        array.push(recipe)
        appliance.push(recipe.appliance)
        recipe.ingredients.forEach((item) => {
            ingredients.push(item.ingredient)
        })
        recipe.ustensils.forEach((item2) => {
            ustensils.push(item2)
        })
    })
}

/**
 * Affichage de chaque recette dans une carte
 */
async function displayRecipes(recipes) {
    let nodes = document.querySelector('.allCards');
    
    recipes.forEach((recipe) => {
        
        let template = new RecipeCard(recipe)
        const userCardDOM = template.createRecipe();
        nodes.append(userCardDOM);
    });
};

/**
 * Reset de la liste des recettes
 * Affichage de la nouvelle liste de recettes
 */
 function displayNewRecipe(recipeItems) {
    let recipes = document.querySelector(".allCards");
    //reset de la liste des cartes
    recipes.innerHTML = "";
    //affiche les nouvelles cartes
    displayRecipes(recipeItems);
}

/**
 * Initialisation du script
 */
async function init() {
    const recipes = await getRecipes();
    displayNewRecipe(recipes);
};

init();