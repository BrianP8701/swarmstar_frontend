// store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import userReducer from '@redux/userSlice';
import conversatonReducer from '@redux/chatSlice';
import swarmReducer from '@redux/swarmSlice';
import tokenReducer from '@redux/tokenSlice';
import treeReducer from '@redux/treeSlice';

// Combine reducers
const rootReducer = combineReducers({
    user: userReducer,
    chat: conversatonReducer,
    swarm: swarmReducer,
    token: tokenReducer,
    tree: treeReducer,
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
