// store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import userReducer from './userSlice'; // Adjust based on your slice file paths
import agentsReducer from './chatSlice'; // Adjust based on your slice file paths
import swarmReducer from './swarmSlice'; // Adjust based on your slice file paths

// Combine reducers
const rootReducer = combineReducers({
    user: userReducer,
    agents: agentsReducer,
    swarm: swarmReducer,
});

// Persist config
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
