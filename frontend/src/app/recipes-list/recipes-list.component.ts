import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss'
})
export class RecipesListComponent implements OnInit {
  recipes = signal<any[]>([]);

  @Output() recipeDeleted = new EventEmitter();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchRecipes();
  }

  fetchRecipes() {
    this.http.get<any[]>('http://localhost:3000/recipes').subscribe(data => {
      this.recipes.set(data);
    });
  }

  deleteRecipe(recipeId: number) {
    this.http.delete(`http://localhost:3000/recipes/${recipeId}`).subscribe(() => {
      this.recipeDeleted.emit();
    });
  }
}
