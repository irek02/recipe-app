import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RecipesListComponent,
    CreateRecipeComponent,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  showCreateRecipe = false;

  @ViewChild(RecipesListComponent)recipeList!: RecipesListComponent;

  recipeCreatedHandler() {
    this.showCreateRecipe = false;
    this.recipeList.fetchRecipes();
  }
}
