import "./adminAnimals.scss";
import Button from "../Button/Button";
import { FaMars, FaPencil, FaTrashCan, FaVenus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setToLocalDate } from "../../utils/date.utils";
import { setIsDeleteAnimalForm, setIsNewAnimalForm, setIsUpdateAnimalForm } from "../../redux/reducers/dialog.reducer";
import { setSelectedAnimal } from "../../redux/reducers/animal.reducer";

const AdminAnimals = () => {
  const dispatch = useDispatch();

  const { animals, allAnimalsLoading, allAnimalsError, newAnimalLoading, newAnimalError, selectedAnimalLoading, selectedAnimalError, deleteAnimalLoading, deleteAnimalError } = useSelector(state => state.animalReducer);

  const handleNewAnimalForm = () => {
    dispatch(setIsNewAnimalForm());
  }

  const handleUpdateAnimalForm = (animal) => {
    dispatch(setIsUpdateAnimalForm());
    dispatch(setSelectedAnimal({ id: animal.id, age: animal.age, name: animal.name, sex: animal.sex, description: animal.description, race: animal.race, status: animal.status, species: animal.species, exit_date: animal.exit_date }));
  }

  const handleDeleteAnimalForm = (animal) => {
    dispatch(setIsDeleteAnimalForm());
    dispatch(setSelectedAnimal({ id: animal.id }));
  }

  return (
    <>
      <section className="admin__wrapper">
        <div className="admin__all-animals">
          {selectedAnimalError &&
            <p className="text-error">{selectedAnimalError}</p>
          }
          {newAnimalError &&
            <p className="text-error">{newAnimalError}</p>
          }
          {deleteAnimalError &&
            <p className="text-error">{deleteAnimalError}</p>
          }
          {allAnimalsError &&
            <p className="text-error">{allAnimalsError}</p>
          }
          <div className="admin__header">
            <h2>Tous les animaux ({animals.all.length})</h2>
            {newAnimalLoading || allAnimalsLoading ?
              <div className="loading">
                <span className="loading__spin"></span>
                <p className="loading__text">{newAnimalLoading && "Ajout de l'animal"}{allAnimalsLoading && "Chargement des animaux"} en cours...</p>
              </div>
              :
              <Button btnStyle={""} text={"Ajouter un animal"} btnClick={handleNewAnimalForm} />
            }
          </div>
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
                  <FaPencil className="manage-icons" onClick={() => handleUpdateAnimalForm(animal)} role="button" aria-label="Bouton de modification de l'animal" />
                  <FaTrashCan className="manage-icons" color="var(--dark-red)" onClick={() => handleDeleteAnimalForm(animal)} role="button" aria-label="Bouton de suppression de l'animal" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminAnimals;