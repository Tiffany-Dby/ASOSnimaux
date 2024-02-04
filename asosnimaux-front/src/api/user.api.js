import { setUser, startSignInLoading, setSignInError, startSignUpLoading, setSignUpError, startDialogLoading, setDialogError } from "../redux/reducers/user.reducer";
import { postRequest, putRequest } from "./api";
import { clearStorage, getFromStorage, setToStorage } from "../utils/storage.utils.js";

export const signInThunk = () => async (dispatch, getState) => {
  const { signInForm, signInLoading, user } = getState().userReducer;
  if (signInLoading) return;

  dispatch(startSignInLoading());

  const { result, error, status } = await postRequest("users/sign-in", signInForm);
  if (!result?.message || status >= 400 || !!error) return dispatch(setSignInError({ error: `Something went wrong : ${error}` }));

  const { token } = result.user;
  setToStorage("token", token);

  dispatch(setUser({ id: result.user.userID, username: result.user.username, email: result.user.email, role: result.user.userRole }));
  setToStorage("user", result.user)
}

export const signUpThunk = () => async (dispatch, getState) => {
  const { signUpForm, signUpLoading } = getState().userReducer;
  if (signUpLoading) return;

  dispatch(startSignUpLoading());

  const { result, error, status } = await postRequest("users", signUpForm);
  if (!result?.message || status >= 400 || !!error) return dispatch(setSignUpError({ error: `Something went wrong : ${error}` }));
}

// export const updateUserDetailsThunk_ = (inputName) => async (dispatch, getState) => {
//   const { dialogForms, dialogLoading, user } = getState().userReducer;
//   const token = getFromStorage("token");
//   if (dialogLoading) return;

//   dispatch(startDialogLoading());

//   const formatExpectedOnRequest = {
//     [inputName]: dialogForms[inputName]
//   }

//   const { result, error, status } = await putRequest(`users/${inputName}`, formatExpectedOnRequest, token);
//   if (!result?.message || status >= 400 || !!error) return dispatch(setDialogError({ error: `Something went wrong : ${error}` }));

//   setToStorage("user",)
// }

export const updateUsernameThunk = () => async (dispatch, getState) => {
  const { dialogForms, dialogLoading, user } = getState().userReducer;
  const currentUser = getFromStorage("user");
  if (dialogLoading) return;

  dispatch(startDialogLoading());

  const formatExpectedOnRequest = {
    username: dialogForms.username
  }

  const { result, error, status } = await putRequest(`users/username`, formatExpectedOnRequest, currentUser.token);
  if (!result?.message || status >= 400 || !!error) return dispatch(setDialogError({ error: `Something went wrong : ${error}` }));

  setToStorage("user", { ...currentUser, username: dialogForms.username });
  dispatch(setUser({ ...user, username: dialogForms.username }))
}

export const updatePasswordThunk = () => async (dispatch, getState) => {
  const { dialogForms, dialogLoading } = getState().userReducer;
  const currentUser = getFromStorage("user");
  if (dialogLoading) return;

  dispatch(startDialogLoading());

  const formatExpectedOnRequest = {
    oldPassword: dialogForms.oldPassword,
    newPassword: dialogForms.newPassword
  }

  const { result, error, status } = await putRequest(`users/password`, formatExpectedOnRequest, currentUser.token);
  if (!result?.message || status >= 400 || !!error) return dispatch(setDialogError({ error: `Something went wrong : ${error}` }));

  // clearStorage();
}