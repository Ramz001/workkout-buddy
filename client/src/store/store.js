import { configureStore, combineReducers} from '@reduxjs/toolkit'
import WorkoutsReducer from '../features/workouts/workoutsSlice'
import UserReducer from '../features/user/userSlice'

const rootReducer = combineReducers({
  user: UserReducer,
  workouts: WorkoutsReducer,
})


const store = configureStore({
  reducer: rootReducer,
})

export default store
