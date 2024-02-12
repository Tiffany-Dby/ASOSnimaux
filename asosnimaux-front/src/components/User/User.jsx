import "./user.scss";
import Button from "../Button/Button";
import Dialog from "../Dialog/Dialog";
import Input from "../Input/Input";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { resetDialogForm, setUpdatedAvatar, updateDialogForm } from "../../redux/reducers/user.reducer";
import { createPortal } from "react-dom";
import { closeDialog, setInputFields, setIsDeleteAccountForm, setIsUpdateAccountAvatar, setIsUpdateAccountForm, toggleDialog } from "../../redux/reducers/dialog.reducer";
import { deleteUserThunk, updateAvatarThunk, updatePasswordThunk, updateUsernameThunk } from "../../api/user.api";
import { useEffect, useState } from "react";
import { AVATAR } from "../../constants/avatar.const";
import { APP_ROUTES } from "../../constants/route.const";
import Toast from "../Toast/Toast";

const User = ({ date, testimonie }) => {
  const dispatch = useDispatch();

  const { isToastOpen } = useSelector(state => state.toastReducer);
  const { user, dialogForms, updatedAvatar, updateAvatarSuccess, updateUsernameSuccess } = useSelector(state => state.userReducer);
  const { input, isDeleteAccountForm, isUpdateAccountForm, isUpdateAccountAvatar } = useSelector(state => state.dialogReducer);

  const [avatarIndex, setAvatarIndex] = useState(null);

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

  const handleUpdateAvatarDialog = () => {
    dispatch(setIsUpdateAccountAvatar());
  }

  const handleUpdateAvatar = () => {
    dispatch(updateAvatarThunk(updatedAvatar));
    dispatch(closeDialog());
  }

  const handleDeleteForm = () => {
    dispatch(setIsDeleteAccountForm());
  }

  const handleConfirmedDeletion = () => {
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
    setAvatarIndex(null);
    dispatch(setUpdatedAvatar(""))
    dispatch(closeDialog());
  }

  const updateForm = (input, value) => dispatch(updateDialogForm({ input, value }));

  return (
    <>
      <div className="user">
        {isToastOpen &&
          <Toast message={updateAvatarSuccess || updateUsernameSuccess} />
        }
        <div className="title-wrapper">
          <h1>Dashboard</h1>
        </div>
        <div className="user__greetings">
          <h2>Bonjour</h2>
          <div className="title-wrapper">
            <h2>{user.username}</h2>
          </div>
        </div>
        <div className="user__content-wrapper">
          <div className="articles-wrapper">
            <section>
              <h2>Informations de compte</h2>
              <article className="user__avatar">
                <div className="content__header">
                  <h3>Avatar</h3>
                  <FaPencil className="manage-icons" onClick={handleUpdateAvatarDialog} />
                </div>
                <div className="content img">
                  <img crossOrigin="anonymous" src={user.avatar} alt={"Un sticker animal"} />
                </div>
              </article>
              <article className="user__username">
                <div className="content__header">
                  <h3>Pseudo</h3>
                  <FaPencil className="manage-icons" onClick={() => handleDialog({ label: "Pseudo", id: "username", type: "text" })} />
                </div>
                <div className="content">
                  <p>{user.username}</p>
                </div>
              </article>
              <article className="user__email">
                <div className="content__header">
                  <h3>Email</h3>
                  <FaPencil className="manage-icons" onClick={() => handleDialog({ label: "Email", id: "email", type: "email" })} />
                </div>
                <div className="content">
                  <p>{user.email}</p>
                </div>
              </article>
            </section>

            <section>
              <h2>Sécurité</h2>
              <article className="user__password">
                <div className="content__header">
                  <h3>Mot de passe</h3>
                  <FaPencil className="manage-icons" onClick={() => handleDialog({ label: "Nouveau mot de passe", id: "newPassword", type: "password" })} />
                </div>
                <div className="content">
                  <p className="content__password"></p>
                </div>
              </article>
              <Button btnStyle={""} text="Supprimer le compte" btnClick={handleDeleteForm} />
            </section>

            <section>
              <h2>Témoignages (nmbr)</h2>
              <article className="user__testimonies">
                <div className="content__header">
                  <h3>Témoignage du {date}</h3>
                  <div>
                    <FaPencil className="manage-icons" onClick={handleDialog} />
                    <FaTrashCan className="manage-icons" color="var(--dark-red)" />
                  </div>
                </div>
                <div className="content">
                  <p>{testimonie}</p>
                </div>
              </article>
            </section>
          </div>

        </div>
        <Dialog>
          {isUpdateAccountAvatar &&
            <div className="dialog-wrapper">
              <section className="avatar__wrapper">
                <div className="title-wrapper">
                  <h2>Choisir un Avatar</h2>
                </div>
                {AVATAR.URL.map((u, index) => (
                  <article key={index} className={`avatar${avatarIndex === index ? ' selected' : ''}`}>
                    <img crossOrigin="anonymous" src={`${APP_ROUTES.API_URL}${u}`} alt={"Un sticker animal"} onClick={() => { dispatch(setUpdatedAvatar(u)); setAvatarIndex(avatarIndex === index ? null : index) }} />
                  </article>
                ))
                }
                <div className="btns-wrapper">
                  <Button btnStyle="" text="Valider" btnClick={handleUpdateAvatar} />
                  <Button btnStyle={""} text="Annuler" btnClick={handleDialogClose} />
                </div>
              </section>
            </div>
          }
          {isUpdateAccountForm &&
            <div className="dialog-wrapper">
              <div className="title-wrapper">
                <h2>Mettre à jour</h2>
              </div>
              <form onSubmit={handleSubmit}>
                {input.id === "newPassword" &&
                  <>
                    <p className="text-error">Après modification, vous devrez vous reconnecter</p>
                    <Input label={"Ancien mot de passe"} id={"oldPassword"} type={"password"} value={dialogForms.oldPassword} onChange={(value) => updateForm("oldPassword", value)} />
                  </>
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
      </div>
    </>
  );
}

export default User;