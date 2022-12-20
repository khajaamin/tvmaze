import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import { applyMiddleware, createStore } from 'redux'
import { reducer } from '../reducer/reducer';
const persistConfig = {
    storage,
    key: 'root',
}
const persistedReducer = persistReducer(persistConfig, reducer)
export const store = createStore(persistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)

