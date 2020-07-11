import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
} 

const initialState = {};

export type AppState = ReturnType<typeof rootReducer>

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk)))

export const persistor = persistStore(store);

export default {store, persistor};