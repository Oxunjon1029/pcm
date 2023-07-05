import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  url: null,
}

const bucketUrlSlice = createSlice({
  name: 'bucket',
  initialState,
  reducers: {
    setUrl: (state, action) => {
      state.url = action.payload
    },
    
  }
})

export const { setUrl } = bucketUrlSlice.actions;
export const selectUrl = state => state.bucket.url
export default bucketUrlSlice.reducer