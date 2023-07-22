import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  user: null,
  text: null,
  uztag: null,
  entag: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setText: (state, action) => {
      state.text = action.payload
    },
    setUztag: (state, action) => {
      state.uztag = action.payload
    },
    setEntag: (state, action) => {
      state.entag = action.payload
    }
  }
})

export const { setUser,  setText, setEntag, setUztag } = userSlice.actions;
export const selectUser = state => state.user.user;
export const selectText = state => state.user.text
export const selectUztag = state => state.user.uztag
export const selectEntag = state => state.user.entag
export default userSlice.reducer