import {RecipesFactory} from "../factories/RecipesFactory.js";
import {RecipeCard} from "../templates/RecipeCard.js";

const tags = document.getElementById('tags');
const listIngredients = document.getElementById('ingredientsList');
const listDevices = document.getElementById('deviceList');
const listItems = document.getElementById('itemList');
const recipesDOM = document.querySelector('.allCards');

let listOfTagsIngredients = [];
let listOfTagsDevices = [];
let listOfTagsItems = [];

// let ingredients = [];
// let appliance = [];
// let ustensils = [];


/**
 *
 */
async function getRecipes() {

    // Récupère la liste des recettes
   return await fetch('/data/recipes.json')
        .then(response => {
            return response.json()
        })
        .then(response => {
            let results = []
            response.recipes.map(item => {
                let recipe = new RecipesFactory(item, 'json')
                results.push(recipe)

                // appliance.push(recipe.appliance)
                //
                // recipe.ingredients.forEach((item) => {
                //     ingredients.push(item.ingredient)
                // })
                //
                // recipe.ustensils.forEach((item2) => {
                //     ustensils.push(item2)
                // })
            })

            return results
        })
}

/**
 * EventListener sur la recherche par input et tags
 */

inputSearch.addEventListener("keyup", async function () {
    let recipes = await getRecipes()
    let sortedRecipes = sortRecipes(recipes)
    myTagsListInit(sortedRecipes)
    updateRecipesDisplay(sortedRecipes)
})

ingredientsList.addEventListener("click", async function () {
    let recipes = await getRecipes()
    let sortedRecipes = sortRecipes(recipes)
    myTagsListInit(sortedRecipes)
    updateRecipesDisplay(sortedRecipes)
})

deviceList.addEventListener("click", async function () {
    let recipes = await getRecipes()
    let sortedRecipes = sortRecipes(recipes)
    myTagsListInit(sortedRecipes)
    updateRecipesDisplay(sortedRecipes)
})

itemList.addEventListener("click", async function () {
    let recipes = await getRecipes()
    let sortedRecipes = sortRecipes(recipes)
    myTagsListInit(sortedRecipes)
    updateRecipesDisplay(sortedRecipes)
})

/*
 * Définitions des listes de tags
 */

function myTagsListInit(recipes){

    let ingredients = [];
    let appliance = [];
    let ustensils = [];

    recipes.map(recipe => {

        appliance.push(recipe.appliance)

        recipe.ingredients.forEach((item) => {
            ingredients.push(item.ingredient)
        })

        recipe.ustensils.forEach((item2) => {
            ustensils.push(item2)
        })
    })


    itemsSearch(inputIngredients, ingredients, setIngredientsTagsList)
    itemsSearch(inputDevices, ustensils, setDevicesTagsList)
    itemsSearch(inputItems, appliance, setApplianceTagsList)

    // Modification du style des tags
    tagStyle()
}

/**
 * Retirer les éléments en doubles et mise en place de la recherche par item
 */
function itemsSearch(id, array, setFunction) {

    let filteredArray = array.filter(function (ele, pos) {
        return array.indexOf(ele) == pos;
    })

    id.addEventListener("keyup", function () {
        if (`${id.value}`.length > 0) {
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
 * Selection et création des tags Ingrédients
 */
function setIngredientsTagsList(filter) {
    listIngredients.innerHTML = "";

    filter.forEach((item) => {
        let p = document.createElement("p")
        p.onclick = function () {
            let bal = document.createElement("p")
            bal.textContent = p.innerHTML
            bal.classList.add("ingredientTag");
            tags.append(bal)
            listOfTagsIngredients.push(p.innerHTML)
            let tag = createEventListener(bal, listOfTagsIngredients, 'listOfTagsIngredients')
            bal.append(tag)
        };
        p.textContent = item
        listIngredients.append(p)
    });
};

/**
 * Selection et création des tags Appareils
 */
function setDevicesTagsList(filter) {

    listDevices.innerHTML = "";

    filter.forEach((item) => {
        let p = document.createElement("p")
        p.onclick = function () {
            let bal = document.createElement("p")
            bal.textContent = p.innerHTML
            bal.classList.add("deviceTag");
            tags.append(bal)
            listOfTagsDevices.push(p.innerHTML)
            let tag = createEventListener(bal, listOfTagsDevices, 'listOfTagsDevices')
            bal.append(tag)
        };
        p.textContent = item
        listDevices.append(p)
    });
};

/**
 * Selection et création des tags Ustensiles
 */
function setApplianceTagsList(filter) {

    listItems.innerHTML = "";

    filter.forEach((item) => {
        let p = document.createElement("p")
        p.onclick = function () {
            let bal = document.createElement("p")
            bal.textContent = p.innerHTML
            bal.classList.add("applianceTag");
            tags.append(bal)
            listOfTagsItems.push(p.innerHTML)
            let tag = createEventListener(bal, listOfTagsItems, 'listOfTagsItems')
            bal.append(tag)
        };
        p.textContent = item
        listItems.append(p)
    });
};

/**
 * event pour l'ajout de la croix et effacer le tag (sans l'event pour reload les recettes)
 */
function createEventListener(tag, list, type) {
    let icon = document.createElement('i');
    icon.classList.add("fa-regular", "fa-circle-xmark", "fa-xl", "closeTag");
    icon.setAttribute('id', "tagNumber" + list.length)

    if (icon) {
        icon.addEventListener('click', async function () {
            tag.style.display = "none";

            switch(type){
                case 'listOfTagsIngredients':
                    listOfTagsIngredients = list.filter(test => test !== tag.textContent)
                    break;
                case 'listOfTagsDevices':
                    listOfTagsDevices = list.filter(test => test !== tag.textContent)
                    break;
                case 'listOfTagsItems':
                    listOfTagsItems = list.filter(test => test !== tag.textContent)
                    break;
            }

            const recipes = await getRecipes()
            let sortedRecipes = sortRecipes(recipes)
            updateRecipesDisplay(sortedRecipes)
        });
    }
    return icon
}

/**
 * Affichage et CSS des tags
 */
function tagStyle() {

    let closeIngredients = false
    openIngredients.addEventListener("click", function () {
        if (closeIngredients === false) {
            openIngredients.style.transform = "rotate(0deg)"
            closeIngredients = true
            listIngredients.classList.remove('ingredientsListClose')
            if(closeDevices === true) {
                closeDevices = false
                listDevices.classList.remove('deviceListOpen')
                listDevices.classList.add('deviceListClose')
                inputDevices.classList.remove('placeholderClick')
                inputDevices.placeholder = "Appareils"
                inputDevices.style.width = "120px"
            }
            if(closeItems === true) {
                closeItems = false
                listItems.classList.remove('itemListOpen')
                listItems.classList.add('itemListClose')
                inputItems.classList.remove('placeholderClick')
                inputItems.placeholder = "Ustensils"
                inputItems.style.width = "120px"
            }
            listIngredients.classList.add('ingredientsListOpen')
            inputIngredients.classList.add('placeholderClick')
            inputIngredients.placeholder = "Rechercher un ingrédient"
            inputIngredients.style.width = "300px"
        } else if (closeIngredients === true) {
            openIngredients.style.transform = "rotate(180deg)"
            closeIngredients = false
            listIngredients.classList.remove('ingredientsListOpen')
            listIngredients.classList.add('ingredientsListClose')
            inputIngredients.classList.remove('placeholderClick')
            inputIngredients.placeholder = "Ingrédients"
            inputIngredients.style.width = "120px"
        }
    })

    let closeDevices = false
    openDevices.addEventListener("click", function () {
        if (closeDevices === false) {
            openDevices.style.transform = "rotate(0deg)"
            closeDevices = true
            listDevices.classList.remove('deviceListClose')
            if(closeIngredients === true) {
                closeIngredients = false
                listIngredients.classList.remove('ingredientsListOpen')
                listIngredients.classList.add('ingredientsListClose')
                inputIngredients.classList.remove('placeholderClick')
                inputIngredients.placeholder = "Ingrédients"
                inputIngredients.style.width = "120px"
            }
            if(closeItems === true) {
                closeItems = false
                listItems.classList.remove('itemListOpen')
                listItems.classList.add('itemListClose')
                inputItems.classList.remove('placeholderClick')
                inputItems.placeholder = "Ustensils"
                inputItems.style.width = "120px"
            }
            listDevices.classList.add('deviceListOpen')
            inputDevices.classList.add('placeholderClick')
            inputDevices.placeholder = "Rechercher un appareil"
            inputDevices.style.width = "300px"
        } else if (closeDevices === true) {
            openDevices.style.transform = "rotate(180deg)"
            closeDevices = false
            listDevices.classList.remove('deviceListOpen')
            listDevices.classList.add('deviceListClose')
            inputDevices.classList.remove('placeholderClick')
            inputDevices.placeholder = "Appareils"
            inputDevices.style.width = "120px"
        }
    })

    let closeItems = false
    openItems.addEventListener("click", function () {

        if (closeItems === false) {
            openItems.style.transform = "rotate(0deg)"
            closeItems = true
            listItems.classList.remove('itemListClose')
            inputItems.classList.add('placeholderClick')
            inputItems.placeholder = "Rechercher un ustensil"
            inputItems.style.width = "300px"
            if(closeIngredients === true) {
                closeIngredients = false
                listIngredients.classList.remove('ingredientsListOpen')
                listIngredients.classList.add('ingredientsListClose')
                inputIngredients.classList.remove('placeholderClick')
                inputIngredients.placeholder = "Ingrédients"
                inputIngredients.style.width = "120px"
            }
            if(closeDevices === true) {
                closeDevices = false
                listDevices.classList.remove('deviceListOpen')
                listDevices.classList.add('deviceListClose')
                inputDevices.classList.remove('placeholderClick')
                inputDevices.placeholder = "Appareils"
                inputDevices.style.width = "120px"
            }
        } else if (closeItems === true) {
            openItems.style.transform = "rotate(180deg)"
            listItems.classList.remove('itemListOpen')
            listItems.classList.add('itemListClose')
            closeItems = false
            inputItems.classList.remove('placeholderClick')
            inputItems.placeholder = "Ustensils"
            inputItems.style.width = "120px"
        }
    })
}


/*
 * Fonctions de tries des recettes
 */


/**
 * Tri complet, avec input et tags
 */
function sortRecipes(newRecipes) {
    let newRecipe = []

    newRecipe = sortRecipesByKeywords(newRecipes)
    newRecipe = sortRecipesByIngredients(newRecipe)
    newRecipe = sortRecipesByAppliance(newRecipe)
    newRecipe = sortRecipesByUstensils(newRecipe)

    return newRecipe
}

/**
 * Tri avec input, sur nom, description et ingrédients
 */
function sortRecipesByKeywords(recipes) {

    let inputValue = document.getElementById("inputSearch").value;

    if (inputValue.length >= 3) {
        return recipes.filter(recipe => {

            if (recipe.name.includes(inputValue)) {
                return true;
            }

            if (recipe.description.includes(inputValue)) {
                return true;
            }

            let isValid = false
            recipe.ingredients.forEach((ingredient) => {
                if (ingredient.ingredient.includes(inputValue)) {
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
 * Tri par tag ingrédient
 */
function sortRecipesByIngredients(newRecipes) {

    if (listOfTagsIngredients.length <= 0) {
        return newRecipes
    }

    return newRecipes.filter(recipe => {
        let isValid = false
        listOfTagsIngredients.forEach(tag => {
            recipe.ingredients.forEach(ingredient => {
                if (ingredient.ingredient.includes(tag)) {
                    isValid = true;
                }
            })
        })
        return isValid
    })
}

/**
 * Tri par tag Appareils
 */
function sortRecipesByAppliance(newRecipes) {

    if (listOfTagsItems.length <= 0) {
        return newRecipes
    }

    return newRecipes.filter(recipe => {
        let isValid = false
        listOfTagsItems.forEach(tag => {
            if (recipe.appliance.includes(tag)) {
                isValid = true;
            }
        })
        return isValid
    })
}

/**
 * Tri par tag Ustensiles
 */
function sortRecipesByUstensils(newRecipes) {

    if (listOfTagsDevices.length <= 0) {
        return newRecipes
    }

    return newRecipes.filter(recipe => {
        let isValid = false
        listOfTagsDevices.forEach(tag => {
            if (recipe.ustensils.includes(tag)) {
                isValid = true;
            }
        })
        return isValid
    })
}


/*
 * Fonction d'affichages des recettes dans le DOM
 */


/**
 * Mise à jour de l'affichage des recettes
 */
function updateRecipesDisplay(recipeItems) {
    resetRecipesDisplay()
    displayRecipes(recipeItems);
}

/**
 * Réinitialisation de l'affichage des recettes
 */
function resetRecipesDisplay() {
    recipesDOM.innerHTML = "";
}

/**
 * Affichage du template de la carte de chaque recette
 */
function displayRecipes(recipes) {
    recipes.forEach((recipe) => {
        let template = new RecipeCard(recipe)
        const userCardDOM = template.createRecipe();
        recipesDOM.append(userCardDOM);
    });
}


/*
 * Intialisations
 */


/**
 * Initialisation du script
 */
async function init() {
    const recipes = await getRecipes();
    myTagsListInit(recipes)
    updateRecipesDisplay(recipes);
}

init();