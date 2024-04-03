import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A Test Recipe 1', 'This is a test recipe.', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505'),
    new Recipe('A Test Recipe 2', 'This is another test recipe.', 'https://www.southernliving.com/thmb/l5DQAyFyQ38FLwYjRLm49nLW0K0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Banana_Pudding_022-2000-6a7f3ba402044e5488b429a7141097fa.jpg')
  ];

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
    console.log(">>>>> "+ recipe);
  }
}
