import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  workouts: null,
  isLoading: false,
  error: null,
}

export const fetchWorkouts = createAsyncThunk(
  'workouts/fetchWorkouts',
  async (userToken) => {
    return await fetch(process.env.REACT_APP_API_URL + '/api/workouts', {
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

export const { setWorkouts } = workoutsSlice.actions
