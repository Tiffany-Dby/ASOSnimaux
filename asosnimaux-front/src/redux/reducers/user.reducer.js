import { createSlice } from "@reduxjs/toolkit";

const USER_STATE = {
  user: {
    id: "",
    username: "",
    email: "",
    role: ""
  },
  isAuth: false,
  allUsers: [],
  allUsersLoading: false,
  allUsersError: null,
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
  isSignUpDone: false,
  dialogForms: {
    username: "",
    email: "",
    oldPassword: "",
    newPassword: ""
  },
  dialogLoading: false,
  dialogError: null,
  getUserLoading: false,
  getUserError: null,
  deleteUserLoading: false,
  deleteUserError: null
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
    setAllUsers: (state, action) => {
      return {
        ...state,
        allUsers: action.payload.allUsers,
        allUsersLoading: false
      }
    },
    startAllUsersLoading: (state, action) => {
      return {
        ...state,
        allUsersLoading: true
      }
    },
    stopAllUsersLoading: (state, action) => {
      return {
        ...state,
        allUsersLoading: false
      }
    },
    setAllUsersError: (state, action) => {
      return {
        ...state,
        allUsersError: action.payload.error,
        allUsersLoading: false
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
    resetSignUpForm: (state, action) => {
      return {
        ...state,
        signUpForm: {
          username: "",
          email: "",
          password: ""
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
    setIsSignUpDone: (state, action) => {
      return { ...state, isSignUpDone: true }
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
    startDeleteUserLoading: (state, action) => {
      return { ...state, deleteUserLoading: true }
    },
    stopDeleteUserLoading: (state, action) => {
      return { ...state, deleteUserLoading: false }
    },
    setDeleteUserError: (state, action) => {
      return {
        ...state,
        deleteUserError: action.payload.error,
        deleteUserLoading: false
      }
    }
  }
});

export const { setUser, updateSignInForm, resetSignInForm, startSignInLoading, stopSignInLoading, setSignInError, updateSignUpForm, resetSignUpForm, startSignUpLoading, stopSignUpLoading, setSignUpError, setIsSignUpDone, setisAuth, updateDialogForm, resetDialogForm, startDialogLoading, stopDialogLoading, setDialogError, startGetUserLoading, stopGetUserLoading, setGetUserError, startDeleteUserLoading, stopDeleteUserLoading, setDeleteUserError, setAllUsers, startAllUsersLoading, stopAllUsersLoading, setAllUsersError } = userSlice.actions;
export default userSlice.reducer;