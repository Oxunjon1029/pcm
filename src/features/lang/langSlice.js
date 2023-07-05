import { getCookie, setCookie } from '../../utils/cookies';
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: !!JSON.parse(getCookie("lang")),
};

export const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    toggleLang: (state) => {
      state.lang = !state.lang;
    },
  },
});


export const asyncToggleLang = () => (dispatch) => {
  const isEnglish = !!JSON.parse(getCookie("lang"));
  setCookie("lang", !isEnglish);
  dispatch(toggleLang());
};


export const { toggleLang } = langSlice.actions;

export default langSlice.reducer;