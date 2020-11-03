import storage from 'redux-persist/lib/storage';
import { createStore, applyMiddleware } from 'redux';
import { persistReducer } from 'redux-persist'
import appReducer from './index';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: storage,
}

const persistedReducer = persistReducer(persistConfig, appReducer)

export const configureStore = (preloadedState) => {
  return createStore(
    persistedReducer,
    preloadedState,
    applyMiddleware(thunk)
  )
}
