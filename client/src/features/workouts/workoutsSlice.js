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
        (workout) => workout._id !== action.payload._id
      )
    },
    updateWorkout: (state, action) => {
      const { prev, current } = action.payload

      const currentWorkoutIndex = state.workouts.findIndex(
        (workout) => workout._id === prev._id
      )

      if (currentWorkoutIndex !== -1) {
        state.workouts[currentWorkoutIndex] = current
      }
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
