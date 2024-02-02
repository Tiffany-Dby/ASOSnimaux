import { APP_ROUTES } from "../constants/route.const.js";
import { setOverview, startOverviewLoading, stopOverviewLoading, setOverviewError, setNewArticle, startNewArticleLoading, stopNewArticleLoading, setNewArticleError, startAllLoading, setAll } from "../redux/reducers/article.reducer"
import { getRequest, postRequest } from "./api";
import { setFormData } from "../utils/formidable.utils.js"
import { getFromStorage } from "../utils/storage.utils.js";

export const getAllArticlesThunk = () => async (dispatch, getState) => {
  const { allLoading, allError } = getState().articleReducer;
  if (allLoading) return;

  dispatch(startAllLoading());
  const { result, error, status } = await getRequest("articles/all");
  if (!result?.message || status >= 400 || !!error) return dispatch(setAll({ error: `Something went wrong : ${error}` }));

  dispatch(setAll({ all: result.result }));
}

export const getOverviewThunk = () => async (dispatch, getState) => {
  const { overviewLoading } = getState().articleReducer;
  if (overviewLoading) return;

  dispatch(startOverviewLoading());
  const { result, error, status } = await getRequest("articles/overview");
  if (!result?.message || status >= 400 || !!error) return dispatch(setOverviewError({ error: `Something went wrong : ${error}` }));

  dispatch(setOverview({
    overview: result.result.map(article => {
      return { ...article, picture_url: `${APP_ROUTES.API_URL}${article.picture_url}` }
    })
  }));
}

export const postArticleThunk = (file) => async (dispatch, getState) => {
  const { articles, newArticleLoading } = getState().articleReducer;
  const { newArticle } = articles;
  const token = getFromStorage("token");
  if (newArticleLoading) return;

  const fd = setFormData({
    ...newArticle,
    newArticleImg: file
  });

  dispatch(startNewArticleLoading());
  const { result, error, status } = await postRequest("articles/", fd, token);
  if (!result?.message || status >= 400 || !!error) return dispatch(setNewArticleError({ error: `Something went wrong : ${error}` }));

  dispatch(setNewArticle({
    id: result.article[0].id,
    date: result.article[0].date,
    name: result.article[0].name,
    location: result.article[0].location,
    description: result.article[0].description,
    picture_url: result.article[0].picture_url,
    picture_caption: result.article[0].picture_caption
  }));
}

export const deleteArticleThunk = () => async (dispatch, getState) => {

}