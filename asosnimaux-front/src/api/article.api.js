import { setArticlesOverview, startArticlesLoading, stopArticlesLoading, setArticlesError, setnewArticle, startNewArticleLoading, stopNewArticleLoading } from "../redux/reducers/article.reducer"
import { getRequest, postRequest } from "./api";

export const getArticleThunk = () => async (dispatch, getState) => {
  const { articleLoading } = getState().articleReducer;
  if (articleLoading) return;

  dispatch(startArticlesLoading());
  const { result, error, status } = await getRequest("articles/overview");
  if (!result?.message || status >= 400 || !!error) return dispatch(setArticlesError({ error: `Something went wrong : ${error}` }));

  dispatch(setArticlesOverview({ articles: result.result }));
}

export const postArticleThunk = () => async (dispatch, getState) => {
  const { newArticleLoading } = getState().articleReducer;
  if (newArticleLoading) return;

  dispatch(startNewArticleLoading());
  const { result, error, status } = await postRequest("/")
}