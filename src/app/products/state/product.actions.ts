import { Action } from '@ngrx/store';
import { Product } from '../product';

export enum ProductActionTypes {
  ToggleProductCode = '[Product] Toggle Product Code',
  SetCurrentProduct = '[Product] Set Current Product',
  ClearCurrentProduct = '[Product] Clear Current Product',
  InitializeCurrentProduct = '[Product] Initialize Current Product',
  LoadProduct = '[Product] Load',
  LoadSuccess = '[Product] Load Success',
  LoadFail = '[Product] Load Failure',
  UpdateProduct = '[Product] Update Product',
  UpdateProductSuccess = '[Product] Update Product Success',
  UpdateProductFail = '[Product] Update Product Failure'
}

export class ToggleProductCode implements Action {
  readonly type = ProductActionTypes.ToggleProductCode;

  constructor(public payload: boolean) {}
}

export class SetCurrentProduct implements Action {
  readonly type = ProductActionTypes.SetCurrentProduct;

  constructor(public payload: Product) {}
}

export class ClearCurrentProduct implements Action {
  readonly type = ProductActionTypes.ClearCurrentProduct;
}

export class InitializeCurrentProduct implements Action {
  readonly type = ProductActionTypes.InitializeCurrentProduct;
}

export class LoadProduct implements Action {
  readonly type = ProductActionTypes.LoadProduct;
}

export class LoadSuccess implements Action {
  readonly type = ProductActionTypes.LoadSuccess;

  constructor(public payload: Product[]) {}
}

export class LoadFail implements Action {
  readonly type = ProductActionTypes.LoadFail;

  constructor(public payload: string) {}
}

export class UpdateProduct implements Action {
  readonly type = ProductActionTypes.UpdateProduct;

  constructor(public payload: Product) {}
}

export class UpdateProductFail implements Action {
  readonly type = ProductActionTypes.UpdateProductFail;

  constructor(public payload: string) {}
}

export class UpdateProductSuccess implements Action {
  readonly type = ProductActionTypes.UpdateProductSuccess;

  constructor(public payload: Product) {}
}

export type ProductActions = ToggleProductCode
| SetCurrentProduct
| ClearCurrentProduct
| InitializeCurrentProduct
| LoadProduct
| LoadSuccess
| LoadFail
| UpdateProduct
| UpdateProductFail
| UpdateProductSuccess;
