import "./dialog.scss";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

const Dialog = ({ children }) => {
  const { isOpen } = useSelector(state => state.dialogReducer);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (dialogRef.current) {
      if (isOpen) {
        dialogRef.current.showModal();
      } else {
        setTimeout(() => {
          dialogRef.current.close();
        }, 480)
      }
    }
  }, [isOpen]);

  return (
    <>
      <dialog id="dialog" ref={dialogRef} className={isOpen ? "" : "hide"}>
        {children}
      </dialog>
    </>
  )
}

export default Dialog;