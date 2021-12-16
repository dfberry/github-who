import * as React from "react"
import { compose, createStore, applyMiddleware, Store } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from 'redux-devtools-extension';

import { isProduction } from '../Utilties/log';

import { initialState, reducer as RootReducer, UserState, UserAction, DispatchType} from "./index";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const debugReduxStore = !isProduction();

const middleWare = debugReduxStore
    ? composeEnhancers(applyMiddleware(thunk))
    : compose(applyMiddleware(thunk))

export const store: Store<UserState, UserAction> & {
  dispatch: DispatchType
} = createStore(RootReducer, initialState, middleWare)
