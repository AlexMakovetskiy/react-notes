import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { 
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

import NoteListSlice from './features/noteList/NoteListSlice';
import TagListSlice from './features/tagList/TagListSlice';

const rootReducer = combineReducers({
    NoteListSlice,
    TagListSlice,
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
export { store };