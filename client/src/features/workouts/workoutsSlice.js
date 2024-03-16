import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  workouts: null,
  popup: false,
}

const workoutsSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    setWorkouts: (state, action) => {
      state.workouts = action.payload
    },
    createWorkout: (state, action) => {
      state.workouts.push(action.payload)
    },
    togglePopup: (state) => {
      state.popup = !state.popup
    },
    deleteWorkout: (state, action) => {
      state.workouts = state.workouts.filter(
        (workout) => workout._id !== action.payload
      )
    },
    updateWorkout: (state, action) => {
      const index = state.workouts.findIndex(
        (workout) => workout._id === action.payload._id
      )
      state.workouts[index] = action.payload
    },
  },
})

export default workoutsSlice.reducer

export const {
  createWorkout,
  deleteWorkout,
  setWorkouts,
  togglePopup,
  updateWorkout,
} = workoutsSlice.actions
