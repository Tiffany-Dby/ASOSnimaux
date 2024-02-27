import { createSlice } from "@reduxjs/toolkit";

const TESTIMONY_STATE = {
  testimonies: {
    one: {
      id: "",
      user_id: "",
      username: "",
      avatar_url: "",
      content: "",
      date: ""
    },
    newTestimony: {
      content: ""
    },
    all: [],
    overview: []
  },
  oneTestimonyLoading: false,
  oneTestimonyError: null,
  newTestimonyLoading: false,
  newTestimonySuccess: null,
  newTestimonyError: null,
  allTestimonyLoading: false,
  allTestimonyError: null,
  overviewTestimonyLoading: false,
  overviewTestimonyError: null
}

const testimonySlice = createSlice({
  name: "testimony",
  initialState: TESTIMONY_STATE,
  reducers: {
    setTestimonyOverview: (state, action) => {
      return {
        ...state,
        testimonies: {
          ...state.testimonies,
          overview: action.payload.overview
        },
        overviewTestimonyError: null,
        overviewTestimonyLoading: false
      }
    },
    startOverviewTestimonyLoading: (state, action) => {
      return {
        ...state,
        overviewTestimonyLoading: true
      }
    },
    stopOverviewTestimonyLoading: (state, action) => {
      return {
        ...state,
        overviewTestimonyLoading: false
      }
    },
    setOverviewTestimonyError: (state, action) => {
      return {
        ...state,
        overviewTestimonyError: action.payload.error,
        overviewTestimonyLoading: false
      }
    },
    setOneTestimony: (state, action) => {
      const { id, user_id, username, avatar_url, content, date } = action.payload;
      return {
        ...state,
        testimonies: {
          ...state.testimonies,
          one: {
            id,
            user_id,
            username,
            avatar_url,
            content,
            date
          }
        },
        oneTestimonyError: null,
        oneTestimonyLoading: false
      }
    },
    startOneTestimonyLoading: (state, action) => {
      return {
        ...state,
        oneTestimonyLoading: true
      }
    },
    stopOneTestimonyLoading: (state, action) => {
      return {
        ...state,
        oneTestimonyLoading: false
      }
    },
    setOneTestimonyError: (state, action) => {
      return {
        ...state,
        oneTestimonyError: action.payload.error,
        oneTestimonyLoading: false
      }
    },
    resetOneTestimony: (state, action) => {
      return {
        ...state,
        testimonies: {
          ...state.testimonies,
          one: {
            id: "",
            userID: "",
            username: "",
            avatar_url: "",
            content: "",
            date: ""
          }
        }
      }
    },
    updateFormNewTestimony: (state, action) => {
      const { input, value } = action.payload;
      return {
        ...state,
        testimonies: {
          ...state.testimonies,
          newTestimony: {
            ...state.testimonies.newTestimony,
            [input]: value
          }
        }
      }
    },
    resetFormNewTestimony: (state, action) => {
      return {
        ...state,
        testimonies: {
          ...state.testimonies,
          newTestimony: {
            content: ""
          }
        }
      }
    },
    setNewTestimony: (state, action) => {
      const { testimony } = action.payload;
      return {
        ...state,
        testimonies: {
          ...state.testimonies,
          all: [...state.testimonies.all, { ...testimony }],
          overview: [{ ...testimony }, ...state.testimonies.overview.slice(0, -1)]
        },
        newTestimonyError: null,
        newTestimonyLoading: false,
        newTestimonySuccess: "Témoignage posté !"
      }
    },
    startNewTestimonyLoading: (state, action) => {
      return {
        ...state,
        newTestimonyLoading: true
      }
    },
    stopNewTestimonyLoading: (state, action) => {
      return {
        ...state,
        newTestimonyLoading: false
      }
    },
    setNewTestimonyError: (state, action) => {
      return {
        ...state,
        newTestimonyError: action.payload.error,
        newTestimonyLoading: false
      }
    },
    resetTestimoniesSuccess: (state, action) => {
      return {
        ...state,
        newTestimonySuccess: null
      }
    },
  }
});

export const { setTestimonyOverview, startOverviewTestimonyLoading, stopOverviewTestimonyLoading, setOverviewTestimonyError, setOneTestimony, startOneTestimonyLoading, stopOneTestimonyLoading, setOneTestimonyError, resetOneTestimony, updateFormNewTestimony, resetFormNewTestimony, setNewTestimony, startNewTestimonyLoading, stopNewTestimonyLoading, setNewTestimonyError, resetTestimoniesSuccess } = testimonySlice.actions;
export default testimonySlice.reducer;