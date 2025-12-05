import {Component, inject, input, OnInit, signal} from '@angular/core';
import {Recipe} from '../models/recipe';
import {Ingredient} from '../models/ingredient';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {ProductService} from '../../products/services/product';
import {AsyncPipe} from '@angular/common';
import {map, Observable, startWith} from 'rxjs';
import {Product} from '../../products/models/product';
import {MatSelectModule} from '@angular/material/select';
import {Unit} from '../../../shared/models/unit';
import {UnitPipe} from '../../../shared/pipes/unit';
import {MatButtonModule} from '@angular/material/button';
import {AlertService} from '../../../shared/services/alert';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatIconModule} from '@angular/material/icon';
import {IngredientTextPipe} from '../pipes/ingredient-text';
import {ProductHelpers} from '../../products/helpers/product-helpers';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-recipe-form-ingredients',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatSelectModule,
    UnitPipe,
    MatButtonModule,
    CdkDropList,
    CdkDrag,
    MatIconModule,
    IngredientTextPipe,
  ],
  template: `
    <div class="grid grid-cols-2 gap-4">
      <div class="flex flex-col gap-4">
        <mat-form-field class="compact-field">
          <mat-label>Product</mat-label>
          <input #productAuto type="text" matInput [formControl]="productFormControl" [matAutocomplete]="auto">
          <mat-autocomplete #auto="matAutocomplete"
                            [displayWith]="autocompleteDisplay"
                            [autoSelectActiveOption]="true"
          >
            @for (option of filteredProducts | async; track option) {
              <mat-option [value]="option">{{ option.name }}</mat-option>
            }
          </mat-autocomplete>
        </mat-form-field>

        <mat-form-field class="compact-field">
          <mat-label>Quantity Required</mat-label>
          <input matInput type="number" placeholder="Quantity" [formControl]="quantityRequiredFormControl">
        </mat-form-field>

        <mat-form-field class="compact-field">
          <mat-label>Unit</mat-label>
          <mat-select [formControl]="unitFormControl">
            @for (unit of unitTypes; track unit) {
              <mat-option [value]="unit">{{ unit | unit }}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <button matButton="filled" (click)="addIngredient()">Add Ingredient</button>

        <div class="mt-20">
          <p>Can't find the right product?</p>
          <button matButton (click)="showProductDialog()">Add Product</button>
        </div>
      </div>

      <div cdkDropList class="drag-list" (cdkDropListDropped)="dropIngredient($event)">
        @for (ingredient of ingredients(); track ingredient) {
          <div class="drag-box" cdkDrag [cdkDragStartDelay]="200">
            {{ ingredient | ingredientText }}
            <button matIconButton (click)="removeIngredient(ingredient)">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        }
      </div>
    </div>
  `,
  styles: `

  `,
})
export class RecipeFormIngredients implements OnInit {
  readonly dialog = inject(MatDialog);
  readonly alertService = inject(AlertService);
  readonly unitTypes = Object.values(Unit).filter(v => typeof v === 'number') as Unit[];

  recipe = input.required<Recipe | undefined>();
  productService = inject(ProductService);

  ingredients = signal<Partial<Ingredient>[]>([]);

  unitFormControl = new FormControl(Unit.grams);
  quantityRequiredFormControl = new FormControl(0);
  productFormControl = new FormControl<string | Product>('');
  filteredProducts: Observable<Product[]>;

  constructor() {
    this.filteredProducts = this.productFormControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        // If the control currently holds a Product object → skip filtering
        if (typeof value === 'object' && value !== null) {
          return [];
        }

        const text = value?.trim() ?? '';
        return text === ''
          ? []
          : this.productService
            .products()
            .filter(p => p.name.toLowerCase().includes(text.toLowerCase()));
      })
    );
  }

  ngOnInit() {
    this.ingredients.set(this.recipe()?.ingredients ?? []);
  }

  addIngredient() {{
    const value = this.productFormControl.value;
    const isProduct = value && typeof value === 'object' && 'id' in value;

    if (!isProduct) {
      this.alertService.error("Please select from the product dropdown");
      return;
    }

    const ingredient: Partial<Ingredient> = {
      recipeId: this.recipe()?.id ?? undefined,
      product: value,
      unit: this.unitFormControl.value as Unit,
      quantityRequired: this.quantityRequiredFormControl.value as number,
      sequenceNumber: this.ingredients().length
    };
    this.ingredients.update(current => [...current, ingredient]);

    this.productFormControl.setValue('');
    this.quantityRequiredFormControl.setValue(0);
  }}

  removeIngredient(ingredient: Partial<Ingredient>) {
    this.ingredients.update(current =>
      current.filter(e => e !== ingredient)
    );
  }

  dropIngredient(event: CdkDragDrop<Ingredient[]>) {
    moveItemInArray(this.ingredients(), event.previousIndex, event.currentIndex);
  }

  autocompleteDisplay(product: Product): string {
    return product && product.name ? product.name : '';
  }

  showProductDialog() {
    ProductHelpers.openProductDialog(this.dialog, this.productService);
  }

  getCurrentValues(): Partial<Ingredient>[] {
    let sequenceNumber = 0;
    this.ingredients().map((ingredient: Partial<Ingredient>) => {
      ingredient.sequenceNumber = sequenceNumber++;
    });

    return this.ingredients();
  }
}
