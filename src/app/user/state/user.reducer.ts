import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActionTypes } from './user.actions';

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
    case UserActionTypes.MaskUserName:
      return {
        ...state,
        maskUserName: action.payload
      };

    default:
      return state;
  }
}
