import { setOverview, startOverviewLoading, stopOverviewLoading, setOverviewError, setNewArticle, startNewArticleLoading, stopNewArticleLoading, setNewArticleError } from "../redux/reducers/article.reducer"
import { getRequest, postRequest } from "./api";
import { setFormData } from "../utils/formidable.utils.js"
import { getFromStorage } from "../utils/storage.utils.js";

export const getArticleThunk = () => async (dispatch, getState) => {
  const { overviewLoading } = getState().articleReducer;
  if (overviewLoading) return;

  dispatch(startOverviewLoading());
  const { result, error, status } = await getRequest("articles/overview");
  if (!result?.message || status >= 400 || !!error) return dispatch(setOverviewError({ error: `Something went wrong : ${error}` }));

  dispatch(setOverview({ articles: result.result }));
}

export const postArticleThunk = (file) => async (dispatch, getState) => {
  const { newArticle } = getState().articleReducer.articles;
  const { newArticleLoading } = getState().articleReducer;
  const token = getFromStorage("token");
  if (newArticleLoading) return;

  const fd = setFormData(newArticle, "picture_url");

  console.log(fd)

  dispatch(startNewArticleLoading());
  const { result, error, status } = await postRequest("articles/", fd, token);
  if (!result?.message || status >= 400 || !!error) return dispatch(setNewArticleError({ error: `Something went wrong : ${error}` }));

  console.log(result)

  // const article = {
  //   name: result.result.message.name,
  //   location: result.result.message.location,
  //   description: result.result.message.description,
  //   picture_url: result.result.message.picture_url,
  //   picture_caption: result.result.message.picture_caption,
  // }

  // dispatch(setNewArticle({ article }));
}