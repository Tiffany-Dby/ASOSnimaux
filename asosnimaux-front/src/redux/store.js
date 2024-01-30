import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.reducer";
import headerReducer from "./reducers/header.reducer";
import windowReducer from "./reducers/window.reducer";
import articleReducer from "./reducers/article.reducer";

const store = configureStore({
  reducer: {
    userReducer,
    headerReducer,
    windowReducer,
    articleReducer
  },
});

export default store;
