import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { ShoppingEditComponent } from "./shopping-list/shopping-edit/shopping-edit.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";

/* 
Things to note:

Putting pathMatch: 'full' will override the default of prefix and says now only redirect
if the full path is empty. 

Any routes with ':', have to come later. If we did not swope the 'new' and ':id', path, it'll try 
to parse "new" as an ID because the route with the dynamic ID parameter comes before the route 
definition where we have "new" hard coded into the path. 
*/

const appRoutes: Routes = [
    { 
        path: '', 
        redirectTo: '/recipes', 
        pathMatch: 'full'
    },
    { 
        path: 'recipes', 
        component: RecipesComponent, 
        children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailComponent }, 
            { path: ':id/edit', component: RecipeEditComponent },
        ]   
    }, 
    { 
        path: 'shopping-list', 
        component: ShoppingListComponent, 
        children: [
            { path: ':id/edit', component: ShoppingEditComponent}
        ] 
    },
    // {
    //     path: 'servers',
    //     // canActivate: [ canActivateGuard ],
    //     canActivateChild: [ canActivateChildGuard ],
    //     component: ServersComponent,
    //     children: [{ 
    //         path: ':id', 
    //         component: ServerComponent, 
    //         resolve: { server: serverResolver } // notice for resolve, we use {key: value} not []
    //     },
    //     { 
    //         path: ':id/edit', 
    //         component: EditServerComponent, 
    //         canDeactivate: [ canDeactivateGuard ] 
    //     }]
    // },
    // // { path: 'not-found', component: PageNotFoundComponent },
    // { 
    //     path: 'not-found', 
    //     component: ErrorPageComponent,
    //     data: {message: 'Page not found!'}
    // },
    // { path: '**', redirectTo: '/not-found' }
]

// We need exports because we need to outsource all the above routes
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }