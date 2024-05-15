import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  // providers: [ShoppingListService] //Not here, as I want recipes component to access too
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];

  private igChangeSub: Subscription;

  /* Injecting ShoppingListService from appModule */
  constructor(private slService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.igChangeSub = this.slService.ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
      })
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
}
