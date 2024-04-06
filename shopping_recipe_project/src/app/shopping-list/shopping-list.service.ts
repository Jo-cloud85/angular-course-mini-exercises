import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {

    ingredientsChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];
    
    getIngredients() {
        /* To get a copy of array using .slice() so that we cannot access
        the original array stored in this service */
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        /* While there is technically nothing wrong with looping through, we are emmiting a lot 
        of events unnecessarily. */
        // for(let ingredient of ingredients) {
        //     this.addIngredient(ingredient);
        // }

        // Using push & spread operator to add ingredients to the ingredients array
        this.ingredients.push(...ingredients);
        // And then pass a copy of it using slice()
        this.ingredientsChanged.emit(this.ingredients);
    }
}