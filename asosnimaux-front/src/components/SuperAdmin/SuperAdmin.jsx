import { Link } from "react-router-dom";
import "./superadmin.scss";
import { APP_ROUTES } from "../../constants/route.const";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import Dialog from "../Dialog/Dialog";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserThunk, getAllUsersThunk } from "../../api/user.api";
import Button from "../Button/Button";
import { closeDialog, setIsDeleteUserBySuperAdminForm } from "../../redux/reducers/dialog.reducer";

const SuperAdmin = () => {
  const dispatch = useDispatch();

  const { allUsers } = useSelector(state => state.userReducer);
  const { isDeleteUserBySuperAdminForm, isUpdateUserRoleBySuperAdminForm } = useSelector(state => state.dialogReducer);

  const [userID, setUserID] = useState(null);

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, []);

  const handleUpdateForm = () => {

  }

  const handleDeleteForm = (id) => {
    dispatch(setIsDeleteUserBySuperAdminForm());
    setUserID(id)
  }

  const handleConfirmedDeletion = () => {
    dispatch(deleteUserThunk(userID));
    setUserID(null)
    dispatch(closeDialog());
  }

  const handleCancel = () => {
    setUserID(null)
    dispatch(closeDialog());
  }

  return (
    <>
      <div className="admin">
        <div className="title-wrapper">
          <h1>Page administrateur</h1>
        </div>
        <div className="btn-wrapper">
          <Link className="btn" to={APP_ROUTES.ADMIN}>Gérer les Articles</Link>
        </div>
        <section className="admin admin__all-users">
          <h2>Tous les utilisateurs ({allUsers.length})</h2>

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
                <span className="icons-wrapper">
                  <FaPencil className="manage-icons admin__user__icon" color="var(--dark-brown)" onClick={() => handleUpdateForm()} />

                  <FaTrashCan className="manage-icons admin__user__icon" color="var(--dark-red)" onClick={() => handleDeleteForm(user.id)} />
                </span>
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
              <></>
            }
          </Dialog>
        </section>
      </div>
    </>
  );
}

export default SuperAdmin;