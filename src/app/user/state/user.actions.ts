export enum UserActionTypes {
  MaskUserName = '[User] Mask User Name'
}

export class MaskUserName {
  type = UserActionTypes.MaskUserName;

  constructor(public payload: boolean) {}
}

export type UserActions = MaskUserName;
