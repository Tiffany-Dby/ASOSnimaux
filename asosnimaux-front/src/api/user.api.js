import { setUser, startSignInLoading, setSignInError, startSignUpLoading, setSignUpError } from "../redux/reducers/user.reducer";
import { postRequest } from "./api";
import { setToStorage } from "../utils/storage.utils.js";

export const signInThunk = () => async (dispatch, getState) => {
  const { signInForm, signInLoading } = getState().userReducer;
  if (signInLoading) return;

  dispatch(startSignInLoading());
  const { result, error, status } = await postRequest("users/sign-in", signInForm);
  console.log(result);
  if (!result?.message || status >= 400 || !!error) return dispatch(setSignInError({ error: `Something went wrong : ${error}` }));
  const { token } = result.user;
  setToStorage("token", token);
  console.log(result)

  dispatch(setUser({ login: result.message.login, role: result.message.userRole }));
}

export const signUpThunk = () => async (dispatch, getState) => {
  const { signUpForm, signUpLoading } = getState().userReducer;
  if (signUpLoading) return;

  dispatch(startSignUpLoading());
  const { result, error, status } = await postRequest("users", signUpForm);
  console.log(result);
  if (!result?.message || status >= 400 || !!error) return dispatch(setSignUpError({ error: `Something went wrong : ${error}` }));
}