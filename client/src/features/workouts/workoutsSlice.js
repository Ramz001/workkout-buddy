import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  workouts: null,
  isLoading: false,
  error: null,
  popup: false,
}

export const fetchWorkouts = createAsyncThunk(
  'workouts/fetchWorkouts',
  async (userToken) => {
    return await fetch('https://workout-buddy-self.vercel.app/api/workouts', {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then((res) => res.json())
      .then((data) => data)
  }
)

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkouts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchWorkouts.fulfilled, (state, action) => {
        state.isLoading = false
        state.workouts = action.payload
      })
      .addCase(fetchWorkouts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error || null
      })
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
