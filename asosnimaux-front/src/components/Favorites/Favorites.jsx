import { useDispatch, useSelector } from "react-redux";
import { getUsersFollowIDsThunk, getUsersFollowThunk } from "../../api/user.api";
import "./favorites.scss";
import { useEffect } from "react";
import { APP_ROUTES } from "../../constants/route.const";
import { Link } from "react-router-dom";
import { FaAngleRight, FaCircleInfo } from "react-icons/fa6";
import FavoriteCard from "../FavoriteCard/FavoriteCard";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { getOneAnimalThunk } from "../../api/animal.api";

const Favorites = () => {
  const dispatch = useDispatch();

  const { animals } = useSelector(state => state.animalReducer);
  const { isAuth, followIDs, selectedAnimalFollow, followedAnimals } = useSelector(state => state.userReducer);
  const { all } = animals;

  useEffect(() => {
    if (isAuth) {
      dispatch(getUsersFollowIDsThunk());
      dispatch(getUsersFollowThunk());
    }
  }, [isAuth]);

  const handleOneAnimalClick = (animal) => {
    dispatch(getOneAnimalThunk(animal.id));
    console.log("click")
  }

  return (
    <>
      <div className="favorites__page">
        <div className="title-wrapper">
          <h1>Favoris</h1>
        </div>
        <Breadcrumbs>
          <li className="breadcrumbs__link">
            <Link to={APP_ROUTES.HOME} >
              Accueil
            </Link>
            <FaAngleRight className="breadcrumbs__icon" />
          </li>
          <li className="breadcrumbs__link">
            <p>Favoris</p>
          </li>
        </Breadcrumbs>
        <section className="favorites">
          <div className="favorites__header">
            {!isAuth &&
              <div className="notAuth">
                <FaCircleInfo className="icon" color={"var(--dark-red)"} />
                <p>La liste actuelle est <strong>temporaire</strong>, pour garantir la récupération de celle-ci à votre prochaine visite, <Link to={APP_ROUTES.SIGN_IN}>connectez-vous</Link>.</p>
              </div>
            }
            <h2>Animaux coups coeur</h2>
            {followedAnimals.length > 0 ?
              <p>Vous suivez actuellement {followedAnimals.length} {followedAnimals.length === 1 && "animal"}{followedAnimals.length > 1 && "animaux"} !</p>
              :
              <p>Vous n'avez aucun favoris.</p>
            }
          </div>
          {followedAnimals.length > 0 &&
            <div className="favorites__wrapper">
              {followedAnimals.map(animal => (
                <FavoriteCard
                  key={animal.id}
                  animalName={animal.name}
                  imgUrl={`${APP_ROUTES.API_URL}${animal.picture_url}`}
                  imgAlt={animal.picture_caption}
                  description={animal.truncated_description}
                  status={animal.status}
                  animalSex={animal.sex}
                  linkRedirect={`${APP_ROUTES.ADOPTION}/${animal.id}`}
                  linkClick={() => handleOneAnimalClick(animal)}
                />
              ))}
            </div>
          }
        </section>
      </div>
    </>
  );
}

export default Favorites