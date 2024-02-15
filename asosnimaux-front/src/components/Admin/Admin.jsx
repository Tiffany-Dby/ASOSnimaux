import "./admin.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";
import InputFile from "../InputFile/InputFile";
import Dialog from "../Dialog/Dialog";
import Toast from '../Toast/Toast.jsx';
import { FaPencil, FaTrashCan, FaMars, FaVenus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { deleteArticleThunk, getAllArticlesThunk, postArticleThunk, updateArticleThunk } from "../../api/article.api";
import { resetFormNewArticle, setSelectedArticle, updateFormNewArticle, updateFormSelectedArticle } from "../../redux/reducers/article.reducer";
import { useEffect, useRef, useState } from "react";
import { setToLocalDate } from "../../utils/date.utils";
import { closeDialog, setIsDeleteArticleForm, setIsNewAnimalForm, setIsNewArticleForm, setIsUpdateArticleForm } from "../../redux/reducers/dialog.reducer";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "../../constants/route.const";
import { getAllAnimalsThunk, postNewAnimalThunk } from "../../api/animal.api.js";
import { resetFormNewAnimal, updateFormNewAnimal } from "../../redux/reducers/animal.reducer.js";
import InputSelect from "../InputSelect/InputSelect.jsx";

const Admin = () => {
  const dispatch = useDispatch();

  const { isToastOpen } = useSelector(state => state.toastReducer);
  const { user } = useSelector(state => state.userReducer);
  const { isNewArticleForm, isDeleteArticleForm, isUpdateArticleForm, isNewAnimalForm } = useSelector(state => state.dialogReducer);
  const { articles, allLoading, allError, newArticleLoading, newArticleError, newArticleSuccess, selectedLoading, selectedError, selectedSuccess, deleteLoading, deleteError, deleteSuccess } = useSelector(state => state.articleReducer);
  const { newArticle, all, selectedArticle } = articles;
  const { animals, allAnimalsLoading, allAnimalsError } = useSelector(state => state.animalReducer);

  const inputFileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [articleId, setArticleId] = useState(null);
  const [articlesView, setArticlesView] = useState(true);

  const options = {
    sex: [
      { label: "Femelle", value: "femelle" },
      { label: "Mâle", value: "mâle" }
    ],
    status: [
      { label: "En attente", value: "en attente" },
      { label: "Adopté", value: "adopté" },
      { label: "Réservé", value: "réservé" },
    ],
    species: [
      { label: "Chien", value: "chien" },
      { label: "Chat", value: "chat" },
    ]
  }

  const handleView = () => {
    setArticlesView(!articlesView);
  }

  useEffect(() => {
    dispatch(getAllArticlesThunk());
    dispatch(getAllAnimalsThunk());
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

  const handleSubmitNewAnimal = e => {
    e.preventDefault();
    dispatch(postNewAnimalThunk(file));
    setFile(null);
    if (inputFileRef.current) inputFileRef.current.value = null;
    dispatch(closeDialog());
  }

  const updateFormNew = (input, value) => dispatch(updateFormNewArticle({ input, value }));

  const updateNewAnimalFrom = (input, value) => dispatch(updateFormNewAnimal({ input, value }));

  const updateFormSelected = (input, value) => dispatch(updateFormSelectedArticle({ input, value }));

  const handleNewForm = () => {
    dispatch(setIsNewArticleForm());
  }

  const handleNewAnimalForm = () => {
    dispatch(setIsNewAnimalForm());
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
    dispatch(resetFormNewAnimal());
    setArticleId(null);
  }

  return (
    <>
      <div className="admin">
        {isToastOpen &&
          <Toast message={newArticleSuccess || selectedSuccess || deleteSuccess} />
        }
        <div className="title-wrapper">
          <h1>Page administrateur</h1>
        </div>
        {user.role === 'super_admin' &&
          <span>
            <Link to={`${APP_ROUTES.ADMIN}/users`}>Page de gestion des utilisateurs</Link>
          </span>
        }

        <Button btnStyle={""} text={articlesView && "Gérer les animaux" || !articlesView && "Gérer les articles"} btnClick={handleView} />
        {!articlesView &&
          <section className="admin__all-animals">
            <h2>Tous les animaux ({animals.all.length})</h2>
            <Button btnStyle={""} text={"Ajouter un animal"} btnClick={handleNewAnimalForm} />
            <div className="admin__all-animals__wrapper">
              {animals.all.map((animal) => (
                <article key={animal.id} className="admin__animal">
                  <h3 className="admin__animal__title">{animal.name}, {animal.age} ans <span>{animal.sex === "mâle" && <FaMars className="manage-icons" />}{animal.sex === "femelle" && <FaVenus className="manage-icons" />}</span></h3>
                  <div className="admin__animal__content">
                    <div className="admin__animal__details">
                      <div className="admin__animal__details__entry">
                        <p>Entrée :</p>
                        <p>{setToLocalDate(animal.entry_date)}</p>
                      </div>
                      <div className="admin__animal__details__exit">
                        <p>Sortie :</p>
                        <p>{animal.exit_date ? setToLocalDate(animal.exit_date) : "Inconnue"}</p>
                      </div>
                    </div>
                    <div className="admin__animal__details">
                      <div className="admin__animal__details__species">
                        <p>Espèce : </p>
                        <p>{animal.species}</p>
                      </div>
                      <div className="admin__animal__details__status">
                        <p>Etat : </p>
                        <p>{animal.status}</p>
                      </div>
                    </div>
                  </div>
                  <div className="icons-wrapper">
                    <FaPencil className="manage-icons" onClick={() => { }} />
                    <FaTrashCan className="manage-icons" color="var(--dark-red)" onClick={() => { }} />
                  </div>
                </article>
              ))}
            </div>
          </section>
        }
        {articlesView &&
          <section className="admin admin__all-articles">

            <h2>Tous les articles ({all.length})</h2>
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
            {newArticleLoading || allLoading ?
              <div className="loading">
                <span className="loading__spin"></span>
                <p className="loading__text">{newArticleLoading && "Création de l'article"}{allLoading && "Chargement des articles"} en cours...</p>
              </div>
              :
              <Button btnStyle={""} text={"Créer un nouvel article"} btnClick={handleNewForm} />
            }

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
                      <FaPencil className="manage-icons" onClick={() => handleUpdateForm(a)} />
                      <FaTrashCan className="manage-icons" color="var(--dark-red)" onClick={() => handleDeleteForm(a.id)} />
                    </div>
                  }
                </article>
              ))}
            </div>

          </section>
        }
        <Dialog>
          {isNewAnimalForm &&
            <div className="dialog-wrapper admin__new-animal">
              <div className="title-wrapper">
                <h2>Ajouter un animal</h2>
              </div>
              <form onSubmit={handleSubmitNewAnimal}>
                <Input
                  label="Nom"
                  id="name"
                  required={true}
                  value={animals.newAnimal.name}
                  onChange={value => updateNewAnimalFrom("name", value)} />
                <Input
                  label="Âge"
                  type="number"
                  id="age"
                  required={true}
                  value={animals.newAnimal.age}
                  onChange={value => updateNewAnimalFrom("age", value)} />
                <InputSelect
                  id="sex"
                  label="Sexe de l'animal"
                  options={options.sex}
                  selected={animals.newAnimal.sex}
                  onChange={(value) => updateNewAnimalFrom("sex", value)} />
                <InputSelect
                  id="status"
                  label="Etat de l'adoption"
                  options={options.status}
                  selected={animals.newAnimal.status}
                  onChange={(value) => updateNewAnimalFrom("status", value)} />
                <InputSelect
                  id="species"
                  label="Espèce"
                  options={options.species}
                  selected={animals.newAnimal.species}
                  onChange={(value) => updateNewAnimalFrom("species", value)} />
                <Input
                  label="Race"
                  id="race"
                  value={animals.newAnimal.race}
                  onChange={value => updateNewAnimalFrom("race", value)} />
                <InputFile
                  label="Choisir une image"
                  id="picture_url"
                  required={true}
                  value={animals.newAnimal.picture_url}
                  onChange={file => setFile(file)}
                  inputFileRef={inputFileRef} />
                <Input
                  label="Description de l'image"
                  id="picture_caption"
                  required={true}
                  value={animals.newAnimal.picture_caption}
                  onChange={value => updateNewAnimalFrom("picture_caption", value)} />
                <div className="input__wrapper">
                  <label className="input__label" htmlFor="description">Présentation</label>
                  <textarea
                    className="input"
                    name="description"
                    id="description"
                    required={true}
                    value={animals.newAnimal.description || ""}
                    onChange={e => updateNewAnimalFrom("description", e.target.value)}></textarea>
                </div>
                <div className="btns-wrapper">
                  <Button btnStyle="" text="Valider" type="submit" />
                  <Button btnStyle={""} text="Annuler" btnClick={handleCancel} />
                </div>
              </form>
            </div>
          }
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
                  required={true}
                  value={newArticle.location}
                  onChange={value => updateFormNew("location", value)} />
                <InputFile
                  label="Choisir une image"
                  id="picture_url"
                  required={true}
                  value={newArticle.picture_url}
                  onChange={file => setFile(file)}
                  inputFileRef={inputFileRef} />
                <Input
                  label="Description de l'image"
                  id="picture_caption"
                  required={true}
                  value={newArticle.picture_caption}
                  onChange={value => updateFormNew("picture_caption", value)} />
                <div className="input__wrapper">
                  <label className="input__label" htmlFor="description">Contenu</label>
                  <textarea
                    className="input"
                    name="description"
                    id="description"
                    required={true}
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
      </div>
    </>
  );
}

export default Admin;