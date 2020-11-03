export interface IToastState {
  message: string;
  isVisible: boolean;
}

export interface IToastContext {
  toast: IToastState;
  hide: () => void;
  show: (args: any) => void;
}

export interface IUserState {
  user: firebase.User | null;
}

export interface IUserContext {
  user: IUserState;
}
