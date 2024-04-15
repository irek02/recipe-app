import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { RecipesListItemComponent } from '../recipes-list-item/recipes-list-item.component';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [
    RecipesListItemComponent,
  ],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss'
})
export class RecipesListComponent implements OnInit {
  recipes = signal<any[]>([]);
  loading = signal<boolean>(true);

  constructor(
    private http: HttpClient
  ) {}

  async ngOnInit() {
    this.loading.set(true);
    this.recipes.set(await this.getRecipes());
    this.loading.set(false);
  }

  getRecipes() {
    return lastValueFrom(this.http.get<any[]>('http://localhost:3000/recipes'));
  }

  async deleteRecipeEventHandler() {
    this.recipes.set(await this.getRecipes());
  }

  async createRecipeEventHandler() {
    this.recipes.set(await this.getRecipes());
  }

}
