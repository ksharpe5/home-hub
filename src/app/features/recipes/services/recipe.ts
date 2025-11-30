import {inject, Injectable, signal} from '@angular/core';
import {HomeHubApi} from '../../../shared/services/home-hub-api';
import {Recipe} from '../models/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly api = inject(HomeHubApi);

  recipes = signal<Recipe[]>([]);

  getAll() {
    this.api.get<Recipe[]>('recipe').subscribe(r => this.recipes.set(r));
  }

  create(data: Partial<Recipe>) {
    this.api.post<Recipe>('recipe', data).subscribe(r => {
      this.recipes.update(list => [...list, r]);
    });
  }

  update(data: Partial<Recipe>) {
    this.api.put<Recipe>(`recipe`, data).subscribe(r => {
      this.recipes.update(list =>
        list.map(x => (x.id === data.id ? r : x))
      );
    });
  }

  delete(data: Recipe) {
    this.api.delete(`recipe?id=${data.id}`).subscribe(() => {
      this.recipes.update(list => list.filter(x => x.id !== data.id));
    });
  }
}
