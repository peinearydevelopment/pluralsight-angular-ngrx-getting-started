import { Product } from '../product';

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

// this extends the root state, since this is a lazy loaded feature, the ProductState can't be importe in the app state
import * as fromRoot from '../../state/app.state';

export interface State extends fromRoot.State {
  products: ProductState;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
};

export function reducer(state = initialState, action): ProductState {
  switch (action.type) {
    case 'TOGGLE_PRODUCT_CODE':
      return {
        ...state,
        showProductCode: action.payload
      };

    default:
      return state;
  }
}
