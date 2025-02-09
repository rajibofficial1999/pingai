import {combineReducers, configureStore} from '@reduxjs/toolkit'
import authSlice from "@/lib/store/authSlice.ts";
// @ts-ignore
import storageSession from 'redux-persist/lib/storage/session'
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
    key: 'root',
    storage: storageSession,
}

const rootReducer = combineReducers({
    auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({serializableCheck: false})
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)