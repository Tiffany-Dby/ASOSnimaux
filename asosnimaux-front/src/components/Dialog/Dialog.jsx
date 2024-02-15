import "./dialog.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { closeDialog } from "../../redux/reducers/dialog.reducer";
import { resetFormNewArticle } from "../../redux/reducers/article.reducer";
import { resetFormNewAnimal } from "../../redux/reducers/animal.reducer";

const Dialog = ({ children }) => {
  const dispatch = useDispatch();
  const dialogRef = useRef(null);
  const { isOpen } = useSelector(state => state.dialogReducer);

  const handleEscapeKey = e => {
    if (e.key === "Escape") {
      dispatch(closeDialog());
      dispatch(resetFormNewArticle());
      dispatch(resetFormNewAnimal());
    }
  }

  const handleOutsideDialogClick = (e) => {
    const dialogDimensions = dialogRef.current.getBoundingClientRect();

    if (e.clientX < dialogDimensions.left || e.clientX > dialogDimensions.right || e.clientY < dialogDimensions.top || e.clientY > dialogDimensions.bottom) {
      dispatch(closeDialog());
      dispatch(resetFormNewArticle());
      dispatch(resetFormNewAnimal());
    }
  }

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