import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable() // because we are injecting shoppingListService into this service
export class RecipeService {

    private recipes: Recipe[] = [
        new Recipe(
            'Tasty Schnitzel', 
            'A super-tasty Schnitzel - just awesome!', 
            'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]),
        new Recipe(
            'Big Fat Burger', 
            'What else do you need to say', 
            'https://www.southernliving.com/thmb/l5DQAyFyQ38FLwYjRLm49nLW0K0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Banana_Pudding_022-2000-6a7f3ba402044e5488b429a7141097fa.jpg',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1)
            ])
    ];

    constructor(private slService: ShoppingListService) {}

    /* Since arrays and objects are reference types, if we change something on this array
    we will change it on the array in this service. Calling slice with no args will simply 
    return a new array which is an exact copy of the one in this service file so therefore
    we can't access the recipes array stored here from outside, we only get a copy. 
    
    Now with that we have to add our service to a place in our app to provide them so that 
    we can inject them. One area is our recipe component. */
    getRecipes() {
        return this.recipes.slice();
    }

    getRecipeById(id: number) {
        return this.recipes[id];
    }

    // This mtd allows duplicates which is not correct
    // addIngredientsToShoppingList(ingredients: Ingredient[]) {
    //     this.slService.addIngredients(ingredients);
    // }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        const existingIngredients = this.slService.getIngredients(); // Assuming this returns current ingredients in the shopping list
        const newIngredients = [];
    
        // Filter out ingredients that are already in the shopping list
        for (const ingredient of ingredients) {
            if (!this.isIngredientExists(ingredient, existingIngredients)) {
                newIngredients.push(ingredient);
            }
        }
    
        if (newIngredients.length > 0) {
            this.slService.addIngredients(newIngredients);
        }
    }
    
    // Helper function to check if an ingredient already exists in the shopping list
    private isIngredientExists(ingredient: Ingredient, existingIngredients: Ingredient[]): boolean {
        return existingIngredients.some(
            existingIngredient =>
                existingIngredient.name === ingredient.name && 
                existingIngredient.amount === ingredient.amount
        );
    }
}