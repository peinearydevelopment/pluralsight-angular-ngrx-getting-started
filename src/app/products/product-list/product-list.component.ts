import { Component, OnInit, OnDestroy } from '@angular/core';

import { Product } from '../product';

import { Store, select } from '@ngrx/store';
import { State, getShowProductCode, getCurrentProduct, getProducts, getError } from '../state/product.reducer';
import { ToggleProductCode, SetCurrentProduct, InitializeCurrentProduct, LoadProduct } from '../state/product.actions';
import { takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';

  displayCode: boolean;

  products: Product[];
  products$: Observable<Product[]>;
  componentActive = true;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.store.pipe(select(getCurrentProduct)).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    this.errorMessage$ = this.store.pipe(select(getError));
    this.store.dispatch(new LoadProduct());
    this.products$ = this.store.pipe(select(getProducts));
    // this.store.pipe(
    //   select(getProducts),
    //   takeWhile(_ => this.componentActive)
    // ).subscribe((products: Product[]) => this.products = products);

    // TODO: unsubscribe
    this.store
        .pipe(select(getShowProductCode))
        .subscribe(showProductCode => this.displayCode = showProductCode);
  }

  ngOnDestroy() {
    this.componentActive = false;
  }
  checkChanged(value: boolean): void {
    this.store.dispatch(new ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new SetCurrentProduct(product));
  }

}
