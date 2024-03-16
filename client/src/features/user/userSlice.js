import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isSignedIn: false,

}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
      state.isSignedIn = true
    },
    logout: (state) => {
      state.user = null
      state.isSignedIn = false
    },
  },
})

export default userSlice.reducer

export const { login, logout } = userSlice.actions 