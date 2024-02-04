import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import Input from "../Input/Input";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import "./admin.scss";
import InputFile from "../InputFile/InputFile";
import { useDispatch, useSelector } from "react-redux";
import { deleteArticleThunk, getAllArticlesThunk, postArticleThunk } from "../../api/article.api";
import { updateFormNewArticle } from "../../redux/reducers/article.reducer";
import { useEffect, useState } from "react";
import { setToLocalDate } from "../../utils/date.utils";
import { createPortal } from "react-dom";
import Dialog from "../Dialog/Dialog";
import { toggleDialog } from "../../redux/reducers/dialog.reducer";

const Admin = () => {
  const dispatch = useDispatch();

  const { articles, newArticleLoading, newArticleError } = useSelector(state => state.articleReducer);
  const { newArticle, all } = articles;

  const [file, setFile] = useState(null);
  const [articleId, setArticleId] = useState(null);

  useEffect(() => {
    dispatch(getAllArticlesThunk());
  }, [])

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(postArticleThunk(file));
  }

  const updateForm = (input, value) => dispatch(updateFormNewArticle({ input, value }));

  const handleArticleIdForDeletion = (id) => {
    setArticleId(id)
    dispatch(toggleDialog());
  }

  const handleConfirmedDeletion = () => {
    dispatch(deleteArticleThunk(articleId));
    setArticleId(null);
    dispatch(toggleDialog());
  }

  const handleCancelDeletion = () => {
    dispatch(toggleDialog());
    setArticleId(null);
  }

  return (
    <>
      <div className="admin">
        <div className="title-wrapper">
          <h1>Page administrateur</h1>
        </div>

        <section className="new-article">
          <h2>Nouvel article</h2>

          <form onSubmit={handleSubmit}>
            <Input label="Titre" id="name" required={true} value={newArticle.name} onChange={value => updateForm("name", value)} />
            <Input label="Localisation" id="location" value={newArticle.location} onChange={value => updateForm("location", value)} />
            <InputFile label="Choisir une image" id="picture_url" value={newArticle.picture_url} onChange={file => setFile(file)} />
            <Input label="Description de l'image" id="picture_caption" value={newArticle.picture_caption} onChange={value => updateForm("picture_caption", value)} />
            <div className="input__wrapper">
              <label className="input__label" htmlFor="description">Contenu</label>
              <textarea className="input" name="description" id="description" value={newArticle.description || ""} onChange={e => updateForm("description", e.target.value)}></textarea>
            </div>
            <Button btnStyle="" text="Valider" type="submit" />
          </form>
        </section>

        <section className="all-articles">
          <h2>Tous les articles ({all.length})</h2>

          <div className="articles-overview__wrapper">
            {all.map((a) => (
              <article key={a.id} className="article-overview">
                <div className="article-overview__content">
                  <div className="article-overview__title">
                    <h3>{a.name}</h3>
                  </div>
                  <div className="article-overview__date">
                    <p>{setToLocalDate(a.date)}</p>
                  </div>
                </div>
                <div className="icons-wrapper">
                  <FaPencil className="manage-icons" />
                  <FaTrashCan className="manage-icons" color="var(--dark-red)" onClick={() => handleArticleIdForDeletion(a.id)} />
                </div>
              </article>
            ))}
          </div>
          {createPortal(
            <Dialog>
              <p>Voulez-vous vraiment supprimer cet article ?</p>
              <div className="btns-wrapper">
                <Button btnStyle={""} text="Confirmer" btnClick={handleConfirmedDeletion} />
                <Button btnStyle={""} text="Annuler" btnClick={handleCancelDeletion} />
              </div>
            </Dialog>
            , document.body)}
        </section>
      </div>
    </>
  );
}

export default Admin;