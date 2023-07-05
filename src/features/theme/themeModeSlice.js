import { getCookie, setCookie } from '../../utils/cookies';
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: !!JSON.parse(getCookie("darkMode")),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});


export const asyncToggleTheme = () => (dispatch) => {
  const isDarkMode = !!JSON.parse(getCookie("darkMode"));
  setCookie("darkMode", !isDarkMode);
  dispatch(toggleTheme());
};


export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;