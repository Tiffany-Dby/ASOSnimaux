import { createSlice } from "@reduxjs/toolkit";

const DIALOG_STATE = {
  isOpen: false,
  isNewForm: false,
  isDeleteForm: false,
  isUpdateForm: false,
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
    closeDialog: (state, action) => {
      state.isOpen = false;
      state.isNewForm = false;
      state.isDeleteForm = false;
      state.isUpdateForm = false;
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
    },
    setIsNewForm: (state, action) => {
      state.isOpen = true;
      state.isNewForm = true;
    },
    setIsDeleteForm: (state, action) => {
      state.isOpen = true;
      state.isDeleteForm = true;
    },
    setIsUpdateForm: (state, action) => {
      state.isOpen = true;
      state.isUpdateForm = true;
    },
  }
});

export const { toggleDialog, setInputFields, closeDialog, setIsNewForm, setIsDeleteForm, setIsUpdateForm } = dialogSlice.actions;
export default dialogSlice.reducer;