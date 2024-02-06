import { setUser, setisAuth } from "../redux/reducers/user.reducer";
import { clearStorage } from "./storage.utils";

export const signOut = (dispatch) => {
  clearStorage();
  dispatch(setUser({ id: "", username: "", email: "", role: "" }));
  dispatch(setisAuth(false));
}