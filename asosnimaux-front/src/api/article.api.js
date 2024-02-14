import { APP_ROUTES } from "../constants/route.const.js";
import { setOverview, startOverviewLoading, stopOverviewLoading, setOverviewError, setNewArticle, startNewArticleLoading, stopNewArticleLoading, setNewArticleError, startAllLoading, setAll, setAllError, setStartDeleteLoading, setDeleteError, setDelete, resetFormNewArticle, startSelectedLoading, setSelectedError, setSelectedArticle, setUpdateSelected, startOneLoading, setOneError, setOne } from "../redux/reducers/article.reducer"
import { deleteRequest, getRequest, postRequest, putRequest } from "./api";
import { setFormData } from "../utils/formidable.utils.js"
import { getFromStorage } from "../utils/storage.utils.js";
import { triggerToast } from "../redux/reducers/toast.reducer.js";
import { showToast } from "../utils/toast.utils.js";

export const getAllArticlesThunk = () => async (dispatch, getState) => {
  const { allLoading } = getState().articleReducer;
  if (allLoading) return;

  dispatch(startAllLoading());
  const { result, error, status } = await getRequest("articles/all");
  if (!result?.message || status >= 400 || !!error) return dispatch(setAllError({ error: `Something went wrong : ${error}` }));

  dispatch(setAll({ all: result.result }));
}

export const getOneArticleThunk = (id) => async (dispatch, getState) => {
  const { articles, oneLoading, oneError } = getState().articleReducer;
  const { one } = articles;
  if (oneLoading) return;

  dispatch(startOneLoading());

  const { result, error, status } = await getRequest(`articles/${id}`);
  if (!result?.message || status >= 400 || !!error) return dispatch(setOneError({ error: `Something went wrong : ${error}` }));

  dispatch(setOne({ id: result.article.articleID, date: result.article.date, name: result.article.name, location: result.article.location, description: result.article.description, picture_url: `${APP_ROUTES.API_URL}${result.article.pictureURL}`, picture_caption: result.article.pictureCaption }));
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

  showToast(dispatch);
  dispatch(resetFormNewArticle());
}

export const updateArticleThunk = () => async (dispatch, getState) => {
  const { articles, selectedLoading } = getState().articleReducer;
  const { selectedArticle, all } = articles;
  const token = getFromStorage("token");
  if (selectedLoading) return;

  const formatExpectedOnRequest = {
    articleID: selectedArticle.id,
    name: selectedArticle.name,
    location: selectedArticle.location,
    description: selectedArticle.description
  }

  dispatch(startSelectedLoading());
  const { result, error, status } = await putRequest("articles/", formatExpectedOnRequest, token);

  if (!result?.message || status >= 400 || !!error) return dispatch(setSelectedError({ error: `Something went wrong ${error}` }));

  dispatch(setUpdateSelected({
    article: {
      id: result.result[0].id,
      date: result.result[0].date,
      name: result.result[0].name,
      location: result.result[0].location,
      description: result.result[0].description
    }
  }));
  showToast(dispatch);
}

export const deleteArticleThunk = (id) => async (dispatch, getState) => {
  const { deleteLoading } = getState().articleReducer;
  const token = getFromStorage("token");
  if (deleteLoading) return;

  dispatch(setStartDeleteLoading());
  const { result, error, status } = await deleteRequest(`articles/${id}`, token);
  if (!result?.message || status >= 400 || !!error) return dispatch(setDeleteError({ error: `Something went wrong: ${error}` }));

  dispatch(setDelete({ id }));
  showToast(dispatch);
}