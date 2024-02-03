import { createSlice } from "@reduxjs/toolkit";

const DIALOG_STATE = {
  isOpen: false,
  input: {
    label: "",
    id: "",
    type: ""
  }
}

const dialogSlice = createSlice({
  name: "dialog",
  initialState: DIALOG_STATE,
  reducers: {
    toggleDialog: (state, action) => {
      state.isOpen = !state.isOpen;
    },
    setInputFields: (state, action) => {
      const { label, id, type } = action.payload;
      return {
        ...state,
        input: {
          ...state.input,
          label,
          id,
          type
        }
      }
    }
  }
});

export const { toggleDialog, setInputFields } = dialogSlice.actions;
export default dialogSlice.reducer;