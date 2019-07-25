import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface UserState {
  maskUserName: boolean;
}

const defaultState: UserState = {
  maskUserName: true
};

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserNameState = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);

export function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'TOGGLE_USERNAME_MASK':
      return {
        ...state,
        maskUserName: action.payload
      };

    default:
      return state;
  }
}
