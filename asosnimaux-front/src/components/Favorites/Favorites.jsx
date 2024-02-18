import { useDispatch, useSelector } from "react-redux";
import { getUsersFollowIDsThunk, getUsersFollowThunk } from "../../api/user.api";
import "./favorites.scss";
import { useEffect } from "react";
import { APP_ROUTES } from "../../constants/route.const";
import { Link } from "react-router-dom";
import { FaCircleInfo } from "react-icons/fa6";
import AnimalCard from "../AnimalCard/AnimalCard";

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

  return (
    <>
      <div className="favorites__page">
        <div className="title-wrapper">
          <h1>Favoris</h1>
        </div>
        <section className="favorites">
          <div className="favorites__header">
            {!isAuth &&
              <div className="notAuth">
                <FaCircleInfo className="icon" color={"var(--dark-red)"} />
                <p>La liste actuelle est <strong>temporaire</strong>, pour garantir la récupération de celle-ci à votre prochaine visite <Link to={APP_ROUTES.SIGN_IN}>connectez-vous</Link>.</p>
              </div>
            }
            <h2>Vos animaux coups coeur</h2>
            {followedAnimals ?
              <p>Vous avez actuellement {followedAnimals.length} animaux en favoris !</p>
              :
              <p>Vous n'avez aucun favoris.</p>
            }
          </div>
          <div className="animals__wrapper">
            {followedAnimals?.map(animal => (
              <AnimalCard
                key={animal.id}
                animalName={animal.name}
                imgUrl={`${APP_ROUTES.API_URL}${animal.picture_url}`}
                imgAlt={animal.picture_caption}
                animalSex={animal.sex}
                status={animal.status}
                color={followIDs.includes(animal.id) && "var(--light-red)"}
                followClick={() => { }} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Favorites