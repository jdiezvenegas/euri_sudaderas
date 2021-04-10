import { createContext, useContext } from 'react';
import { useReducer } from 'react';

export const StateContext = createContext();
export const DispatchContext = createContext();

const store = {
  cart: 0
}

const reducer = (store, action) => {
  switch(action.type){
    case 'addToCart' : {
      store.cart++;
      return store;
    }  
    case 'removeFromCart' : {
      store.cart = store.cart--;
      return store;
    }
    case 'emptyCart' : {
      store.cart = 0;
      return store;
    }
  }
}

export function AppWrapper({ children }) {
 const [state, dispatch] = useReducer(reducer, store)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
