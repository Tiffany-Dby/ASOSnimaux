import Button from "../Button/Button";
import Dialog from "../Dialog/Dialog";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import "./user.scss";
import { useDispatch, useSelector } from "react-redux";
import { resetDialogForm, setisAuth, updateDialogForm } from "../../redux/reducers/user.reducer";
import { createPortal } from "react-dom";
import Input from "../Input/Input";
import { setInputFields, toggleDialog } from "../../redux/reducers/dialog.reducer";
import { getOneUserThunk, updatePasswordThunk, updateUsernameThunk } from "../../api/user.api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/route.const";
import { getFromStorage } from "../../utils/storage.utils";

const User = ({ imgUrl, imgAlt, date, testimonie }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, dialogForms } = useSelector(state => state.userReducer);
  const { input } = useSelector(state => state.dialogReducer);

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
  }

  const handleDialog = (input, value) => {
    dispatch(resetDialogForm());
    dispatch(setInputFields({ label: input.label, id: input.id, type: input.type }));
    dispatch(updateDialogForm({ input, value }));
    dispatch(toggleDialog());
  }

  const handleDialogClose = () => {
    dispatch(toggleDialog());
  }

  const updateForm = (input, value) => dispatch(updateDialogForm({ input, value }));

  // useEffect(() => {
  //   const token = getFromStorage("token");
  //   if (!token) {
  //     dispatch(setisAuth(false));
  //     navigate(APP_ROUTES.SIGN_IN, { replace: true })
  //     console.log(user)
  //   }
  //   else {
  //     dispatch(getOneUserThunk());
  //   }
  // }, []);

  // useEffect(() => {
  //   if (!isAuth) {
  //     console.log(isAuth)
  //     navigate(APP_ROUTES.SIGN_IN, { replace: true })
  //     console.log(user)
  //   }
  // }, [isTokenChecked]);

  useEffect(() => {
    console.log("User", user)
  }, []);

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

          <Button btnStyle={""} text="Supprimer le compte" />
        </div>
        {createPortal(
          <Dialog>
            <form onSubmit={handleSubmit}>
              <div className="title-wrapper">
                <h2>Mettre à jour</h2>
              </div>
              {input.id === "newPassword" &&
                <Input label={"Ancien mot de passe"} id={"oldPassword"} type={"password"} value={dialogForms.oldPassword} onChange={(value) => updateForm("oldPassword", value)} />
              }
              <Input label={input.label} id={input.id} type={input.type} value={dialogForms[input.id]} onChange={(value) => updateForm(input.id, value)} />
              <div className="btns-wrapper">
                <Button btnStyle="" text="Valider" type="submit" btnClick={handleDialogClose} />
                <Button btnStyle={""} text="Annuler" btnClick={handleDialogClose} />
              </div>
            </form>
          </Dialog>
          , document.body)}
      </section>
    </>
  );
}

export default User;