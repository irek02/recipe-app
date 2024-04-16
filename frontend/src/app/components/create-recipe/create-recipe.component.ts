import { Component, EventEmitter, Output } from '@angular/core';
import { signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss'
})
export class CreateRecipeComponent {

  @Output() submitted = new EventEmitter();

  recipeName = signal('');
  ingredients = signal('');
  instructions = signal('');
  creating = signal(false);

  constructor(private http: HttpClient) {}

  async createRecipe() {

    this.creating.set(true);

    const newRecipe = {
      name: this.recipeName(),
      ingredients: this.ingredients().split(',').map(ingredient => ingredient.trim()),
      instructions: this.instructions()
    };

    await lastValueFrom(this.http.post('http://localhost:3000/recipes', newRecipe));

    this.submitted.emit();
    this.recipeName.set('');
    this.ingredients.set('');
    this.instructions.set('');
    this.creating.set(false);

  }
}
