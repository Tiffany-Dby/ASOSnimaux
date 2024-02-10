import { createSlice } from "@reduxjs/toolkit";

const DIALOG_STATE = {
  isOpen: false,
  isNewArticleForm: false,
  isDeleteArticleForm: false,
  isUpdateArticleForm: false,
  isDeleteAccountForm: false,
  isUpdateAccountForm: false,
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
      state.isNewArticleForm = false;
      state.isDeleteArticleForm = false;
      state.isUpdateArticleForm = false;
      state.isDeleteAccountForm = false;
      state.isUpdateAccountForm = false;
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
    setIsNewArticleForm: (state, action) => {
      state.isOpen = true;
      state.isNewArticleForm = true;
    },
    setIsDeleteArticleForm: (state, action) => {
      state.isOpen = true;
      state.isDeleteArticleForm = true;
    },
    setIsUpdateArticleForm: (state, action) => {
      state.isOpen = true;
      state.isUpdateArticleForm = true;
    },
    setIsDeleteAccountForm: (state, action) => {
      state.isOpen = true;
      state.isDeleteAccountForm = true;
    },
    setIsUpdateAccountForm: (state, action) => {
      state.isOpen = true;
      state.isUpdateAccountForm = true;
    },
  }
});

export const { toggleDialog, setInputFields, closeDialog, setIsNewArticleForm, setIsDeleteArticleForm, setIsUpdateArticleForm, setIsDeleteAccountForm, setIsUpdateAccountForm } = dialogSlice.actions;
export default dialogSlice.reducer;