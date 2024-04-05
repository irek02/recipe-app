import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) {}

  getRecipes() {
    // return an observable with extra loading, error and data properties.
    this.http.get<any[]>('http://localhost:3000/recipes').subscribe(data => {});
  }
}
