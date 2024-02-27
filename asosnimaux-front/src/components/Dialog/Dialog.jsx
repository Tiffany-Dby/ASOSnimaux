import "./dialog.scss";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import { closeDialog } from "../../redux/reducers/dialog.reducer";
import { resetFormNewArticle } from "../../redux/reducers/article.reducer";
import { resetFormNewAnimal } from "../../redux/reducers/animal.reducer";
import { resetFormNewTestimony } from "../../redux/reducers/testimony.reducer";

const Dialog = ({ children }) => {
  const dispatch = useDispatch();
  const dialogRef = useRef(null);

  // Dialog Reducer
  const { isOpen } = useSelector(state => state.dialogReducer);

  // *************** Close Dialog ***************
  // Espace key
  const handleEscapeKey = e => {
    if (e.key === "Escape") {
      dispatch(closeDialog());
      dispatch(resetFormNewArticle());
      dispatch(resetFormNewAnimal());
      dispatch(resetFormNewTestimony());
    }
  }

  // Click outside Dialog
  const handleOutsideDialogClick = (e) => {
    const dialogDimensions = dialogRef.current.getBoundingClientRect();

    if (e.clientX < dialogDimensions.left || e.clientX > dialogDimensions.right || e.clientY < dialogDimensions.top || e.clientY > dialogDimensions.bottom) {
      dispatch(closeDialog());
      dispatch(resetFormNewArticle());
      dispatch(resetFormNewAnimal());
      dispatch(resetFormNewTestimony());
    }
  }
  // *************** End Close Dialog ***************

  // *************** Toggle Dialog ***************
  // Can be closed -> cancel/close button, escape key or clicking outside of it
  useEffect(() => {
    if (dialogRef.current) {
      if (isOpen) {
        dialogRef.current.showModal();
        document.addEventListener("mousedown", handleOutsideDialogClick);
        document.addEventListener("keydown", handleEscapeKey);
      }
      else {
        dialogRef.current.close();
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideDialogClick);
      document.removeEventListener("keydown", handleEscapeKey);
    }
  }, [isOpen]);
  // *************** End Toggle Dialog ***************

  return (
    <>
      {isOpen && createPortal(
        <dialog id="dialog" ref={dialogRef}>
          {children}
        </dialog>
        , document.body)}
    </>
  )
}

export default Dialog;