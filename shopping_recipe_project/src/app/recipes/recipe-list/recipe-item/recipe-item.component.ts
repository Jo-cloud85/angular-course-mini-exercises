import { Component, Input } from '@angular/core';

import { Recipe } from '../../recipe.model';

@Component({
	selector: 'app-recipe-item',
	templateUrl: './recipe-item.component.html',
	styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent{
	/* Initially, this is not defined i.e. no value assigned to it because I want to 
	get this recipe froom outside. So we use the @Input() which allows us to bind this
	component property from outside. */
	@Input() recipe: Recipe;
	@Input() index: number;
}
