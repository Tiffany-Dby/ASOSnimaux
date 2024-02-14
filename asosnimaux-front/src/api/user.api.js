import { setUser, startSignInLoading, setSignInError, startSignUpLoading, setSignUpError, startDialogLoading, setDialogError, startGetUserLoading, setGetUserError, resetSignInForm, resetDialogForm, stopSignUpLoading, resetSignUpForm, setIsSignUpDone, setDeleteUserError, startDeleteUserLoading, stopDeleteUserLoading, startAllUsersLoading, setAllUsersError, setAllUsers, setDeleteBySuperAdmin, setUpdatedAvatarError, startUpdatedAvatarLoading, setUpdatePasswordSuccess, startSelectedUserLoading, setSelectedUserError, setUpdateSelectedUser } from "../redux/reducers/user.reducer";
import { deleteRequest, getRequest, postRequest, putRequest } from "./api";
import { getFromStorage, setToStorage } from "../utils/storage.utils.js";
import { signOut } from "../utils/user.utils.js";
import { APP_ROUTES } from "../constants/route.const.js";
import { showToast } from "../utils/toast.utils.js";

export const signInThunk = () => async (dispatch, getState) => {
  const { signInForm, signInLoading } = getState().userReducer;
  if (signInLoading) return;

  dispatch(startSignInLoading());

  const { result, error, status } = await postRequest("users/sign-in", signInForm);
  if (!result?.message || status >= 400 || !!error) return dispatch(setSignInError({ error: `Something went wrong : ${error}` }));

  const { token } = result.user;
  setToStorage("token", token);

  dispatch(setUser({ id: result.user.userID, username: result.user.username, email: result.user.email, avatar: `${APP_ROUTES.API_URL}${result.user.avatar}`, role: result.user.userRole }));
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

  dispatch(setUser({ ...user, username: dialogForms.username, updateUsernameSuccess: "Pseudo mis à jour !" }));
  dispatch(resetDialogForm());
  showToast(dispatch);
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

  dispatch(resetDialogForm());
  signOut(dispatch);
  dispatch(setUpdatePasswordSuccess());
  showToast(dispatch);
}

export const updateAvatarThunk = () => async (dispatch, getState) => {
  const { user, updatedAvatar, updatedAvatarLoading } = getState().userReducer;
  const token = getFromStorage("token");
  if (updatedAvatarLoading) return;

  dispatch(startUpdatedAvatarLoading());

  const formatExpectedOnRequest = {
    avatarUrl: updatedAvatar,
  }

  const { result, error, status } = await putRequest(`users/avatar`, formatExpectedOnRequest, token);
  if (!result?.message || status >= 400 || !!error) return dispatch(setUpdatedAvatarError({ error: `Something went wrong : ${error}` }));

  dispatch(setUser({ ...user, avatar: `${APP_ROUTES.API_URL}${updatedAvatar}`, updateAvatarSuccess: "Avatar mis à jour !" }));
  showToast(dispatch);
}

export const getOneUserThunk = () => async (dispatch, getState) => {
  const token = getFromStorage("token");

  dispatch(startGetUserLoading());

  const { result, error, status } = await getRequest("users/user", token);
  if (!result?.message || status >= 400 || !!error) {
    signOut(dispatch);
    return dispatch(setGetUserError({ error: `Something went wrong: ${error}` }));
  }

  dispatch(setUser({ id: result.user.userID, username: result.user.username, email: result.user.email, avatar: `${APP_ROUTES.API_URL}${result.user.avatar}`, role: result.user.userRole }))
}

export const getAllUsersThunk = () => async (dispatch, getState) => {
  const { allUsersLoading } = getState().userReducer;
  const token = getFromStorage("token");
  if (allUsersLoading) return;

  dispatch(startAllUsersLoading());

  const { result, error, status } = await getRequest("users/all", token);
  if (!result?.message || status >= 400 || !!error) return dispatch(setAllUsersError({ error: `Something went wrong : ${error}` }));

  const users = result.result;

  dispatch(setAllUsers({
    allUsers: users.map(user => {
      return { id: user.id, username: user.username, role: user.user_role }
    })
  }));
}

export const updateUserRoleThunk = () => async (dispatch, getState) => {
  const { allUsers, selectedUser, selectedUserLoading } = getState().userReducer;
  const token = getFromStorage("token");
  if (selectedUserLoading) return;

  dispatch(startSelectedUserLoading());

  const formatExpectedOnRequest = {
    newRole: selectedUser.role,
  }

  const { result, error, status } = await putRequest(`users/role/${selectedUser.id}`, formatExpectedOnRequest, token);
  if (!result?.message || status >= 400 || !!error) return dispatch(setSelectedUserError({ error: `Something went wrong : ${error}` }));

  dispatch(setUpdateSelectedUser({ user: { id: selectedUser.id, username: selectedUser.username, role: selectedUser.role } }));
  showToast(dispatch);
}

export const deleteUserThunk = (id) => async (dispatch, getState) => {
  const { user } = getState().userReducer;
  const token = getFromStorage("token");

  dispatch(startDeleteUserLoading());

  const { result, error, status } = await deleteRequest(`users/${id}`, token);
  if (!result?.message || status >= 400 || !!error) return dispatch(setDeleteUserError({ error: `Something went wrong : ${error}` }));

  if (id === user.id) {
    signOut(dispatch);
  }
  else {
    dispatch(setDeleteBySuperAdmin({ id }));
  }

  dispatch(stopDeleteUserLoading());
  showToast(dispatch);
}