import { createSlice } from "@reduxjs/toolkit";

const WINDOW_STATE = {
  width: 0,
  height: 0,
};

const windowSlice = createSlice({
  name: "window",
  initialState: WINDOW_STATE,
  reducers: {
    updateWindowSize: (state, action) => {
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
  },
});

export const { updateWindowSize } = windowSlice.actions;
export default windowSlice.reducer;