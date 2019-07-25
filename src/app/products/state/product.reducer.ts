import { Product } from '../product';

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number;
  products: Product[];
  error: string;
}

// this extends the root state, since this is a lazy loaded feature, the ProductState can't be importe in the app state
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProductActionTypes } from './product.actions';

export interface State extends fromRoot.State {
  products: ProductState;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ''
};

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      };
    } else {
      return currentProductId ? state.products.find(product => product.id === currentProductId) : null;
    }
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  state => state.error
);

export function reducer(state = initialState, action: ProductActions): ProductState {
  switch (action.type) {
    case ProductActionTypes.ToggleProductCode:
    return {
      ...state,
      showProductCode: action.payload
    };

    case ProductActionTypes.ClearCurrentProduct:
    return {
      ...state,
      currentProductId: null
    };

    case ProductActionTypes.InitializeCurrentProduct:
    return {
      ...state,
      currentProductId: 0
    };

    case ProductActionTypes.SetCurrentProduct:
    return {
      ...state,
      currentProductId: action.payload.id
    };

    case ProductActionTypes.LoadSuccess:
    return {
      ...state,
      products: action.payload,
      error: ''
    };

    case ProductActionTypes.LoadFail:
    return {
      ...state,
      products: [],
      error: action.payload
    };

    case ProductActionTypes.UpdateProductSuccess:
      const products = state.products.map(product => product.id === action.payload.id ? action.payload : product);
      return {
        ...state,
        products: products,
        currentProductId: action.payload.id,
        error: ''
      };

    case ProductActionTypes.UpdateProductFail:
      return {
        ...state,
        error: action.payload
      };

    default:
    return state;
  }
}
