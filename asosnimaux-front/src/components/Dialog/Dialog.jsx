import "./dialog.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { closeDialog } from "../../redux/reducers/dialog.reducer";

const Dialog = ({ children }) => {
  const dispatch = useDispatch();
  const dialogRef = useRef(null);
  const { isOpen } = useSelector(state => state.dialogReducer);

  useEffect(() => {
    const handleEscapeKey = e => {
      if (e.key === "Escape" && isOpen) dispatch(closeDialog());
    }
    if (dialogRef.current) {
      if (isOpen) {
        dialogRef.current.showModal();
      }
      else {
        dialogRef.current.close();
      }
    }

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
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