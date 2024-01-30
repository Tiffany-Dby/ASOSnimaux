import { createSlice } from "@reduxjs/toolkit";

const ARTICLE_STATE = {
  articlesOverview: [],
  articlesLoading: false,
  articlesError: null
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
  }
});

export const { setArticlesOverview, startArticlesLoading, stopArticlesLoading, setArticlesError } = articleSlice.actions;
export default articleSlice.reducer;