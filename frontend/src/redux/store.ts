// store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import userReducer from '@redux/userSlice'; // Adjust based on your slice file paths
import conversatonReducer from '@redux/chatSlice'; // Adjust based on your slice file paths
import swarmReducer from '@redux/swarmSlice'; // Adjust based on your slice file paths
import tokenReducer from '@redux/tokenSlice'; // Adjust based on your slice file paths
import swarmHistoryReducer from '@redux/swarmHistorySlice';
import swarmStateReducer from '@redux/swarmStateSlice';

// Combine reducers
const rootReducer = combineReducers({
    user: userReducer,
    chat: conversatonReducer,
    swarm: swarmReducer,
    token: tokenReducer,
    swarmHistory: swarmHistoryReducer,
    swarmState: swarmStateReducer,
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
