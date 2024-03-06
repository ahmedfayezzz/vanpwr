import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import rootReducer from './reducer';

// Define middleware or any other configurations as needed

const persistConfig = {
  key: 'root', // key for the persisted state
  storage, // use localStorage for web
  whitelist: ['quotes', 'stripe'], // list of reducers to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  // Add your middleware or other configurations here
});

export const persistor = persistStore(store);

export default store;
