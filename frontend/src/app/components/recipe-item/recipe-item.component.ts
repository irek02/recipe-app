import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {

  deleteLoading: boolean = false;

  @Input() recipe: any = {};
  @Output() deleted = new EventEmitter();

  constructor(private http: HttpClient) {}

  deleteRecipe(id: string) {
    this.deleteLoading = true;
    this.http.delete(`http://localhost:3000/api/recipes/${id}`).subscribe(
      () => {
        console.log('Recipe deleted successfully');
        this.deleteLoading = false;
        this.deleted.emit();
      },
      (error) => {
        this.deleteLoading = false;
        console.error('Error deleting recipe:', error);
      }
    );
  }

}
