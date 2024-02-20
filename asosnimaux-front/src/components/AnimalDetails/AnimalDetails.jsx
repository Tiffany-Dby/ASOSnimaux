import "./animalDetails.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneAnimalThunk } from "../../api/animal.api";
import { APP_ROUTES } from "../../constants/route.const";
import { formatDescription } from "../../utils/articleDescription.utils";
import Button from "../Button/Button";
import { FaHeart } from "react-icons/fa6";
import { getUsersFollowIDsThunk } from "../../api/user.api";

const AnimalDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { isAuth, followIDs, selectedAnimalFollow, oneAnimalLoading } = useSelector(state => state.userReducer);
  const { animals } = useSelector(state => state.animalReducer);
  const { one } = animals;

  useEffect(() => {
    if (id) dispatch(getOneAnimalThunk(id))
  }, []);

  useEffect(() => {
    if (isAuth) {
      dispatch(getUsersFollowIDsThunk());
    }
  }, [isAuth]);

  const paragraphs = formatDescription(one.description);

  return (
    <>
      <div className="animal-page">
        <div className="title-wrapper">
          <h1>{one.name}</h1>
        </div>
        <section className="animal-page__wrapper">
          <h2>Profile</h2>
          <p>Bienvenue sur la page de profile de {one.name} !</p>
          <p>Vous y trouverez toutes les informations de cette boule de poils que l'on apprécie tant. Trop mimi, non?</p>
          <article>
            <h3>Photo</h3>
            <div className="animal-page__img">
              <p>{one.name}</p>
              <img crossOrigin="anonymous" src={one.picture_url} alt={one.picture_caption} />
              <FaHeart className="icon heart animal__follow-icon" color={followIDs.includes(one.id) ? "var(--light-red" : "var(--dark-grey)"} onClick={() => { }} role="button" aria-label="Bouton d'ajout/retrait des favoris" />
            </div>
          </article>
          <article className="animal-page__profile">
            <h3>Fiche détaillée</h3>
            <table>
              <tbody>
                <tr>
                  <th>Âge</th>
                  <td>{one.age} an{one.age > 1 && 's'}</td>
                </tr>
                <tr>
                  <th>Anniversaire</th>
                  <td></td>
                </tr>
                <tr>
                  <th>Sexe</th>
                  <td>{one.sex}</td>
                </tr>
                <tr>
                  <th>Espèce</th>
                  <td>{one.species}</td>
                </tr>
                <tr>
                  <th>Race</th>
                  <td>{one.race}</td>
                </tr>
                <tr>
                  <th>Au refuge depuis</th>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <div className="animal-page__description">
              <p className="animal-page__description__header">Présentation</p>
              <div className="animal-page__description__text">
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            <Button btnStyle={""} text="Rencontrer" disabled={one.status === "adopté"} btnClick={() => { }} />
          </article>
        </section>
      </div>
    </>
  );
}

export default AnimalDetails;