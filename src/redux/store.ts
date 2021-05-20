import { actionLog } from './middlewares/actionLog'
import { productDetailSlice } from './productDetail/slice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { userSlice } from './user/slice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
}

const rootReducer = combineReducers({
  productDetail: productDetailSlice.reducer,
  user: userSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => [...getDefaultMiddleware(), actionLog],
  devTools: true,
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export { store, persistor }
