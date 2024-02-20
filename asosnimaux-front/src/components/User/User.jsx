import "./user.scss";
import Button from "../Button/Button";
import Dialog from "../Dialog/Dialog";
import Input from "../Input/Input";
import { FaAngleRight, FaPencil, FaTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { resetDialogForm, setUpdatedAvatar, updateDialogForm } from "../../redux/reducers/user.reducer";
import { createPortal } from "react-dom";
import { closeDialog, setInputFields, setIsDeleteAccountForm, setIsUpdateAccountAvatar, setIsUpdateAccountForm, toggleDialog } from "../../redux/reducers/dialog.reducer";
import { deleteUserThunk, updateAvatarThunk, updatePasswordThunk, updateUsernameThunk } from "../../api/user.api";
import { useEffect, useState } from "react";
import { AVATAR } from "../../constants/avatar.const";
import { APP_ROUTES } from "../../constants/route.const";
import Toast from "../Toast/Toast";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { Link } from "react-router-dom";

const User = ({ date, testimonie }) => {
  const dispatch = useDispatch();

  const { isToastOpen } = useSelector(state => state.toastReducer);
  const { user, dialogForms, updatedAvatar, updateAvatarSuccess, updateUsernameSuccess, signInSuccess } = useSelector(state => state.userReducer);
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
          <Toast message={updateAvatarSuccess || updateUsernameSuccess || signInSuccess} />
        }
        <div className="title-wrapper">
          <h1>Dashboard</h1>
        </div>
        <Breadcrumbs>
          <li className="breadcrumbs__link">
            <Link to={APP_ROUTES.HOME} >
              Accueil
            </Link>
            <FaAngleRight className="breadcrumbs__icon" />
          </li>
          <li className="breadcrumbs__link">
            <p>Dashboard</p>
          </li>
        </Breadcrumbs>
        <section>
          <div className="user__infos__title">
            <h2>Informations de compte</h2>
          </div>
          <div className="user__infos__wrapper">
            <article className="user__infos">
              <div className="infos__header">
                <h3>Avatar</h3>
                <FaPencil className="manage-icons" onClick={handleUpdateAvatarDialog} role="button" aria-label="Bouton de modification d'avatar" />
              </div>
              <div className="infos">
                <div className="infos__img">
                  <img crossOrigin="anonymous" src={user.avatar} alt={"Un sticker animal"} />
                </div>
              </div>
            </article>
            <article className="user__infos">
              <div className="infos__header">
                <h3>Pseudo</h3>
                <FaPencil className="manage-icons" onClick={() => handleDialog({ label: "Pseudo", id: "username", type: "text" })} role="button" aria-label="Bouton de modification du Pseudo" />
              </div>
              <div className="infos">
                <p>{user.username}</p>
              </div>
            </article>
            <article className="user__infos">
              <div className="infos__header">
                <h3>Email</h3>
                <FaPencil className="manage-icons" onClick={() => handleDialog({ label: "Email", id: "email", type: "email" })} role="button" aria-label="Bouton de modification de l'email" />
              </div>
              <div className="infos">
                <p>{user.email}</p>
              </div>
            </article>
            <article className="user__infos">
              <div className="infos__header">
                <h3>Mot de passe</h3>
                <FaPencil className="manage-icons" onClick={() => handleDialog({ label: "Nouveau mot de passe", id: "newPassword", type: "password" })} role="button" aria-label="Bouton de modification du mot de passe" />
              </div>
              <div className="infos">
                <p className="infos__password"></p>
              </div>
            </article>
          </div>
          <Button btnStyle={""} text="Supprimer le compte" btnClick={handleDeleteForm} />
        </section>

        <section>
          <div className="user__infos__title">
            <h2>Témoignages (nmbr)</h2>
          </div>
          <div className="user__testimonies__wrapper">
            <article className="user__infos">
              <div className="infos__header">
                <h3>Témoignage du {date}</h3>
                <div>
                  <FaPencil className="manage-icons" onClick={handleDialog} role="button" aria-label="Bouton de modification du témoignage" />
                  <FaTrashCan className="manage-icons" color="var(--light-red)" role="button" aria-label="Bouton de suppression du témoignage" />
                </div>
              </div>
              <div className="infos">
                <p>{testimonie}</p>
              </div>
            </article>
          </div>
        </section>

        <Dialog>
          {isUpdateAccountAvatar &&
            <div className="dialog-wrapper">
              <div className="title-wrapper">
                <h2>Choisir un Avatar</h2>
              </div>
              <section className="avatars">
                <div className="avatar__wrapper">
                  {AVATAR.URL.map((u, index) => (
                    <div key={index} className={`avatar${avatarIndex === index ? ' selected' : ''}`}>
                      <img crossOrigin="anonymous" src={`${APP_ROUTES.API_URL}${u}`} alt={"Un sticker animal"} onClick={() => { dispatch(setUpdatedAvatar(u)); setAvatarIndex(avatarIndex === index ? null : index) }} />
                    </div>
                  ))
                  }
                </div>
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
              <form className="user__update" onSubmit={handleSubmit}>
                {input.id === "newPassword" &&
                  <Input label={"Ancien mot de passe"} id={"oldPassword"} type={"password"} value={dialogForms.oldPassword} onChange={(value) => updateForm("oldPassword", value)} />
                }
                <Input label={input.label} id={input.id} type={input.type} value={dialogForms[input.id]} onChange={(value) => updateForm(input.id, value)} />
                {input.id === "newPassword" &&
                  <p className="text-error">Après modification, vous devrez vous reconnecter</p>
                }
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