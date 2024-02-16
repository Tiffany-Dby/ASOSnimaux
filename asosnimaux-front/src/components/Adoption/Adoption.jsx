import "./adoption.scss";
import AnimalCard from "../AnimalCard/AnimalCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAnimalsThunk } from "../../api/animal.api";
import { APP_ROUTES } from "../../constants/route.const";
import { getFromStorage } from "../../utils/storage.utils";
import { getUsersFollowThunk, postUserFollowThunk, unfollowThunk } from "../../api/user.api";
import { setSelectedAnimalFollow } from "../../redux/reducers/user.reducer";

const Adoption = () => {
  const dispatch = useDispatch();

  const { animals } = useSelector(state => state.animalReducer);
  const { isAuth, follow, selectedAnimalFollow } = useSelector(state => state.userReducer);
  const { all } = animals;

  useEffect(() => {
    if (isAuth) {
      dispatch(getUsersFollowThunk());
    }
  }, [isAuth]);

  useEffect(() => {
    dispatch(getAllAnimalsThunk());
  }, []);

  useEffect(() => {
    if (isAuth && follow.includes(selectedAnimalFollow) && selectedAnimalFollow) {
      dispatch(unfollowThunk());
      dispatch(setSelectedAnimalFollow(""));
    }
    if (isAuth && !follow.includes(selectedAnimalFollow) && selectedAnimalFollow) {
      dispatch(postUserFollowThunk());
      dispatch(setSelectedAnimalFollow(""));
    }
  }, [selectedAnimalFollow])

  const handleFollowClick = (animal) => {
    dispatch(setSelectedAnimalFollow(animal.id));
  }

  return (
    <>
      <section className="animals">
        <div className="title-wrapper">
          <h2>Adoption</h2>
        </div>
        <div className="animals__wrapper">
          <p>Vous trouverez ici tous les animaux en attente d'une famille pour les accueillir ! Ils n'attendent que vous pour aimer et être aimé.</p>
          {all.map(animal => (
            <AnimalCard
              key={animal.id}
              animalName={animal.name}
              imgUrl={`${APP_ROUTES.API_URL}${animal.picture_url}`}
              imgAlt={animal.picture_caption}
              animalSex={animal.sex}
              status={animal.status}
              color={follow.includes(animal.id) && "var(--light-red)"}
              followClick={() => handleFollowClick(animal)} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Adoption;