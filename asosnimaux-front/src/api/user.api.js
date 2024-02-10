import { setUser, startSignInLoading, setSignInError, startSignUpLoading, setSignUpError, startDialogLoading, setDialogError, startGetUserLoading, setGetUserError, resetSignInForm, resetDialogForm, stopSignUpLoading, resetSignUpForm, setIsSignUpDone, setDeleteUserError, startDeleteUserLoading, stopDeleteUserLoading } from "../redux/reducers/user.reducer";
import { deleteRequest, getRequest, postRequest, putRequest } from "./api";
import { getFromStorage, setToStorage } from "../utils/storage.utils.js";
import { signOut } from "../utils/user.utils.js";

export const signInThunk = () => async (dispatch, getState) => {
  const { signInForm, signInLoading } = getState().userReducer;
  if (signInLoading) return;

  dispatch(startSignInLoading());

  const { result, error, status } = await postRequest("users/sign-in", signInForm);
  if (!result?.message || status >= 400 || !!error) return dispatch(setSignInError({ error: `Something went wrong : ${error}` }));

  const { token } = result.user;
  setToStorage("token", token);

  dispatch(setUser({ id: result.user.userID, username: result.user.username, email: result.user.email, role: result.user.userRole }));
  dispatch(resetSignInForm());
}

export const signUpThunk = () => async (dispatch, getState) => {
  const { signUpForm, signUpLoading } = getState().userReducer;
  if (signUpLoading) return;

  dispatch(startSignUpLoading());

  const { result, error, status } = await postRequest("users", signUpForm);
  if (!result?.message || status >= 400 || !!error) return dispatch(setSignUpError({ error: `Something went wrong : ${error}` }));

  dispatch(stopSignUpLoading());
  dispatch(resetSignUpForm());
  dispatch(setIsSignUpDone());
}

export const updateUsernameThunk = () => async (dispatch, getState) => {
  const { dialogForms, dialogLoading, user } = getState().userReducer;
  const token = getFromStorage("token");
  if (dialogLoading) return;

  dispatch(startDialogLoading());

  const formatExpectedOnRequest = {
    username: dialogForms.username
  }

  const { result, error, status } = await putRequest(`users/username`, formatExpectedOnRequest, token);
  if (!result?.message || status >= 400 || !!error) return dispatch(setDialogError({ error: `Something went wrong : ${error}` }));

  dispatch(setUser({ ...user, username: dialogForms.username }))
  dispatch(resetDialogForm())
}

export const updatePasswordThunk = () => async (dispatch, getState) => {
  const { dialogForms, dialogLoading } = getState().userReducer;
  const token = getFromStorage("token");
  if (dialogLoading) return;

  dispatch(startDialogLoading());

  const formatExpectedOnRequest = {
    oldPassword: dialogForms.oldPassword,
    newPassword: dialogForms.newPassword
  }

  const { result, error, status } = await putRequest(`users/password`, formatExpectedOnRequest, token);
  if (!result?.message || status >= 400 || !!error) return dispatch(setDialogError({ error: `Something went wrong : ${error}` }));

  signOut(dispatch);
  dispatch(resetDialogForm());
}

export const getOneUserThunk = () => async (dispatch, getState) => {
  const token = getFromStorage("token");

  dispatch(startGetUserLoading());

  const { result, error, status } = await getRequest("users/user", token);
  if (!result?.message || status >= 400 || !!error) {
    signOut(dispatch);
    return dispatch(setGetUserError({ error: `Something went wrong: ${error}` }));
  }

  dispatch(setUser({ id: result.user.userID, username: result.user.username, email: result.user.email, role: result.user.userRole }))
}

export const deleteUserThunk = (id) => async (dispatch, getState) => {
  const token = getFromStorage("token");

  dispatch(startDeleteUserLoading());

  console.log(id);

  const { result, error, status } = await deleteRequest(`users/${id}`, token);
  if (!result?.message || status >= 400 || !!error) return dispatch(setDeleteUserError({ error: `Something went wrong : ${error}` }));

  signOut(dispatch);
  dispatch(stopDeleteUserLoading());
}