import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss'
})
export class RecipesListComponent implements OnInit {
  recipes = signal<any[]>([]);
  loading = signal<boolean>(true);

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    this.loading.set(true);
    this.recipes.set(await this.fetchRecipes());
    this.loading.set(false);
  }

  fetchRecipes() {
    return lastValueFrom(this.http.get<any[]>('http://localhost:3000/recipes'));
  }

  async deleteRecipe(recipeId: number) {
    await lastValueFrom(this.http.delete(`http://localhost:3000/recipes/${recipeId}`));
    this.recipes.set(await this.fetchRecipes());
  }
}
