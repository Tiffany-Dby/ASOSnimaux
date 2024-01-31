import { setOverview, startOverviewLoading, stopOverviewLoading, setOverviewError, setNew, startNewLoading, stopNewLoading } from "../redux/reducers/article.reducer"
import { getRequest, postRequest } from "./api";

export const getArticleThunk = () => async (dispatch, getState) => {
  const { overviewLoading } = getState().articleReducer;
  if (overviewLoading) return;

  dispatch(startOverviewLoading());
  const { result, error, status } = await getRequest("articles/overview");
  if (!result?.message || status >= 400 || !!error) return dispatch(setOverviewError({ error: `Something went wrong : ${error}` }));

  dispatch(setOverview({ articles: result.result }));
}

export const postArticleThunk = () => async (dispatch, getState) => {
  const { newLoading } = getState().articleReducer;
  if (newLoading) return;

  dispatch(startNewLoading());
  const { result, error, status } = await postRequest("articles/");
}