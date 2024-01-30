import { setArticlesOverview, startArticlesLoading, stopArticlesLoading, setArticlesError } from "../redux/reducers/article.reducer"
import { getRequest } from "./api";

export const getArticleThunk = () => async (dispatch, getState) => {
  const { articleLoading } = getState().articleReducer;
  if (articleLoading) return;

  dispatch(startArticlesLoading());
  const { result, error, status } = await getRequest("articles/overview");
  if (!result?.message || status >= 400 || !!error) return dispatch(setArticlesError({ error: `Something went wrong : ${error}` }));

  dispatch(setArticlesOverview({ articles: result.result }));
}