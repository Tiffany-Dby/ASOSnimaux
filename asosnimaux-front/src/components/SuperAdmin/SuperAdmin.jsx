import { Link } from "react-router-dom";
import "./superadmin.scss";
import { APP_ROUTES } from "../../constants/route.const";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import Dialog from "../Dialog/Dialog";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserThunk, getAllUsersThunk, updateUserRoleThunk } from "../../api/user.api";
import Button from "../Button/Button";
import { closeDialog, setIsDeleteUserBySuperAdminForm, setIsUpdateUserRoleBySuperAdminForm } from "../../redux/reducers/dialog.reducer";
import InputSelect from "../InputSelect/InputSelect";
import { setSelectedUser, updateFormSelectedUser } from "../../redux/reducers/user.reducer";
import Toast from "../Toast/Toast";

const SuperAdmin = () => {
  const dispatch = useDispatch();

  const { isToastOpen } = useSelector(state => state.toastReducer);
  const { allUsers, allUsersLoading, allUsersError, deleteUserLoading, deleteUserError, selectedUser, selectedUserLoading, selectedUserError, selectedUserSuccess, deleteUserSuccess } = useSelector(state => state.userReducer);
  const { isDeleteUserBySuperAdminForm, isUpdateUserRoleBySuperAdminForm } = useSelector(state => state.dialogReducer);

  const options = [
    { label: "membre", value: "membre" },
    { label: "admin", value: "admin" },
    { label: "super_admin", value: "super_admin" }
  ]

  const updateFormSelected = (input, value) => dispatch(updateFormSelectedUser({ input, value }));

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, []);

  const handleUpdateSubmit = e => {
    e.preventDefault();
    dispatch(updateUserRoleThunk());
    dispatch(closeDialog());
  }

  const handleUpdateForm = (user) => {
    dispatch(setIsUpdateUserRoleBySuperAdminForm());
    dispatch(setSelectedUser({ id: user.id, username: user.username, role: user.role }));
  }

  const handleDeleteForm = (user) => {
    dispatch(setIsDeleteUserBySuperAdminForm());
    dispatch(setSelectedUser({ id: user.id, username: user.username, role: user.role }));
  }

  const handleConfirmedDeletion = () => {
    dispatch(deleteUserThunk(selectedUser.id));
    dispatch(closeDialog());
  }

  const handleCancel = () => {
    dispatch(setSelectedUser({ id: "", username: "", role: "" }));
    dispatch(closeDialog());
  }

  return (
    <>
      <div className="admin">
        {isToastOpen &&
          <Toast message={selectedUserSuccess || deleteUserSuccess} />
        }
        <div className="title-wrapper">
          <h1>Page administrateur</h1>
        </div>

        <div className="btn-wrapper">
          <Link className="btn" to={APP_ROUTES.ADMIN}>Gérer les Articles</Link>
        </div>

        <section className="admin admin__all-users">
          <h2>Tous les utilisateurs ({allUsers.length})</h2>
          {selectedUserError &&
            <p className="text-error">{selectedUserError}</p>
          }
          {deleteUserError &&
            <p className="text-error">{deleteUserError}</p>
          }
          {allUsersError &&
            <p className="text-error">{allUsersError}</p>
          }
          {allUsersLoading &&
            <div className="loading">
              <span className="loading__spin"></span>
              <p className="loading__text">Chargement des utilisateurs en cours...</p>
            </div>
          }

          <div className="admin__all-users__wrapper">
            {allUsers.map((user) => (
              <article key={user.id} className="admin__user">
                <div className="admin__user__content">
                  <h3 className="admin__user__username">{user.username}</h3>
                  <span className="admin__user__username-label">
                    <p>Utilisateur</p>
                  </span>
                  <span className="admin__user__role-label">Rôle</span>
                  <p className="admin__user__role">{user.role}</p>
                </div>
                {deleteUserLoading || selectedUserLoading ?
                  <div className="loading">
                    <span className="loading__spin"></span>
                    <p className="loading__text">{deleteUserLoading && "Suppression"}{selectedUserLoading && "Mise à jour"} de l'utilisateur en cours...</p>
                  </div>
                  :
                  <span className="icons-wrapper">
                    <FaPencil className="manage-icons admin__user__icon" color="var(--dark-brown)" onClick={() => handleUpdateForm(user)} />
                    <FaTrashCan className="manage-icons admin__user__icon" color="var(--dark-red)" onClick={() => handleDeleteForm(user)} />
                  </span>
                }
              </article>
            ))}
          </div>
          <Dialog>
            {isDeleteUserBySuperAdminForm &&
              <div className="dialog-wrapper">
                <div className="title-wrapper">
                  <h2>Supprimer</h2>
                </div>
                <p>Êtes vous certain(e) de vouloir <strong>supprimer cet utilisateur</strong> ?</p>
                <p className="text-error">Attention : Cette action est irréversible !</p>
                <div className="btns-wrapper">
                  <Button btnStyle={""} text="Confirmer" btnClick={handleConfirmedDeletion} />
                  <Button btnStyle={""} text="Annuler" btnClick={handleCancel} />
                </div>
              </div>
            }
            {isUpdateUserRoleBySuperAdminForm &&
              <>
                <div className="dialog-wrapper">
                  <div className="title-wrapper">
                    <h2>Mettre à jour le rôle</h2>
                  </div>
                  <form onSubmit={handleUpdateSubmit}>
                    <InputSelect id="role" label="Choisissez un nouveau rôle" options={options} selected={selectedUser.role} onChange={(value) => updateFormSelected("role", value)} />
                    <div className="btns-wrapper">
                      <Button btnStyle={""} text="Confirmer" type="submit" />
                      <Button btnStyle={""} text="Annuler" btnClick={handleCancel} />
                    </div>
                  </form>
                </div>
              </>
            }
          </Dialog>
        </section>
      </div>
    </>
  );
}

export default SuperAdmin;