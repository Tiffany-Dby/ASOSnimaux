import "./admin.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";
import InputFile from "../InputFile/InputFile";
import Dialog from "../Dialog/Dialog";
import Toast from '../Toast/Toast.jsx';
import InputSelect from "../InputSelect/InputSelect.jsx";
import { FaPencil, FaTrashCan, FaMars, FaVenus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { deleteArticleThunk, getAllArticlesThunk, postArticleThunk, updateArticleThunk } from "../../api/article.api";
import { resetFormNewArticle, setSelectedArticle, updateFormNewArticle, updateFormSelectedArticle } from "../../redux/reducers/article.reducer";
import { useEffect, useRef, useState } from "react";
import { setToLocalDate } from "../../utils/date.utils";
import { closeDialog, setIsDeleteAnimalForm, setIsDeleteArticleForm, setIsDeleteUserBySuperAdminForm, setIsNewAnimalForm, setIsNewArticleForm, setIsUpdateAnimalForm, setIsUpdateArticleForm } from "../../redux/reducers/dialog.reducer";
import { NavLink, Outlet } from "react-router-dom";
import { APP_ROUTES } from "../../constants/route.const";
import { deleteAnimalThunk, getAllAnimalsThunk, postNewAnimalThunk, updateAnimalThunk } from "../../api/animal.api.js";
import { resetFormNewAnimal, setNewAnimalError, setSelectedAnimal, updateFormNewAnimal, updateFormSelectedAnimal } from "../../redux/reducers/animal.reducer.js";
import { deleteUserThunk, getAllUsersThunk, updateUserRoleThunk } from "../../api/user.api.js";
import { setSelectedUser, updateFormSelectedUser } from "../../redux/reducers/user.reducer.js";

const Admin = () => {
  const dispatch = useDispatch();

  const { isToastOpen } = useSelector(state => state.toastReducer);
  const { user, selectedUser, selectedUserSuccess, deleteUserSuccess } = useSelector(state => state.userReducer);
  const { isNewArticleForm, isDeleteArticleForm, isUpdateArticleForm, isNewAnimalForm, isUpdateAnimalForm, isDeleteAnimalForm, isDeleteUserBySuperAdminForm, isUpdateUserRoleBySuperAdminForm } = useSelector(state => state.dialogReducer);
  const { articles, newArticleSuccess, selectedSuccess, deleteSuccess } = useSelector(state => state.articleReducer);
  const { newArticle, selectedArticle } = articles;
  const { animals, allAnimalsLoading, allAnimalsError, newAnimalLoading, newAnimalError, newAnimalSuccess, selectedAnimalLoading, selectedAnimalError, selectedAnimalSuccess, deleteAnimalSuccess } = useSelector(state => state.animalReducer);

  const inputFileRef = useRef(null);
  const [file, setFile] = useState(null);

  const animalOptions = {
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

  const userOptions = [
    { label: "membre", value: "membre" },
    { label: "admin", value: "admin" },
    { label: "super_admin", value: "super_admin" }
  ]

  const checkActiveLink = ({ isActive }) => {
    return isActive ? 'active' : '';
  }

  useEffect(() => {
    dispatch(getAllArticlesThunk());
    dispatch(getAllAnimalsThunk());
    dispatch(getAllUsersThunk());
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

  const handleSubmitSelectedAnimal = e => {
    e.preventDefault();

    if (!animals.selectedAnimal.sex || !animals.selectedAnimal.status || !animals.selectedAnimal.species) {
      dispatch(selectedAnimalError({ error: "Veuillez choisir toutes les options" }))
      return;
    }

    dispatch(updateAnimalThunk());
    dispatch(closeDialog());
  }

  const handleSubmitNewAnimal = e => {
    e.preventDefault();

    if (!animals.newAnimal.sex || !animals.newAnimal.status || !animals.newAnimal.species) {
      dispatch(setNewAnimalError({ error: "Veuillez choisir toutes les options" }))
      return;
    }

    dispatch(postNewAnimalThunk(file));
    setFile(null);
    if (inputFileRef.current) inputFileRef.current.value = null;
    dispatch(closeDialog());
  }

  const handleUpdateRoleSubmit = e => {
    e.preventDefault();
    dispatch(updateUserRoleThunk());
    dispatch(closeDialog());
  }

  const updateFormNew = (input, value) => dispatch(updateFormNewArticle({ input, value }));

  const updateFormSelected = (input, value) => dispatch(updateFormSelectedArticle({ input, value }));

  const updateNewAnimalFrom = (input, value) => dispatch(updateFormNewAnimal({ input, value }));

  const updateSelectedAnimalForm = (input, value) => dispatch(updateFormSelectedAnimal({ input, value }));

  const updateFormUserSelected = (input, value) => dispatch(updateFormSelectedUser({ input, value }));


  const handleConfirmedDeletion = () => {
    dispatch(deleteArticleThunk(selectedArticle.id));
    dispatch(closeDialog());
  }

  const handleConfirmedAnimalDeletion = () => {
    dispatch(deleteAnimalThunk(animals.selectedAnimal.id));
    dispatch(closeDialog());
  }

  const handleConfirmedUserDeletion = () => {
    dispatch(deleteUserThunk(selectedUser.id));
    dispatch(closeDialog());
  }

  const handleConfirmedDeleteClick = () => {
    if (isDeleteArticleForm) {
      handleConfirmedDeletion();
    }
    if (isDeleteAnimalForm) {
      handleConfirmedAnimalDeletion();
    }
    if (isDeleteUserBySuperAdminForm) {
      handleConfirmedUserDeletion();
    }
  }

  const handleCancel = () => {
    dispatch(closeDialog());
    dispatch(resetFormNewArticle());
    dispatch(resetFormNewAnimal());
    dispatch(setNewAnimalError({ error: null }));
    dispatch(setSelectedUser({ id: "", username: "", role: "" }));
  }

  return (
    <>
      <div className="admin">
        {isToastOpen &&
          <Toast message={newArticleSuccess || selectedSuccess || deleteSuccess || newAnimalSuccess || selectedAnimalSuccess || deleteAnimalSuccess || selectedUserSuccess || deleteUserSuccess} />
        }
        <div className="title-wrapper">
          <h1>Administrateur</h1>
        </div>

        <nav className="admin__nav">
          <ul className="admin__nav__links">
            <li className="admin__nav__link">
              <NavLink className={checkActiveLink} to={`${APP_ROUTES.ADMIN}/articles`}>Articles</NavLink>
            </li>
            <li className="admin__nav__link">
              <NavLink className={checkActiveLink} to={`${APP_ROUTES.ADMIN}/animals`}>Animaux</NavLink>
            </li>
            <li className="admin__nav__link">
              <NavLink className={checkActiveLink} to={`${APP_ROUTES.ADMIN}/testimonies`}>Témoignages</NavLink>
            </li>
            {user.role === 'super_admin' &&
              <li className="admin__nav__link">
                <NavLink className={checkActiveLink} to={`${APP_ROUTES.ADMIN}/users`}>Utilisateurs</NavLink>
              </li>
            }
          </ul>
        </nav>
        <Outlet />
        <Dialog>
          {isUpdateUserRoleBySuperAdminForm &&
            <>
              <div className="dialog-wrapper user__update">
                <div className="title-wrapper">
                  <h2>Mettre à jour le rôle</h2>
                </div>
                <form onSubmit={handleUpdateRoleSubmit}>
                  <InputSelect id="role" label="Choisissez un nouveau rôle" options={userOptions} value={selectedUser.role} onChange={(value) => updateFormUserSelected("role", value)} />
                  <div className="btns-wrapper">
                    <Button btnStyle={""} text="Confirmer" type="submit" />
                    <Button btnStyle={""} text="Annuler" btnClick={handleCancel} />
                  </div>
                </form>
              </div>
            </>
          }
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
                {newAnimalError &&
                  <p className="text-error">{newAnimalError}</p>
                }
                <InputSelect
                  id="sex"
                  label="Sexe de l'animal"
                  inputStyle={newAnimalError && !animals.newAnimal.sex ? "input--error" : ""}
                  options={animalOptions.sex}
                  value={animals.newAnimal.sex}
                  onChange={(value) => updateNewAnimalFrom("sex", value)} />
                <InputSelect
                  id="status"
                  label="Etat de l'adoption"
                  inputStyle={newAnimalError && !animals.newAnimal.status ? "input--error" : ""}
                  options={animalOptions.status}
                  value={animals.newAnimal.status}
                  onChange={(value) => updateNewAnimalFrom("status", value)} />
                <InputSelect
                  id="species"
                  label="Espèce"
                  inputStyle={newAnimalError && !animals.newAnimal.species ? "input--error" : ""}
                  options={animalOptions.species}
                  value={animals.newAnimal.species}
                  onChange={(value) => updateNewAnimalFrom("species", value)} />
                <Input
                  label="Race"
                  id="race"
                  required={true}
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
          {isUpdateAnimalForm &&
            <div className="dialog-wrapper admin__update-animal">
              <div className="title-wrapper">
                <h2>Mettre à jour un animal</h2>
              </div>
              <form onSubmit={handleSubmitSelectedAnimal}>
                <Input
                  label="Nom"
                  id="name"
                  required={true}
                  value={animals.selectedAnimal.name}
                  onChange={value => updateSelectedAnimalForm("name", value)} />
                <Input
                  label="Âge"
                  type="number"
                  id="age"
                  required={true}
                  value={animals.selectedAnimal.age}
                  onChange={value => updateSelectedAnimalForm("age", value)} />
                {selectedAnimalError &&
                  <p className="text-error">{selectedAnimalError}</p>
                }
                <InputSelect
                  id="sex"
                  label="Sexe de l'animal"
                  inputStyle={selectedAnimalError && !animals.selectedAnimal.sex ? "input--error" : ""}
                  options={animalOptions.sex}
                  value={animals.selectedAnimal.sex}
                  onChange={(value) => updateSelectedAnimalForm("sex", value)} />
                <InputSelect
                  id="status"
                  label="Etat de l'adoption"
                  inputStyle={selectedAnimalError && !animals.selectedAnimal.status ? "input--error" : ""}
                  options={animalOptions.status}
                  value={animals.selectedAnimal.status}
                  onChange={(value) => updateSelectedAnimalForm("status", value)} />
                <InputSelect
                  id="species"
                  label="Espèce"
                  inputStyle={selectedAnimalError && !animals.selectedAnimal.species ? "input--error" : ""}
                  options={animalOptions.species}
                  value={animals.selectedAnimal.species}
                  onChange={(value) => updateSelectedAnimalForm("species", value)} />
                <Input
                  label="Race"
                  id="race"
                  required={true}
                  value={animals.selectedAnimal.race}
                  onChange={value => updateSelectedAnimalForm("race", value)} />
                <div className="input__wrapper">
                  <label className="input__label" htmlFor="description">Présentation</label>
                  <textarea
                    className="input"
                    name="description"
                    id="description"
                    required={true}
                    value={animals.selectedAnimal.description || ""}
                    onChange={e => updateSelectedAnimalForm("description", e.target.value)}></textarea>
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
          {(isDeleteArticleForm || isDeleteAnimalForm || isDeleteUserBySuperAdminForm) &&
            <div className="dialog-wrapper confirm-deletion">
              <div className="title-wrapper">
                <h2>Supprimer</h2>
              </div>
              <p>Voulez-vous vraiment supprimer cet {isDeleteArticleForm && 'article'}{isDeleteAnimalForm && 'animal'}{isDeleteUserBySuperAdminForm && 'utilisateur'} ?</p>
              <div className="btns-wrapper">
                <Button btnStyle={""} text="Confirmer" btnClick={handleConfirmedDeleteClick} />
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