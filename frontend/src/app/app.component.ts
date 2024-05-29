import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { RecipeItemComponent } from './components/recipe-item/recipe-item.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, HttpClientModule, RecipeItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  recipes: any[] = [];
  loading: boolean = true;
  reloading: boolean = false;
  submitLoading: boolean = false;
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
        this.reloading = false;
      },
      (error) => {
        console.error('Error fetching recipes:', error);
        this.loading = false;
        this.reloading = false;
      }
    );
  }

  deletedRecipe() {
    this.reloading = true;
    this.fetchRecipes();
  }

  addRecipe() {

    const recipe = {
      id: uuidv4(),
      name: this.newRecipe.name,
      description: this.newRecipe.description,
    };

    this.submitLoading = true;
    this.http.post('http://localhost:3000/api/recipes', recipe).subscribe(
      () => {
        console.log('Recipe added successfully');
        this.newRecipe = { name: '', description: '' };
        this.submitLoading = false;
        this.reloading = true;
        this.fetchRecipes();
      },
      (error) => {
        this.submitLoading = false;
        console.error('Error adding recipe:', error);
      }
    );
  }


}
