import { configureStore, combineReducers } from '@reduxjs/toolkit'
import WorkoutsReducer from '../features/workouts/workoutsSlice'
import UserReducer from '../features/user/userSlice'
import TempReducer from '../features/temp/tempSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: "user",
}

const rootReducer = combineReducers({
  user: UserReducer,
  workouts: WorkoutsReducer,
  temp: TempReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)
export default store
