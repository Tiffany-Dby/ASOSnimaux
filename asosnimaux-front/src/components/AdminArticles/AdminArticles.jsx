import "./adminArticles.scss";
import Button from "../Button/Button";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setToLocalDate } from "../../utils/date.utils";
import { setIsDeleteArticleForm, setIsNewArticleForm, setIsUpdateArticleForm } from "../../redux/reducers/dialog.reducer";
import { setSelectedArticle } from "../../redux/reducers/article.reducer";

const AdminArticles = () => {
  const dispatch = useDispatch();

  const { articles, allLoading, allError, newArticleLoading, newArticleError, selectedLoading, selectedError, deleteLoading, deleteError } = useSelector(state => state.articleReducer);
  const { all } = articles;

  const handleNewForm = () => {
    dispatch(setIsNewArticleForm());
  }

  const handleUpdateForm = (article) => {
    dispatch(setIsUpdateArticleForm());
    dispatch(setSelectedArticle({ id: article.id, name: article.name, location: article.location, description: article.description }))
  }

  const handleDeleteForm = (article) => {
    dispatch(setIsDeleteArticleForm());
    dispatch(setSelectedArticle({ id: article.id }));
  }

  return (
    <>
      <section className="admin__wrapper">
        <div className="admin__all-articles">
          {selectedError &&
            <p className="text-error">{selectedError}</p>
          }
          {newArticleError &&
            <p className="text-error">{newArticleError}</p>
          }
          {deleteError &&
            <p className="text-error">{deleteError}</p>
          }
          {allError &&
            <p className="text-error">{allError}</p>
          }
          <div className="admin__header">
            <h2>Tous les articles ({all.length})</h2>
            {newArticleLoading || allLoading ?
              <div className="loading">
                <span className="loading__spin"></span>
                <p className="loading__text">{newArticleLoading && "Création de l'article"}{allLoading && "Chargement des articles"} en cours...</p>
              </div>
              :
              <Button btnStyle={""} text={"Créer un nouvel article"} btnClick={handleNewForm} />
            }
          </div>

          <div className="admin__all-articles__wrapper">
            {all.map((a) => (
              <article key={a.id} className="admin__article">
                <div className="admin__article__content">
                  <h3 className="admin__article__title">{a.name}</h3>
                  <span className="admin__article__date">
                    <p>{setToLocalDate(a.date)}</p>
                  </span>
                </div>
                {selectedLoading || deleteLoading ?
                  <div className="loading">
                    <span className="loading__spin"></span>
                    <p className="loading__text">{selectedLoading && "Mise à jour"}{deleteLoading && "Suppression"} en cours...</p>
                  </div>
                  :
                  <div className="icons-wrapper">
                    <FaPencil className="manage-icons" onClick={() => handleUpdateForm(a)} role="button" aria-label="Bouton de modification de l'article" />
                    <FaTrashCan className="manage-icons" color="var(--dark-red)" onClick={() => handleDeleteForm(a)} role="button" aria-label="Bouton de suppression de l'article" />
                  </div>
                }
              </article>
            ))}
          </div>
        </div >
      </section>
    </>
  );
}

export default AdminArticles;