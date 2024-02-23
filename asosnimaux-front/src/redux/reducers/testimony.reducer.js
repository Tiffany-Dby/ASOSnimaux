import { createSlice } from "@reduxjs/toolkit";

const TESTIMONY_STATE = {
  testimonies: {
    one: {
      id: "",
      userID: "",
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
      const { id, userID, content, date } = action.payload;
      return {
        ...state,
        testimonies: {
          ...state.testimonies,
          one: {
            id,
            userID,
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
  }
});

export const { setTestimonyOverview, startOverviewTestimonyLoading, stopOverviewTestimonyLoading, setOverviewTestimonyError, setOneTestimony, startOneTestimonyLoading, stopOneTestimonyLoading, setOneTestimonyError } = testimonySlice.actions;
export default testimonySlice.reducer;