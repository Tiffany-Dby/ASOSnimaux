import "./admin.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";
import InputFile from "../InputFile/InputFile";
import Dialog from "../Dialog/Dialog";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { deleteArticleThunk, getAllArticlesThunk, postArticleThunk } from "../../api/article.api";
import { resetFormNewArticle, updateFormNewArticle } from "../../redux/reducers/article.reducer";
import { useEffect, useRef, useState } from "react";
import { setToLocalDate } from "../../utils/date.utils";
import { closeDialog, setIsDeleteForm, setIsNewForm, toggleDialog } from "../../redux/reducers/dialog.reducer";

const Admin = () => {
  const dispatch = useDispatch();

  const { isNewForm, isDeleteForm, isUpdateForm } = useSelector(state => state.dialogReducer);
  const { articles, newArticleLoading, newArticleError } = useSelector(state => state.articleReducer);
  const { newArticle, all } = articles;

  const inputFileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [articleId, setArticleId] = useState(null);

  useEffect(() => {
    dispatch(getAllArticlesThunk());
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(postArticleThunk(file));
    setFile(null);
    if (inputFileRef.current) inputFileRef.current.value = null;
    dispatch(closeDialog());
  }

  const updateForm = (input, value) => dispatch(updateFormNewArticle({ input, value }));

  const handleNewForm = () => {
    dispatch(setIsNewForm());
  }

  const handleDeleteForm = (id) => {
    dispatch(setIsDeleteForm());
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

        <section className="admin__all-articles">
          <Button btnStyle={""} text={"Créer un nouvel article"} btnClick={handleNewForm} />

          <h2>Tous les articles ({all.length})</h2>

          <div className="admin__all-articles__wrapper">
            {all.map((a) => (
              <article key={a.id} className="admin__article">
                <div className="admin__article__content">
                  <div className="admin__article__title">
                    <h3>{a.name}</h3>
                  </div>
                  <div className="admin__article__date">
                    <p>{setToLocalDate(a.date)}</p>
                  </div>
                </div>
                <div className="icons-wrapper">
                  <FaPencil className="manage-icons" />
                  <FaTrashCan className="manage-icons" color="var(--dark-red)" onClick={() => handleDeleteForm(a.id)} />
                </div>
              </article>
            ))}
          </div>

          <Dialog>
            {isDeleteForm && <div className="dialog-wrapper">
              <div className="title-wrapper">
                <h2>Supprimer</h2>
              </div>
              <p>Voulez-vous vraiment supprimer cet article ?</p>
              <div className="btns-wrapper">
                <Button btnStyle={""} text="Confirmer" btnClick={handleConfirmedDeletion} />
                <Button btnStyle={""} text="Annuler" btnClick={handleCancel} />
              </div>
            </div>}

            {isNewForm &&
              <div className="dialog-wrapper admin__new-article">
                <div className="title-wrapper">
                  <h2>Nouvel article</h2>
                </div>
                <form onSubmit={handleSubmit}>
                  <Input
                    label="Titre"
                    id="name"
                    required={true}
                    value={newArticle.name}
                    onChange={value => updateForm("name", value)} />
                  <Input
                    label="Localisation"
                    id="location"
                    value={newArticle.location}
                    onChange={value => updateForm("location", value)} />
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
                    onChange={value => updateForm("picture_caption", value)} />
                  <div className="input__wrapper">
                    <label className="input__label" htmlFor="description">Contenu</label>
                    <textarea
                      className="input"
                      name="description"
                      id="description"
                      value={newArticle.description || ""}
                      onChange={e => updateForm("description", e.target.value)}></textarea>
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