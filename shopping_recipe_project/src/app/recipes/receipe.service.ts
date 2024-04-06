import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe 1', 'This is a test recipe.', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505'),
        new Recipe('A Test Recipe 2', 'This is another test recipe.', 'https://www.southernliving.com/thmb/l5DQAyFyQ38FLwYjRLm49nLW0K0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Banana_Pudding_022-2000-6a7f3ba402044e5488b429a7141097fa.jpg')
    ];

    /* Since arrays and objects are reference types, if we change something on this array
    we will change it on the array in this service. Calling slice with no args will simply 
    return a new array which is an exact copy of the one in this service file so therefore
    we can't access the recipes array stored here from outside, we only get a copy. 
    
    Now with that we have to add our service to a place in our app to provide them so that 
    we can inject them. One area is our recipe component. */
    getRecipes() {
        return this.recipes;
    }
}