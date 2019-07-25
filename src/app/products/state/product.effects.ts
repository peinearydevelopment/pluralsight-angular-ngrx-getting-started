import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import { ProductActionTypes, LoadProduct, LoadSuccess, LoadFail, UpdateProduct, UpdateProductSuccess, UpdateProductFail } from './product.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Product } from '../product';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions,
    private productService: ProductService) {}

    @Effect()
    loadProducts$ = this.actions$
                        .pipe(
                          ofType(ProductActionTypes.LoadProduct),
                          mergeMap((action: LoadProduct) => this.productService
                                                                .getProducts()
                                                                .pipe(
                                                                  map((products: Product[]) => new LoadSuccess(products)),
                                                                  catchError(err => of(new LoadFail(err)))
                                                                )
                        ));

    @Effect()
    updateProduct$ = this.actions$
                        .pipe(
                          ofType(ProductActionTypes.UpdateProduct),
                          map((action: UpdateProduct) => action.payload),
                          mergeMap((product: Product) => this.productService
                                                                .updateProduct(product)
                                                                .pipe(
                                                                  map((updateProduct: Product) => new UpdateProductSuccess(updateProduct)),
                                                                  catchError(err => of(new UpdateProductFail(err)))
                                                                )
                        ));
}
