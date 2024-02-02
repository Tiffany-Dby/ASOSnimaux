import { createSlice } from "@reduxjs/toolkit";

const ARTICLE_STATE = {
  articles: {
    overview: [],
    all: [],
    one: {
      id: "",
      name: "",
      date: "",
      location: "",
      description: "",
      picture_url: "",
      picture_caption: ""
    },
    newArticle: {
      name: "",
      location: "",
      picture_caption: "",
      description: ""
    },
  },
  overviewLoading: false,
  overviewError: null,
  newArticleLoading: false,
  newArticleError: null,
  allLoading: false,
  allError: null,
  oneLoading: false,
  oneError: null,
  deleteLoading: false,
  deleteError: null
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
          overview: action.payload.overview
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
    setNewArticle: (state, action) => {
      const { id, name, date, location, description, picture_url, picture_caption } = action.payload;
      return {
        ...state,
        articles: {
          ...state.articles,
          all: [
            ...state.articles.all,
            {
              id,
              name,
              date,
              location,
              description,
              picture_url,
              picture_caption
            }
          ]
        },
        newArticleError: null,
        newArticleLoading: false
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
    },
    updateFormNewArticle: (state, action) => {
      const { input, value } = action.payload;
      return {
        ...state,
        articles: {
          ...state.articles,
          newArticle: {
            ...state.articles.newArticle,
            [input]: value
          }
        }
      }
    },
    setAll: (state, action) => {
      return {
        ...state,
        articles: {
          ...state.articles,
          all: action.payload.all
        },
        allError: null,
        allLoading: false
      }
    },
    startAllLoading: (state, action) => {
      return {
        ...state,
        allLoading: true
      }
    },
    stopAllLoading: (state, action) => {
      return {
        ...state,
        allLoading: false
      }
    },
    setAllError: (state, action) => {
      return {
        ...state,
        allError: action.payload.error,
        allLoading: false
      }
    },
    setDelete: (state, action) => {
      const { id } = action.payload;
      return {
        ...state,
        articles: {
          ...state.articles,
          all: state.articles.all.filter(article => article.id !== id)
        },
        deleteLoading: false
      }
    },
    setStartDeleteLoading: (state, action) => {
      return {
        ...state,
        deleteLoading: true,
      }
    },
    setStopDeleteLoading: (state, action) => {
      return {
        ...state,
        deleteLoading: false,
      }
    },
    setDeleteError: (state, action) => {
      return {
        ...state,
        deleteError: action.payload.error,
        deleteLoading: false
      }
    }
  }
});

export const { setOverview, startOverviewLoading, stopOverviewLoading, setOverviewError, setNewArticle, startNewArticleLoading, stopNewArticleLoading, setNewArticleError, updateFormNewArticle, setAll, startAllLoading, stopAllLoading, setAllError, setDelete, setStartDeleteLoading, setStopDeleteLoading, setDeleteError } = articleSlice.actions;
export default articleSlice.reducer;