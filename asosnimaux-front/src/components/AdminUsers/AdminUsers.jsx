import { useDispatch, useSelector } from "react-redux";
import "./adminUsers.scss";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import { setIsDeleteUserBySuperAdminForm, setIsUpdateUserRoleBySuperAdminForm } from "../../redux/reducers/dialog.reducer";
import { setSelectedUser } from "../../redux/reducers/user.reducer";

const AdminUsers = () => {
  const dispatch = useDispatch();

  const { allUsers, allUsersLoading, allUsersError, deleteUserLoading, deleteUserError, selectedUserLoading, selectedUserError } = useSelector(state => state.userReducer);

  const handleUpdateForm = (user) => {
    dispatch(setIsUpdateUserRoleBySuperAdminForm());
    dispatch(setSelectedUser({ id: user.id, username: user.username, role: user.role }));
  }

  const handleDeleteUserForm = (user) => {
    dispatch(setIsDeleteUserBySuperAdminForm());
    dispatch(setSelectedUser({ id: user.id, username: user.username, role: user.role }));
  }

  return (
    <>
      <section className="admin__wrapper">
        <div className="admin admin__all-users">
          {selectedUserError &&
            <p className="text-error">{selectedUserError}</p>
          }
          {deleteUserError &&
            <p className="text-error">{deleteUserError}</p>
          }
          {allUsersError &&
            <p className="text-error">{allUsersError}</p>
          }
          <div className="admin__header">
            <h2>Tous les utilisateurs ({allUsers.length})</h2>
            {allUsersLoading &&
              <div className="loading">
                <span className="loading__spin"></span>
                <p className="loading__text">Chargement des utilisateurs en cours...</p>
              </div>
            }
          </div>

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
                    <FaPencil className="manage-icons admin__user__icon" color="var(--dark-brown)" onClick={() => handleUpdateForm(user)} role="button" aria-label="Bouton de modification de l'utilisateur" />
                    <FaTrashCan className="manage-icons admin__user__icon" color="var(--dark-red)" onClick={() => handleDeleteUserForm(user)} role="button" aria-label="Bouton de suppression de l'utilisateur" />
                  </span>
                }
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminUsers;