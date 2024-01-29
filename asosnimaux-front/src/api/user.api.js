import { setUser, startSignInLoading, setSignInError } from "../redux/reducers/user.reducer";
import { postRequest } from "./api";
import { setToStorage } from "../utils/storage.utils.js";

export const signInThunk = () => async (dispatch, getState) => {
  const { signInForm, signInLoading } = getState().userState;
  if (signInLoading) return;

  dispatch(startSignInLoading());
  const { result, error, status } = await postRequest("users/sign-in", signInForm);
  console.log(result);
  if (!result?.message || status >= 400 || !!error) return dispatch(setSignInError({ error: `Something went wrong : ${error}` }));
  dispatch(setUser({ login: result.message.login }));
  const { token } = result.user;
  setToStorage("token", token);
}