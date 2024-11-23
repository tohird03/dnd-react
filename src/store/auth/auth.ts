import {makeAutoObservable, observable} from 'mobx';
import { IUser } from '../../types/Auth';
import { TokenType } from '../../types/TokenType';

class AuthStore {
  isAuth: boolean | null = false;
  token: string | null = null;
  thisuser: IUser | null = null;

  constructor() {
    makeAutoObservable(this, {
      isAuth: observable,
    });
  }

  setToken = (token: string) => {
    this.token = token;
  };

  setIsAuth = (isAuth: boolean) => {
    this.isAuth = isAuth;
  };

  setUser = (user: IUser) => {
    this.thisuser = user;
  }

  reset = () => {
    this.isAuth = null;
    this.token = null;
    this.thisuser = null;
    window.localStorage.clear();
  };
}

export const authStore = new AuthStore();
