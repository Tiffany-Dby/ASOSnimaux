import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";
import Input from "../Input/Input";
import "./dialog.scss";
import { toggleDialog } from "../../redux/reducers/dialog.reducer";

const Dialog = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector(state => state.dialogReducer);

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(toggleDialog());
  }

  const handleClose = () => {
    dispatch(toggleDialog());
  }

  return (
    <>
      <dialog open={isOpen}>
        <form onSubmit={handleSubmit}>
          <h2>Mettre à jour</h2>
          <Input />
          <Button btnStyle="" text="Valider" type="submit" btnClick={handleClose} />
        </form>
      </dialog>
    </>
  )
}

export default Dialog;