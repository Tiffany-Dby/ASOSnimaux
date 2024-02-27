import { resetAnimalsSuccess } from "../redux/reducers/animal.reducer";
import { resetArticleSuccess } from "../redux/reducers/article.reducer";
import { resetTestimoniesSuccess } from "../redux/reducers/testimony.reducer";
import { removeToast, triggerToast } from "../redux/reducers/toast.reducer"
import { resetUserSuccess } from "../redux/reducers/user.reducer";

export const showToast = (dispatch, duration = 3) => {
  dispatch(triggerToast());

  setTimeout(() => {
    dispatch(removeToast());
    dispatch(resetAnimalsSuccess());
    dispatch(resetArticleSuccess());
    dispatch(resetUserSuccess());
    dispatch(resetTestimoniesSuccess());
  }, duration * 1000)
}