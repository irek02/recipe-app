import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss'
})
export class CreateRecipeComponent {
  recipeName = signal('');
  ingredients = signal('');
  instructions = signal('');

  constructor(private http: HttpClient) {}

  createRecipe() {
    const newRecipe = {
      name: this.recipeName(),
      ingredients: this.ingredients().split(',').map(ingredient => ingredient.trim()),
      instructions: this.instructions()
    };

    this.http.post('http://localhost:3000/recipes', newRecipe).subscribe(() => {
      this.recipeName.set('');
      this.ingredients.set('');
      this.instructions.set('');
      // Optionally, handle response and errors appropriately
    });
  }
}
