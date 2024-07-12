import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from '../slices/authSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const authPersitConfig = {
    key: "auth",
    storage,
};

const persistedAuthReducer = persistReducer(authPersitConfig, authSlice);

const rootReducer = combineReducers({
    auth: persistedAuthReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export const persistor = persistStore(store);