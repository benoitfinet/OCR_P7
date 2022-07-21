export class RecipeCard {
    constructor(recipe) {
        this.recipe = recipe
    }

    createRecipe() {

        let wrapper = document.createElement('div');
        wrapper.classList.add("cardContent");
        
        
        let recipe = `
            <article class="card">
                    <div class="card__top"></div>
                    <div class="card__bottom--lineTitle">
                        <p class="card__bottom--title">${this.recipe.name}</p>
                        <div class="card__bottom--timeBlock">
                            <i class="fa-regular fa-clock card__bottom--icon"></i>
                            <p class="card__bottom--time">${this.recipe.time} min</p>
                        </div>
                    </div>
                    <div class="card__bottom--secondPart">
                    <div>`
                    this.recipe.ingredients.forEach((item) => {
                        recipe +=
                        `
                        <p class="card__bottom--ingredients">${item.ingredient}${item.quantity ? ` : ${item.quantity}` : ""}${item.unit ? ` ${item.unit}` : ""}</p>
                        `
                    })
                    recipe +=
                    ` 
                    </div>
                        <p class="card__bottom--description">${this.recipe.description}</p>
                    </div>
            </article>
        `
        wrapper.innerHTML = recipe

        return wrapper
    }
}

