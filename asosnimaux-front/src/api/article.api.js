import { APP_ROUTES } from "../constants/route.const.js";
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

  dispatch(setOverview({
    articles: result.result.map(article => {
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

  const article = {
    name: result.article.name,
    location: result.article.location,
    description: result.article.description,
    picture_caption: result.article.picture_caption,
  }
  console.log("result: ", result)
  console.log("article: ", article)

  dispatch(setNewArticle({ article }));
}