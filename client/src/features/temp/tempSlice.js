import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  _id: null,
  email: null,
  token: null,
}

const tempSlice = createSlice({
  name: 'temp',
  initialState,
  reducers: {
    setTemp: (state, action) => {
      state.email = action.payload.email
      state.token = action.payload.token
      state._id = action.payload._id
    },
    clearTemp: (state) => {
      state.email = null
      state.token = null
      state._id = null
    },
  },
})

export default tempSlice.reducer
export const { setTemp, clearTemp } = tempSlice.actions