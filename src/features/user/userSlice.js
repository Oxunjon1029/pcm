import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  user: null,
  tag: null,
  text: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setTag: (state, action) => {
      state.tag = action.payload
    },
    setText: (state, action) => {
      state.text = action.payload
    }
  }
})

export const { setUser, setTag, setText } = userSlice.actions;
export const selectUser = state => state.user.user;
export const selectTag = state => state.user.tag;
export const selectText = state=> state.user.text 
export default userSlice.reducer