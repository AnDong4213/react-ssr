import React, { createContext, ReactElement, useContext } from 'react';
import { useLocalObservable, enableStaticRendering } from 'mobx-react-lite';
import createStore, { IStore } from './rootStore';

interface IProps {
  initialValue: Record<any, any>;
  children: ReactElement;
}

// enableStaticRendering(!process.browser);
enableStaticRendering(typeof window === 'undefined');

const StoreContext = createContext({});

export const StoreProvider = ({ initialValue, children }: IProps) => {
  const store: IStore = useLocalObservable(createStore(initialValue));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const store = useContext(StoreContext) as IStore; // IStore

  if (!store) {
    throw new Error('数据不存在');
  }
  return store;
};
