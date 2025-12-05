import {ProductService} from '../services/product';
import {Product} from '../models/product';
import {ProductDialog} from '../components/product-dialog';
import {MatDialog} from '@angular/material/dialog';


export class ProductHelpers {
  static openProductDialog(matDialog: MatDialog, productService: ProductService, product: Product | undefined = undefined) {
    const dialog = matDialog.open(ProductDialog, {data: product, autoFocus: false});
    dialog.afterClosed().subscribe(result => {
      if (result === undefined) return;

      if (product === undefined) {
        productService.create(result);
      } else {
        productService.update(result);
      }
    });
  }
}

