import { createSlice } from "@reduxjs/toolkit";

const ARTICLE_STATE = {
  articlesOverview: [],
  articlesLoading: false,
  articlesError: null,
  newArticle: {
    name: "",
    location: "",
    description: "",
    picture_url: ""
  },
  newArticleLoading: false,
  newArticleError: false
}

const articleSlice = createSlice({
  name: "article",
  initialState: ARTICLE_STATE,
  reducers: {
    setArticlesOverview: (state, action) => {
      return {
        ...state,
        articlesOverview: action.payload.articles,
        articlesLoading: false,
      }
    },
    startArticlesLoading: (state, action) => {
      return {
        ...state,
        articlesLoading: true,
      }
    },
    stopArticlesLoading: (state, action) => {
      return {
        ...state,
        articlesLoading: false,
      }
    },
    setArticlesError: (state, action) => {
      return {
        ...state,
        articlesError: action.payload.error,
        articlesLoading: false,
      }
    },
    setnewArticle: (state, action) => {
      const { name, location, description, picture_url } = action.payload;
      return {
        ...state,
        newArticleLoading: false,
        newArticleError: null,
        newArticle: {
          name,
          location,
          description,
          picture_url
        }
      }
    },
    startNewArticleLoading: (state, action) => {
      return {
        ...state,
        newArticleLoading: true
      }
    },
    stopNewArticleLoading: (state, action) => {
      return {
        ...state,
        newArticleLoading: false
      }
    },
    setNewArticleError: (state, action) => {
      return {
        ...state,
        newArticleError: action.payload.error,
        newArticleLoading: false
      }
    }
  }
});

export const { setArticlesOverview, startArticlesLoading, stopArticlesLoading, setArticlesError, setnewArticle, startNewArticleLoading, stopNewArticleLoading, setNewArticleError } = articleSlice.actions;
export default articleSlice.reducer;