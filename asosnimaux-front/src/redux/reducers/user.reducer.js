import { createSlice } from "@reduxjs/toolkit";

const USER_STATE = {
  user: {
    id: "",
    username: "",
    email: "",
    avatar: "",
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
  selectedUser: {
    id: "",
    username: "",
    role: ""
  },
  selectedUserLoading: false,
  selectedUserSuccess: null,
  selectedUserError: null,
  updatePasswordSuccess: null,
  updateUsernameSuccess: null,
  updatedAvatar: "",
  updatedAvatarLoading: false,
  updateAvatarSuccess: null,
  updatedAvatarError: null,
  dialogLoading: false,
  dialogError: null,
  getUserLoading: false,
  getUserError: null,
  deleteUserLoading: false,
  deleteUserSuccess: null,
  deleteUserError: null
}

const userSlice = createSlice({
  name: "user",
  initialState: USER_STATE,
  reducers: {
    setUser: (state, action) => {
      const { id, username, email, avatar, role, updateUsernameSuccess, updateAvatarSuccess } = action.payload;
      return {
        ...state,
        signUpLoading: false,
        signInLoading: false,
        signInError: null,
        dialogLoading: false,
        getUserLoading: false,
        deleteUserLoading: false,
        updatedAvatarLoading: false,
        user: {
          ...state.user,
          id,
          username,
          email,
          avatar,
          role
        },
        isAuth: true,
        updateUsernameSuccess,
        updateAvatarSuccess,
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
    setUpdatedAvatar: (state, action) => {
      return {
        ...state,
        updatedAvatar: action.payload,
      }
    },
    startUpdatedAvatarLoading: (state, action) => {
      return { ...state, updatedAvatarLoading: true }
    },
    stopUpdatedAvatarLoading: (state, action) => {
      return { ...state, updatedAvatarLoading: false }
    },
    setUpdatedAvatarError: (state, action) => {
      return {
        ...state,
        updatedAvatarError: action.payload.error,
        updatedAvatarLoading: false
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
    },
    setDeleteBySuperAdmin: (state, action) => {
      const { id } = action.payload;
      return {
        ...state,
        allUsers: state.allUsers.filter(user => user.id !== id),
        deleteLoading: false,
        deleteUserSuccess: "Utilisateur supprimé !"
      }
    },
    setUpdatePasswordSuccess: (state, action) => {
      return {
        ...state,
        updatePasswordSuccess: "Mot de passe mis à jour !"
      }
    },
    resetUserSuccess: (state, action) => {
      return {
        ...state,
        updateAvatarSuccess: null,
        updatePasswordSuccess: null,
        updateUsernameSuccess: null,
        selectedUserSuccess: null
      }
    },
    setSelectedUser: (state, action) => {
      const { id, username, role } = action.payload;
      return {
        ...state,
        selectedUser: {
          id,
          username,
          role
        }
      }
    },
    updateFormSelectedUser: (state, action) => {
      const { input, value } = action.payload;
      return {
        ...state,
        selectedUser: {
          ...state.selectedUser,
          [input]: value
        }
      }
    },
    setUpdateSelectedUser: (state, action) => {
      const { user } = action.payload;
      return {
        ...state,
        allUsers: state.allUsers.map((u) => u.id === user.id ? { ...user } : { ...u }),
        selectedUser: { ...user },
        selectedUserLoading: false,
        selectedUserSuccess: "Rôle mis à jour !"
      }
    },
    startSelectedUserLoading: (state, action) => {
      return {
        ...state,
        selectedUserLoading: true
      }
    },
    stopSelectedUserLoading: (state, action) => {
      return {
        ...state,
        selectedUserLoading: false
      }
    },
    setSelectedUserError: (state, action) => {
      return {
        ...state,
        selectedUserError: action.payload.error,
        selectedUserLoading: false
      }
    },
  }
});

export const { setUser, updateSignInForm, resetSignInForm, startSignInLoading, stopSignInLoading, setSignInError, updateSignUpForm, resetSignUpForm, startSignUpLoading, stopSignUpLoading, setSignUpError, setIsSignUpDone, setisAuth, updateDialogForm, resetDialogForm, setUpdatedAvatar, startUpdatedAvatarLoading, stopUpdatedAvatarLoading, setUpdatedAvatarError, startDialogLoading, stopDialogLoading, setDialogError, startGetUserLoading, stopGetUserLoading, setGetUserError, startDeleteUserLoading, stopDeleteUserLoading, setDeleteUserError, setAllUsers, startAllUsersLoading, stopAllUsersLoading, setAllUsersError, setDeleteBySuperAdmin, setUpdatePasswordSuccess, resetUserSuccess, setSelectedUser, updateFormSelectedUser, setUpdateSelectedUser, startSelectedUserLoading, stopSelectedUserLoading, setSelectedUserError } = userSlice.actions;
export default userSlice.reducer;