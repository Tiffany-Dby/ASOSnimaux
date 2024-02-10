import "./user.scss";
import Button from "../Button/Button";
import Dialog from "../Dialog/Dialog";
import Input from "../Input/Input";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { resetDialogForm, updateDialogForm } from "../../redux/reducers/user.reducer";
import { createPortal } from "react-dom";
import { closeDialog, setInputFields, setIsDeleteAccountForm, setIsUpdateAccountForm, toggleDialog } from "../../redux/reducers/dialog.reducer";
import { deleteUserThunk, updatePasswordThunk, updateUsernameThunk } from "../../api/user.api";

const User = ({ imgUrl, imgAlt, date, testimonie }) => {
  const dispatch = useDispatch();
  const { user, dialogForms } = useSelector(state => state.userReducer);
  const { input, isDeleteAccountForm, isUpdateAccountForm } = useSelector(state => state.dialogReducer);

  const handleSubmit = e => {
    e.preventDefault();
    if (input.id === "username") {
      dispatch(updateUsernameThunk());
    }
    else if (input.id === "email") {
      dispatch(updateUsernameThunk());
    }
    else if (input.id === "newPassword") {
      dispatch(updatePasswordThunk());
    }
    dispatch(closeDialog());
  }

  const handleDeleteForm = () => {
    dispatch(setIsDeleteAccountForm());
  }

  const handleConfirmedDeletion = () => {
    console.log(user.id);
    dispatch(deleteUserThunk(user.id));
    dispatch(closeDialog());
  }

  const handleDialog = (input, value) => {
    dispatch(resetDialogForm());
    dispatch(setInputFields({ label: input.label, id: input.id, type: input.type }));
    dispatch(updateDialogForm({ input, value }));
    dispatch(setIsUpdateAccountForm());
  }

  const handleDialogClose = () => {
    dispatch(closeDialog());
  }

  const updateForm = (input, value) => dispatch(updateDialogForm({ input, value }));

  return (
    <>
      <section className="user">
        <div className="title-wrapper">
          <h1>Dashboard</h1>
        </div>
        <div className="user__greetings">
          <h2>Bonjour</h2>
          <div className="title-wrapper">
            <h2>{user.username}</h2>
          </div>
        </div>
        <div className="user__avatar">
          <img src={imgUrl} alt={imgAlt} />
        </div>
        <div className="user__content-wrapper">
          <div className="articles-wrapper">
            <article>
              <h2>Informations de compte</h2>
              <div className="user__username">
                <div className="content__header">
                  <p>Pseudo</p>
                  <FaPencil className="manage-icons" onClick={() => handleDialog({ label: "Pseudo", id: "username", type: "text" })} />
                </div>
                <div className="content">
                  <p>{user.username}</p>
                </div>
              </div>
              <div className="user__email">
                <div className="content__header">
                  <p>Email</p>
                  <FaPencil className="manage-icons" onClick={() => handleDialog({ label: "Email", id: "email", type: "email" })} />
                </div>
                <div className="content">
                  <p>{user.email}</p>
                </div>
              </div>
            </article>

            <article>
              <h2>Sécurité</h2>
              <div className="user__password">
                <div className="content__header">
                  <p>Mot de passe</p>
                  <FaPencil className="manage-icons" onClick={() => handleDialog({ label: "Nouveau mot de passe", id: "newPassword", type: "password" })} />
                </div>
              </div>
            </article>

            <article>
              <h2>Témoignages</h2>
              <div className="user__testimonies">
                <div className="content__header">
                  <p>Témoignage du {date}</p>
                  <div>
                    <FaPencil className="manage-icons" onClick={handleDialog} />
                    <FaTrashCan className="manage-icons" color="var(--dark-red)" />
                  </div>
                </div>
                <div className="content">
                  <p>{testimonie} Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat ex, eligendi accusamus minus officia voluptatem, explicabo voluptate repellendus aspernatur accusantium amet expedita repellat, aliquid ratione corrupti vel rerum itaque nesciunt.</p>
                </div>
              </div>
            </article>
          </div>

          <Button btnStyle={""} text="Supprimer le compte" btnClick={handleDeleteForm} />
        </div>
        <Dialog>
          {isUpdateAccountForm &&
            <div className="dialog-wrapper">
              <div className="title-wrapper">
                <h2>Mettre à jour</h2>
              </div>
              <form onSubmit={handleSubmit}>
                {input.id === "newPassword" &&
                  <Input label={"Ancien mot de passe"} id={"oldPassword"} type={"password"} value={dialogForms.oldPassword} onChange={(value) => updateForm("oldPassword", value)} />
                }
                <Input label={input.label} id={input.id} type={input.type} value={dialogForms[input.id]} onChange={(value) => updateForm(input.id, value)} />
                <div className="btns-wrapper">
                  <Button btnStyle="" text="Valider" type="submit" />
                  <Button btnStyle={""} text="Annuler" btnClick={handleDialogClose} />
                </div>
              </form>
            </div>
          }
          {isDeleteAccountForm &&
            <div className="dialog-wrapper">
              <div className="title-wrapper">
                <h2>Supprimer</h2>
              </div>
              <p>Êtes vous certain(e) de vouloir <strong>supprimer votre compte</strong> ?</p>
              <p className="text-error">Attention : Cette action est irréversible !</p>
              <div className="btns-wrapper">
                <Button btnStyle={""} text="Confirmer" btnClick={handleConfirmedDeletion} />
                <Button btnStyle={""} text="Annuler" btnClick={handleDialogClose} />
              </div>
            </div>
          }
        </Dialog>
      </section>
    </>
  );
}

export default User;