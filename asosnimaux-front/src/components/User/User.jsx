import "./user.scss";
import Button from "../Button/Button";
import Dialog from "../Dialog/Dialog";
import Input from "../Input/Input";
import Toast from "../Toast/Toast";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { FaAngleRight, FaPencil, FaTrashCan } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { resetDialogForm, setSelectedUser, setUpdatedAvatar, updateDialogForm } from "../../redux/reducers/user.reducer";
import { closeDialog, setInputFields, setIsDeleteAccountForm, setIsDeleteTestimony, setIsUpdateAccountAvatar, setIsUpdateAccountForm, setIsUpdateTestimony } from "../../redux/reducers/dialog.reducer";
import { deleteUserThunk, updateAvatarThunk, updatePasswordThunk, updateUsernameThunk } from "../../api/user.api";
import { AVATAR } from "../../constants/avatar.const";
import { APP_ROUTES } from "../../constants/route.const";
import { deleteTestimonyThunk, getOneUserTestimoniesThunk, updateTestimonyThunk } from "../../api/testimony.api";
import { setToLocalDate } from "../../utils/date.utils";
import { setSelectedTestimony, updateFormSelectedTestimony } from "../../redux/reducers/testimony.reducer";

const User = () => {
  const dispatch = useDispatch();

  // Toast Reducer
  const { isToastOpen } = useSelector(state => state.toastReducer);

  // User Reducer
  const { user, selectedUser, dialogForms, updatedAvatar, updateAvatarSuccess, updateUsernameSuccess, signInSuccess } = useSelector(state => state.userReducer);

  // Testimonies Reducer
  const { testimonies, allByOneUserLoading, allByOneUserError, selectedTestimonyLoading, selectedTestimonySuccess, selectedTestimonyError, deleteTestimonyLoading, deleteTestimonySuccess, deleteTestimonyError } = useSelector(state => state.testimonyReducer);
  const { allByOneUser, selectedTestimony } = testimonies;

  // Dialog Reducer
  const { input, isDeleteAccountForm, isUpdateAccountForm, isUpdateAccountAvatar, isUpdateTestimony, isDeleteTestimony } = useSelector(state => state.dialogReducer);

  // Fetching -> user's testimonies
  useEffect(() => {
    dispatch(getOneUserTestimoniesThunk());
    console.log(allByOneUser)
    console
  }, []);

  // *************** Avatar ***************
  // Constants -> avatar.constant.js -> url = string stored in an array
  const [avatarIndex, setAvatarIndex] = useState(null);

  // Open Dialog
  const handleUpdateAvatarDialog = () => {
    dispatch(setIsUpdateAccountAvatar());
  }

  // Update avatar
  const handleUpdateAvatar = () => {
    dispatch(updateAvatarThunk(updatedAvatar));
    dispatch(closeDialog());
  }
  // *************** End Avatar ***************

  // *************** Submit ***************
  // Update User's infos
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

  // Update Testimony
  const handleSubmitSelectedTestimony = e => {
    e.preventDefault();
    dispatch(updateTestimonyThunk());
    dispatch(closeDialog());
  }

  // Delete User
  const handleConfirmedUserDeletion = () => {
    dispatch(deleteUserThunk(selectedUser.id));
    dispatch(closeDialog());
  }

  // Delete Testimony
  const handleConfirmedTestimonyDeletion = () => {
    dispatch(deleteTestimonyThunk(selectedTestimony.id));
    dispatch(closeDialog());
  }

  // Delete confirmed
  const handleConfirmedDeleteClick = () => {
    // Dialog delete User
    if (isDeleteAccountForm) {
      handleConfirmedUserDeletion();
    }
    if (isDeleteTestimony) {
      handleConfirmedTestimonyDeletion();
    }
  }
  // *************** End Submit ***************

  // *************** Dialog ***************
  // Open appropriate Update Dialog for users informations
  const handleDialog = (input, value) => {
    dispatch(resetDialogForm());
    dispatch(setInputFields({ label: input.label, id: input.id, type: input.type }));
    dispatch(updateDialogForm({ input, value }));
    dispatch(setIsUpdateAccountForm());
  }

  // Open Update Dialog for Testimony
  const handleTestimonyDialog = (testimony) => {
    dispatch(setIsUpdateTestimony());
    dispatch(setSelectedTestimony({ id: testimony.id, content: testimony.content }));
  }

  // Open Delete User Dialog
  const handleDeleteUser = () => {
    dispatch(setIsDeleteAccountForm());
    dispatch(setSelectedUser({ id: user.id }))
  }

  // Open Delete Testimony Dialog
  const handleDeleteTestimony = (testimony) => {
    dispatch(setIsDeleteTestimony());
    dispatch(setSelectedTestimony({ id: testimony.id }))
  }

  // *************** Inputs onChange ***************
  // Update Username - Password - Email
  const updateForm = (input, value) => dispatch(updateDialogForm({ input, value }));

  // Update Testimony
  const updateTestimonyForm = (input, value) => dispatch(updateFormSelectedTestimony({ input, value }));

  // Close Dialog
  const handleCancel = () => {
    setAvatarIndex(null);
    dispatch(setUpdatedAvatar(""))
    dispatch(closeDialog());
  }
  // *************** End Dialog ***************

  return (
    <>
      <div className="user">
        {isToastOpen &&
          <Toast message={updateAvatarSuccess || updateUsernameSuccess || signInSuccess || selectedTestimonySuccess || deleteTestimonySuccess} />
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
          <Button btnStyle={""} text="Supprimer le compte" btnClick={handleDeleteUser} />
        </section>

        <section>
          <div className="user__infos__title">
            <h2>Témoignages ({allByOneUser.length})</h2>
          </div>
          {deleteTestimonyError &&
            <p className="text-error">{deleteTestimonyError}</p>
          }
          {allByOneUserError &&
            <p className="text-error">{allByOneUserError}</p>
          }
          {allByOneUserLoading &&
            <div className="loading">
              <p className="loading__text">Chargement...</p>
              <span className="loading__paws"></span>
            </div>
          }
          <div className="user__testimonies__wrapper">
            {!allByOneUserLoading && allByOneUser.length < 1 &&
              <p>Vous n'avez aucun témoignage.</p>
            }
            {!allByOneUserLoading && allByOneUser.length > 0 &&
              <>
                {allByOneUser.map(testimony => (
                  <article key={testimony.id} className="user__infos">
                    <div>
                      <div className="infos__header">
                        <h3>Témoignage du {setToLocalDate(testimony.date)}</h3>
                      </div>
                      <div className="infos">
                        <p>{testimony.content}</p>
                      </div>
                    </div>
                    {selectedTestimonyLoading || deleteTestimonyLoading ?
                      <div className="loading">
                        <span className="loading__spin"></span>
                        <p className="loading__text">{selectedTestimonyLoading && "Mise à jour"}{deleteTestimonyLoading && "Suppression"} en cours...</p>
                      </div>
                      :
                      <div className="icons-wrapper">
                        <FaPencil className="manage-icons" onClick={() => handleTestimonyDialog(testimony)} role="button" aria-label="Bouton de modification du témoignage" />
                        <FaTrashCan className="manage-icons" onClick={() => handleDeleteTestimony(testimony)} color="var(--dark-red)" role="button" aria-label="Bouton de suppression du témoignage" />
                      </div>
                    }
                  </article>
                ))}
              </>
            }
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
                  <Button btnStyle={""} text="Annuler" btnClick={handleCancel} />
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
                  <Button btnStyle={""} text="Annuler" btnClick={handleCancel} />
                </div>
              </form>
            </div>
          }
          {(isDeleteAccountForm || isDeleteTestimony) &&
            <div className="dialog-wrapper confirm-deletion">
              <div className="title-wrapper">
                <h2>Supprimer</h2>
              </div>
              <p>Êtes vous certain(e) de vouloir <strong>supprimer votre {isDeleteAccountForm && "compte"}{isDeleteTestimony && "témoignage"}</strong> ?</p>
              <p className="text-error">Attention : Cette action est irréversible !</p>
              <div className="btns-wrapper">
                <Button btnStyle={""} text="Confirmer" btnClick={handleConfirmedDeleteClick} />
                <Button btnStyle={""} text="Annuler" btnClick={handleCancel} />
              </div>
            </div>
          }
          {isUpdateTestimony &&
            <div className="dialog-wrapper">
              <div className="title-wrapper">
                <h2>Mettre à jour un témoignage</h2>
              </div>
              <form onSubmit={handleSubmitSelectedTestimony}>
                <div className="input__wrapper">
                  <label className="input__label" htmlFor="content">Contenu</label>
                  <textarea
                    className="input"
                    name="content"
                    id="content"
                    value={selectedTestimony.content || ""}
                    onChange={e => updateTestimonyForm("content", e.target.value)}></textarea>
                </div>
                <div className="btns-wrapper">
                  <Button btnStyle={""} text="Valider" type="submit" />
                  <Button btnStyle={""} text="Annuler" btnClick={handleCancel} />
                </div>
              </form>
            </div>
          }
        </Dialog>
      </div>
    </>
  );
}

export default User;