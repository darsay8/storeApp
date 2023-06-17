import {createContext, useReducer} from 'react';
import {LoginData, LoginResponse, User} from '../interfaces/appInterfaces';
import {AuthState, authReducer} from './authReducer';
import storeApi from '../api/storeApi';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: User | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signUp: () => void;
  signIn: (loginData: LoginData) => void;
  logOut: () => void;
  removeError: () => void;
};

const authInitialState: AuthState = {
  status: 'checking',
  token: null,
  user: null,
  errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  const signIn = async ({correo, password}: LoginData) => {
    console.log('dfvwqdf');
    try {
      const res = await storeApi.post<LoginResponse>('/auth/login', {
        correo,
        password,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = () => {};

  const logOut = () => {};
  const removeError = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        logOut,
        removeError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
