import {inject, Injectable, signal} from '@angular/core';
import {HomeHubApi} from '../../../shared/services/home-hub-api';
import {Recipe} from '../models/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly api = inject(HomeHubApi);

  recipes = signal<Recipe[]>([]);
  showLoading = signal<boolean>(false);

  constructor() {
    this.getAll();
  }

  getAll() {
    this.showLoading.set(true);
    this.api.get<Recipe[]>('recipe').subscribe(recipes => {
      const sortedRecipes = recipes.map(r => ({
        ...r,
        ingredients: [...r.ingredients].sort((a, b) => a.sequenceNumber - b.sequenceNumber),
        instructions: [...r.instructions].sort((a, b) => a.sequenceNumber - b.sequenceNumber)
      }));

      this.recipes.set(sortedRecipes);
      this.showLoading.set(false);
    });
  }

  create(data: Partial<Recipe>) {
    this.showLoading.set(true);
    this.api.post<Recipe>('recipe', data).subscribe(r => {
      console.log(r);
      this.recipes.update(list => [r, ...list]);
      this.showLoading.set(false);
    });
  }

  update(data: Partial<Recipe>) {
    this.showLoading.set(true);
    this.api.put<Recipe>(`recipe`, data).subscribe(r => {
      this.recipes.update(list =>
        list.map(x => (x.id === data.id ? r : x))
      );
      this.showLoading.set(false);
    });
  }

  delete(data: Recipe) {
    this.showLoading.set(true);
    this.api.delete(`recipe?id=${data.id}`).subscribe(() => {
      this.recipes.update(list => list.filter(x => x.id !== data.id));
      this.showLoading.set(false);
    });
  }
}
