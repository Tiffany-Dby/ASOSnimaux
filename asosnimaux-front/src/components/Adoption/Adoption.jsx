import "./adoption.scss";
import AnimalCard from "../AnimalCard/AnimalCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAnimalsThunk } from "../../api/animal.api";
import { APP_ROUTES } from "../../constants/route.const";
import { getFromStorage } from "../../utils/storage.utils";
import { getUsersFollowIDsThunk, postUserFollowThunk, unfollowThunk } from "../../api/user.api";
import { setSelectedAnimalFollow } from "../../redux/reducers/user.reducer";
import Button from "../Button/Button";
import { FaSliders } from "react-icons/fa6";
import Dialog from "../Dialog/Dialog";
import Filters from "../Filters/Filters";
import { closeDialog, setIsFilters } from "../../redux/reducers/dialog.reducer";
import { updateScroll } from "../../redux/reducers/window.reducer";

const Adoption = () => {
  const dispatch = useDispatch();

  const { scrollY } = useSelector(state => state.windowReducer);
  const { animals } = useSelector(state => state.animalReducer);
  const { isAuth, followIDs, selectedAnimalFollow } = useSelector(state => state.userReducer);
  const { all } = animals;

  const handleScroll = () => dispatch(updateScroll({ scrollY: window.scrollY }));

  useEffect(() => {
    if (isAuth) {
      dispatch(getUsersFollowIDsThunk());
    }
  }, [isAuth]);

  useEffect(() => {
    dispatch(getAllAnimalsThunk());

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    if (isAuth && followIDs.includes(selectedAnimalFollow) && selectedAnimalFollow) {
      dispatch(unfollowThunk());
      dispatch(setSelectedAnimalFollow(""));
    }
    if (isAuth && !followIDs.includes(selectedAnimalFollow) && selectedAnimalFollow) {
      dispatch(postUserFollowThunk());
      dispatch(setSelectedAnimalFollow(""));
    }
  }, [selectedAnimalFollow])

  const handleFollowClick = (animal) => {
    dispatch(setSelectedAnimalFollow(animal.id));
  }

  const handleOpenFilters = () => {
    dispatch(setIsFilters());
  }

  const handleCloseFilters = () => {
    dispatch(closeDialog());
  }

  return (
    <>
      <div className="animals__page">
        <div className="title-wrapper">
          <h1>Adoption</h1>
        </div>
        <section className="animals">
          <div className="animals__header">
            <h2>Les animaux du refuge</h2>
            <p>Vous trouverez ici tous les animaux en attente d'une famille pour les accueillir ! Ils n'attendent que vous pour aimer et être aimé.</p>
          </div>
          <Button
            btnStyle={""}
            text={
              <>
                <FaSliders className="manage-icons" />
                {scrollY < 230 ? "Filtres" : ""}
              </>}
            btnClick={handleOpenFilters} />
          <div className="animals__wrapper">
            {all.map(animal => (
              <AnimalCard
                key={animal.id}
                animalName={animal.name}
                imgUrl={`${APP_ROUTES.API_URL}${animal.picture_url}`}
                imgAlt={animal.picture_caption}
                animalSex={animal.sex}
                status={animal.status}
                color={followIDs.includes(animal.id) && "var(--light-red)"}
                followClick={() => handleFollowClick(animal)} />
            ))}
          </div>
        </section>
        <Dialog>
          <Filters onClick={handleCloseFilters} />
        </Dialog>
      </div>
    </>
  )
}

export default Adoption;