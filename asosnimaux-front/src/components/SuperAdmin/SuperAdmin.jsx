import { Link } from "react-router-dom";
import "./superadmin.scss";
import { APP_ROUTES } from "../../constants/route.const";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import Dialog from "../Dialog/Dialog";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThunk } from "../../api/user.api";

const SuperAdmin = () => {
  const dispatch = useDispatch();

  const { allUsers } = useSelector(state => state.userReducer);

  useEffect(() => {
    dispatch(getAllUsersThunk());
    console.log(allUsers)
  }, []);

  const handleUpdateForm = () => {

  }

  const handleDeleteForm = () => {

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

                  <FaTrashCan className="manage-icons admin__user__icon" color="var(--dark-red)" onClick={handleDeleteForm()} />
                </span>
              </article>
            ))}
          </div>
          <Dialog>

          </Dialog>
        </section>
      </div>
    </>
  );
}

export default SuperAdmin;