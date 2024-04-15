import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-recipes-list-item',
  standalone: true,
  imports: [],
  templateUrl: './recipes-list-item.component.html',
  styleUrl: './recipes-list-item.component.scss'
})
export class RecipesListItemComponent {

  @Input() recipe: any;
  @Output() recipeDeleted = new EventEmitter();

  deleting = signal<boolean>(false);

  constructor(
    private http: HttpClient,
  ) {}

  async deleteRecipe(recipeId: number) {
    this.deleting.set(true);
    await lastValueFrom(this.http.delete(`http://localhost:3000/recipes/${recipeId}`));
    this.deleting.set(false);
    this.recipeDeleted.emit();
  }
}
