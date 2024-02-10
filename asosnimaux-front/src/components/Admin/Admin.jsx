import "./admin.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";
import InputFile from "../InputFile/InputFile";
import Dialog from "../Dialog/Dialog";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { deleteArticleThunk, getAllArticlesThunk, postArticleThunk, updateArticleThunk } from "../../api/article.api";
import { resetFormNewArticle, setSelectedArticle, updateFormNewArticle, updateFormSelectedArticle } from "../../redux/reducers/article.reducer";
import { useEffect, useRef, useState } from "react";
import { setToLocalDate } from "../../utils/date.utils";
import { closeDialog, setIsDeleteArticleForm, setIsNewArticleForm, setIsUpdateArticleForm } from "../../redux/reducers/dialog.reducer";
import { Link, Route, Routes } from "react-router-dom";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import { APP_ROUTES } from "../../constants/route.const";

const Admin = () => {
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.userReducer);
  const { isNewArticleForm, isDeleteArticleForm, isUpdateArticleForm } = useSelector(state => state.dialogReducer);
  const { articles, newArticleLoading, newArticleError } = useSelector(state => state.articleReducer);
  const { newArticle, all, selectedArticle } = articles;

  const inputFileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [articleId, setArticleId] = useState(null);

  useEffect(() => {
    dispatch(getAllArticlesThunk());
  }, []);

  const handleSubmitNew = e => {
    e.preventDefault();
    dispatch(postArticleThunk(file));
    setFile(null);
    if (inputFileRef.current) inputFileRef.current.value = null;
    dispatch(closeDialog());
  }

  const handleSubmitSelected = e => {
    e.preventDefault();
    dispatch(updateArticleThunk())
    dispatch(closeDialog());
  }

  const updateFormNew = (input, value) => dispatch(updateFormNewArticle({ input, value }));

  const updateFormSelected = (input, value) => dispatch(updateFormSelectedArticle({ input, value }));

  const handleNewForm = () => {
    dispatch(setIsNewArticleForm());
  }

  const handleUpdateForm = (article) => {
    dispatch(setIsUpdateArticleForm());
    dispatch(setSelectedArticle({ id: article.id, name: article.name, location: article.location, description: article.description }))
  }

  const handleDeleteForm = (id) => {
    dispatch(setIsDeleteArticleForm());
    setArticleId(id);
  }

  const handleConfirmedDeletion = () => {
    dispatch(deleteArticleThunk(articleId));
    setArticleId(null);
    dispatch(closeDialog());
  }

  const handleCancel = () => {
    dispatch(closeDialog());
    dispatch(resetFormNewArticle());
    setArticleId(null);
  }

  return (
    <>
      <div className="admin">
        <div className="title-wrapper">
          <h1>Page administrateur</h1>
        </div>
        {user.role === 'super_admin' &&
          <div className="btn-wrapper">
            <Link className="btn" to={`${APP_ROUTES.ADMIN}/users`}>Gérer les Utilisateurs</Link>
          </div>
        }

        <section className="admin admin__all-articles">

          <h2>Tous les articles ({all.length})</h2>
          <Button btnStyle={""} text={"Créer un nouvel article"} btnClick={handleNewForm} />

          <div className="admin__all-articles__wrapper">
            {all.map((a) => (
              <article key={a.id} className="admin__article">
                <div className="admin__article__content">
                  <h3 className="admin__article__title">{a.name}</h3>
                  <span className="admin__article__date">
                    <p>{setToLocalDate(a.date)}</p>
                  </span>
                </div>
                <div className="icons-wrapper">
                  <FaPencil className="manage-icons" onClick={() => handleUpdateForm(a)} />
                  <FaTrashCan className="manage-icons" color="var(--dark-red)" onClick={() => handleDeleteForm(a.id)} />
                </div>
              </article>
            ))}
          </div>

          <Dialog>
            {isNewArticleForm &&
              <div className="dialog-wrapper admin__new-article">
                <div className="title-wrapper">
                  <h2>Nouvel article</h2>
                </div>
                <form onSubmit={handleSubmitNew}>
                  <Input
                    label="Titre"
                    id="name"
                    required={true}
                    value={newArticle.name}
                    onChange={value => updateFormNew("name", value)} />
                  <Input
                    label="Localisation"
                    id="location"
                    value={newArticle.location}
                    onChange={value => updateFormNew("location", value)} />
                  <InputFile
                    label="Choisir une image"
                    id="picture_url"
                    value={newArticle.picture_url}
                    onChange={file => setFile(file)}
                    inputFileRef={inputFileRef} />
                  <Input
                    label="Description de l'image"
                    id="picture_caption"
                    value={newArticle.picture_caption}
                    onChange={value => updateFormNew("picture_caption", value)} />
                  <div className="input__wrapper">
                    <label className="input__label" htmlFor="description">Contenu</label>
                    <textarea
                      className="input"
                      name="description"
                      id="description"
                      value={newArticle.description || ""}
                      onChange={e => updateFormNew("description", e.target.value)}></textarea>
                  </div>
                  <div className="btns-wrapper">
                    <Button btnStyle="" text="Valider" type="submit" />
                    <Button btnStyle={""} text="Annuler" btnClick={handleCancel} />
                  </div>
                </form>
              </div>
            }
            {isDeleteArticleForm &&
              <div className="dialog-wrapper">
                <div className="title-wrapper">
                  <h2>Supprimer</h2>
                </div>
                <p>Voulez-vous vraiment supprimer cet article ?</p>
                <div className="btns-wrapper">
                  <Button btnStyle={""} text="Confirmer" btnClick={handleConfirmedDeletion} />
                  <Button btnStyle={""} text="Annuler" btnClick={handleCancel} />
                </div>
              </div>
            }
            {isUpdateArticleForm &&
              <div className="dialog-wrapper admin__update-article">
                <div className="title-wrapper">
                  <h2>Mettre à jour</h2>
                </div>
                <form onSubmit={handleSubmitSelected}>
                  <Input
                    label="Titre"
                    id="name"
                    required={true}
                    value={selectedArticle.name}
                    onChange={value => updateFormSelected("name", value)} />
                  <Input
                    label="Localisation"
                    id="location"
                    value={selectedArticle.location}
                    onChange={value => updateFormSelected("location", value)} />
                  <div className="input__wrapper">
                    <label className="input__label" htmlFor="description">Contenu</label>
                    <textarea
                      className="input"
                      name="description"
                      id="description"
                      value={selectedArticle.description || ""}
                      onChange={e => updateFormSelected("description", e.target.value)}></textarea>
                  </div>
                  <div className="btns-wrapper">
                    <Button btnStyle="" text="Valider" type="submit" />
                    <Button btnStyle={""} text="Annuler" btnClick={handleCancel} />
                  </div>
                </form>
              </div>
            }
          </Dialog>
        </section>
      </div>
    </>
  );
}

export default Admin;