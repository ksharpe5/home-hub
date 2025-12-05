import {Component, computed, inject, signal} from '@angular/core';
import {ProductService} from '../services/product';
import {ProductSearch} from '../components/product-search';
import {DataTable} from '../../../shared/components/data-table';
import {ColumnDefinition, ColumnDefinitionMap, ColumnDefinitionType} from '../../../shared/models/column-definition';
import {UnitPipe} from '../../../shared/pipes/unit';
import {Product} from '../models/product';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmPrompt} from '../../../shared/components/confirm-prompt';
import {ProductHelpers} from '../helpers/product-helpers';

@Component({
  selector: 'app-products',
  imports: [
    ProductSearch,
    DataTable
  ],
  template: `
    <div>
      <app-product-search (addClicked)="openProductDialog()" (searchChanged)="currentSearchFilter.set($event)"/>

      <app-data-table
        [showLoading]="productService.showLoading()"
        [tableData]="filteredProducts()"
        [columnDefinition]="columnDefinition"
        (rowClicked)="openProductDialog($event)"
      />
    </div>
  `,
  styles: ``,
})
export default class Products {
  readonly dialog = inject(MatDialog);
  readonly productService = inject(ProductService);

  readonly columnDefinition: ColumnDefinitionMap = {
    name: new ColumnDefinition('Name'),
    defaultQuantity: new ColumnDefinition('Default Quantity'),
    unit: new ColumnDefinition('Unit', { type: ColumnDefinitionType.pipe, pipe: UnitPipe }),
    category: new ColumnDefinition('Category'),
    barcode: new ColumnDefinition('Barcode Number'),
    delete: new ColumnDefinition('', {
      type: ColumnDefinitionType.iconButton,
      icon: 'delete',
      buttonCallback: this.deleteProduct.bind(this)
    }),
  };

  currentSearchFilter = signal<string>('');
  filteredProducts = computed(() => {
    const products = this.productService.products();

    const words = this.currentSearchFilter()
      .toLowerCase()
      .split(' ')
      .filter(w => w.length > 0);

    return products.filter(product => {
      return words.every(word => product.name.toLowerCase().includes(word))
    });
  });

  deleteProduct(product: Product) {
    const dialog = this.dialog.open(ConfirmPrompt, {
      data: 'Deleting this product will remove it from all associated recipes and stock items'
    });
    dialog.afterClosed().subscribe((result: boolean) => {
      if (!result) return;

      this.productService.delete(product);
    });
  }

  openProductDialog(product: Product | undefined = undefined) {
    ProductHelpers.openProductDialog(this.dialog, this.productService, product);
  }
}
