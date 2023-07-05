import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  user: null,
  allUsers: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload
    }
  }
})

export const { setUser, setAllUsers } = userSlice.actions;
export const selectUser = state => state.user.user;
export const selectAllUsers = state => state.user.allUsers

export default userSlice.reducer