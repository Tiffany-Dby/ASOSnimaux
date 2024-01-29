import { createSlice } from "@reduxjs/toolkit";

const USER_STATE = {
  signInForm: {
    login: "",
    password: ""
  },
  signInLoading: false,
  signInError: null,
}

const userSlice = createSlice({
  name: "user",
  initialState: USER_STATE,
  reducers: {
    setUser: (state, action) => {
      const { login } = action.payload;
      return {
        ...state,
        signInLoading: false,
        user: {
          ...state.user,
          login
        }
      }
    },
    updateSignInForm: (state, action) => {
      const { input, value } = action.payload;
      return {
        ...state,
        signInForm: {
          ...state.signInForm,
          [input]: value
        }
      }
    },
    startSignInLoading: (state, action) => {
      return {
        ...state,
        signInLoading: true
      }
    },
    stopSignInLoading: (state, action) => {
      return {
        ...state,
        signInLoading: true
      }
    },
    setSignInError: (state, action) => {
      return {
        ...state,
        signInError: action.payload.error,
        signInLoading: false,
      }
    }
  }
});

export const { setUser, updateSignInForm, startSignInLoading, stopSignInLoading, setSignInError } = userSlice.actions;
export default userSlice.reducer;