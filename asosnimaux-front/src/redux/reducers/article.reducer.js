import { createSlice } from "@reduxjs/toolkit";

const ARTICLE_STATE = {
  articles: {
    overview: [],
    all: [],
    one: {
      name: "",
      date: "",
      location: "",
      description: "",
      picture_url: "",
      picture_caption: ""
    },
    new: {
      name: "",
      location: "",
      description: "",
      picture_url: "",
      picture_caption: ""
    },
  },
  overviewLoading: false,
  overviewError: null,
  newLoading: false,
  newError: null,
  allLoading: false,
  allError: null,
  oneLoading: false,
  oneError: null
}

const articleSlice = createSlice({
  name: "article",
  initialState: ARTICLE_STATE,
  reducers: {
    setOverview: (state, action) => {
      return {
        ...state,
        articles: {
          ...state.articles,
          overview: action.payload.articles
        },
        overviewError: null,
        overviewLoading: false
      }
    },
    startOverviewLoading: (state, action) => {
      return {
        ...state,
        overviewLoading: true,
      }
    },
    stopOverviewLoading: (state, action) => {
      return {
        ...state,
        overviewLoading: false,
      }
    },
    setOverviewError: (state, action) => {
      return {
        ...state,
        overviewError: action.payload.error,
        overviewLoading: false,
      }
    },
    setNew: (state, action) => {
      const { name, location, description, picture_url } = action.payload;
      return {
        ...state,
        articles: {
          ...state.articles,
          new: {
            name,
            location,
            description,
            picture_url,
            picture_caption
          }
        },
        newError: null,
        newLoading: false
      }
    },
    startNewLoading: (state, action) => {
      return {
        ...state,
        newLoading: true
      }
    },
    stopNewLoading: (state, action) => {
      return {
        ...state,
        newLoading: false
      }
    },
    setNewError: (state, action) => {
      return {
        ...state,
        newError: action.payload.error,
        newLoading: false
      }
    }
  }
});

export const { setOverview, startOverviewLoading, stopOverviewLoading, setOverviewError, setNew, startNewLoading, stopNewLoading, setNewError } = articleSlice.actions;
export default articleSlice.reducer;