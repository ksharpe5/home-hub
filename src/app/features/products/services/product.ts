import {inject, Injectable, signal} from '@angular/core';
import {HomeHubApi} from '../../../shared/services/home-hub-api';
import {Product} from '../models/product';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly api = inject(HomeHubApi);

  products = signal<Product[]>([]);
  showLoading = signal<boolean>(false);

  constructor() {
    this.getAll();
  }

  getAll() {
    this.showLoading.set(true);
    this.api.get<Product[]>('product').subscribe(products => {
      this.products.set(products);
      this.showLoading.set(false);
    });
  }

  getByBarcode(barcode: string): Observable<Product> {
    return this.api.get<Product>(`product/barcode?barcode=${barcode}`);
  }

  create(product: Partial<Product>) {
    this.showLoading.set(true);
    this.api.post<Product>('product', product).subscribe(product => {
      this.products.update(list => [product, ...list]);
      this.showLoading.set(false);
    });
  }

  update(product: Partial<Product>) {
    this.showLoading.set(true);
    this.api.put<Product>('product', product).subscribe(p => {
      this.products.update(list => list.map(x => (x.id == product.id ? p : x)));
      this.showLoading.set(false);
    });
  }

  delete(product: Partial<Product>) {
    this.showLoading.set(true);
    this.api.delete(`product?id=${product.id}`).subscribe(() => {
      this.products.update(list => list.filter(x => x.id !== product.id));
      this.showLoading.set(false);
    });
  }
}
