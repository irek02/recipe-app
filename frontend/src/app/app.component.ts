import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  recipes: any[] = [];
  loading: boolean = true;
  newRecipe: any = { name: '', description: '' };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchRecipes();
  }

  fetchRecipes() {
    this.http.get<any[]>('http://localhost:3000/api/recipes').subscribe(
      (recipes) => {
        this.recipes = recipes;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching recipes:', error);
        this.loading = false;
      }
    );
  }

  addRecipe() {
    this.http.post('http://localhost:3000/api/recipes', this.newRecipe).subscribe(
      () => {
        console.log('Recipe added successfully');
        this.newRecipe = { name: '', description: '' };
        this.fetchRecipes();
      },
      (error) => {
        console.error('Error adding recipe:', error);
      }
    );
  }

  deleteRecipe(id: string) {
    this.http.delete(`http://localhost:3000/api/recipes/${id}`).subscribe(
      () => {
        console.log('Recipe deleted successfully');
        this.fetchRecipes();
      },
      (error) => {
        console.error('Error deleting recipe:', error);
      }
    );
  }
}
