import "./animalDetails.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getOneAnimalThunk } from "../../api/animal.api";
import { APP_ROUTES } from "../../constants/route.const";
import { formatDescription } from "../../utils/articleDescription.utils";
import Button from "../Button/Button";
import { FaAngleRight, FaHeart } from "react-icons/fa6";
import { getUsersFollowIDsThunk } from "../../api/user.api";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

const AnimalDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { isAuth, followIDs, selectedAnimalFollow, oneAnimalLoading } = useSelector(state => state.userReducer);
  const { animals } = useSelector(state => state.animalReducer);
  const { one } = animals;

  useEffect(() => {
    if (id) dispatch(getOneAnimalThunk(id))
    console.log(one)
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
          <h1>Profil</h1>
        </div>
        <Breadcrumbs>
          <li className="breadcrumbs__link">
            <Link to={APP_ROUTES.HOME} >
              Accueil
            </Link>
            <FaAngleRight className="breadcrumbs__icon" />
          </li>
          <li className="breadcrumbs__link">
            <Link to={APP_ROUTES.ADOPTION} >
              Adoption
            </Link>
            <FaAngleRight className="breadcrumbs__icon" />
          </li>
          <li className="breadcrumbs__link">
            <p>Profil : {one.name}</p>
          </li>
        </Breadcrumbs>
        <article className="animal-page__profile">
          <div className="animal-page__profile__wrapper">
            <div className="title-wrapper">
              <h2>Fiche de {one.name}</h2>
            </div>
            <div className="animal-page__profile__img">
              <img crossOrigin="anonymous" src={one.picture_url} alt={one.picture_caption} />
              <FaHeart className="icon heart animal__follow-icon" color={followIDs.includes(one.id) ? "var(--light-red" : "var(--dark-grey)"} onClick={() => { }} role="button" aria-label="Bouton d'ajout/retrait des favoris" />
            </div>
            <div className="animal-page__profile__table">
              <table>
                <tbody>
                  <tr>
                    <th>Anniversaire</th>
                    <td>07/07/2015</td>
                  </tr>
                  <tr>
                    <th>Âge</th>
                    <td>{one.age} an{one.age > 1 ? "s" : ""}</td>
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
                    <th>Etat</th>
                    <td>{one.status}</td>
                  </tr>
                  <tr>
                    <th>Au refuge depuis</th>
                    <td>{one.time_spent} jour{one.time_spent > 1 ? "s" : ""}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <section className="animal-page__profile__description">
              <h3>Présentation</h3>
              <div className="animal-page__profile__description__text">
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              {one.status === "adopté" || one.status === "réservé" ?
                <Button btnStyle={" available--not"} text="Indisponible" disabled={true} />
                :
                <Button btnStyle={" available"} text="Rencontrer" btnClick={() => { }} />
              }
            </section>
          </div>
        </article>

      </div>

    </>
  );
}

export default AnimalDetails;