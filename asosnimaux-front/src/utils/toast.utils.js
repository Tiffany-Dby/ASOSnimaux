import { resetArticleSuccess } from "../redux/reducers/article.reducer";
import { removeToast, triggerToast } from "../redux/reducers/toast.reducer"
import { resetUserSuccess } from "../redux/reducers/user.reducer";

export const showToast = (dispatch, duration = 3) => {
  dispatch(triggerToast());

  setTimeout(() => {
    dispatch(removeToast());
    dispatch(resetArticleSuccess());
    dispatch(resetUserSuccess());
  }, duration * 1000)
}