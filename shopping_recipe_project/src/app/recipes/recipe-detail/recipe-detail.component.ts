import { Component, OnInit} from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../receipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
	recipe: Recipe;
	id: number;

	constructor(private recipeService: RecipeService,
				private route: ActivatedRoute,
				private router: Router) {
	}

	ngOnInit() {
		/* But this will only work for the first time we load a detail component. Now keep in mind,
		the menu where we can click on one is on the left. So we will be able to choose a new recipe
		whilst we still see the details of another one. So we probably want to react to changes in our 
		recipe ID because that's absolutely possible in our app. So that is not the approach I want 
		to use. */
		// const id = +this.route.snapshot.params['id'];

		/* Actually, if you see the onEditRecipe() method below,  we don't need the ID here in this 
		case. Why did I get it then? Well, simply for demo purposes. */
		this.route.params
			.subscribe((params: Params) => {
				this.id = +params['id'];
				this.recipe = this.recipeService.getRecipeById(this.id);
			}
		)
	}

	onAddToShoppingList() {
		this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
	}

	onEditRecipe() {
		this.router.navigate(['edit'], { relativeTo: this.route });
	}
}