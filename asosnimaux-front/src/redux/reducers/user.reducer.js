import { createSlice } from "@reduxjs/toolkit";

const USER_STATE = {
  user: {
    id: "",
    username: "",
    email: "",
    role: ""
  },
  isAuth: false,
  isTokenChecked: false,
  signInForm: {
    login: "",
    password: ""
  },
  signInLoading: false,
  signInError: null,
  signUpForm: {
    username: "",
    email: "",
    password: ""
  },
  signUpLoading: false,
  signUpError: null,
  dialogForms: {
    username: "",
    email: "",
    oldPassword: "",
    newPassword: ""
  },
  dialogLoading: false,
  dialogError: null,
  getUserLoading: false,
  getUserError: null
}

const userSlice = createSlice({
  name: "user",
  initialState: USER_STATE,
  reducers: {
    setUser: (state, action) => {
      const { id, email, username, role } = action.payload;
      return {
        ...state,
        signUpLoading: false,
        signInLoading: false,
        signInError: null,
        dialogLoading: false,
        getUserLoading: false,
        user: {
          ...state.user,
          id,
          username,
          email,
          role
        },
        isAuth: true
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
    resetSignInForm: (state, action) => {
      return {
        ...state,
        signInForm: {
          login: "",
          password: ""
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
        signInLoading: false
      }
    },
    setSignInError: (state, action) => {
      return {
        ...state,
        signInError: action.payload.error,
        signInLoading: false,
      }
    },
    updateSignUpForm: (state, action) => {
      const { input, value } = action.payload;
      return {
        ...state,
        signUpForm: {
          ...state.signUpForm,
          [input]: value
        }
      }
    },
    startSignUpLoading: (state, action) => {
      return { ...state, signUpLoading: true }
    },
    stopSignUpLoading: (state, action) => {
      return { ...state, signUpLoading: false }
    },
    setSignUpError: (state, action) => {
      return {
        ...state,
        signUpError: action.payload.error,
        signUpLoading: false
      }
    },
    setisAuth: (state, action) => {
      return {
        ...state,
        isAuth: action.payload
      }
    },
    updateDialogForm: (state, action) => {
      const { input, value } = action.payload;
      return {
        ...state,
        dialogForms: {
          ...state.dialogForms,
          [input]: value
        }
      }
    },
    resetDialogForm: (state, action) => {
      return {
        ...state,
        dialogForms: {
          username: "",
          email: "",
          password: ""
        }
      }
    },
    startDialogLoading: (state, action) => {
      return { ...state, dialogLoading: true }
    },
    stopDialogLoading: (state, action) => {
      return { ...state, dialogLoading: false }
    },
    setDialogError: (state, action) => {
      return {
        ...state,
        dialogError: action.payload.error,
        dialogLoading: false
      }
    },
    startGetUserLoading: (state, action) => {
      return { ...state, getUserLoading: true }
    },
    stopGetUserLoading: (state, action) => {
      return { ...state, getUserLoading: false }
    },
    setGetUserError: (state, action) => {
      return {
        ...state,
        getUserError: action.payload.error,
        getUserLoading: false
      }
    },
    setTokenCheck: (state, action) => {
      return {
        ...state,
        isTokenChecked: true
      }
    }
  }
});

export const { setUser, updateSignInForm, resetSignInForm, startSignInLoading, stopSignInLoading, setSignInError, updateSignUpForm, startSignUpLoading, stopSignUpLoading, setSignUpError, setisAuth, updateDialogForm, resetDialogForm, startDialogLoading, stopDialogLoading, setDialogError, startGetUserLoading, stopGetUserLoading, setGetUserError, setTokenCheck } = userSlice.actions;
export default userSlice.reducer;