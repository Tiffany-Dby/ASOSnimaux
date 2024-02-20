import "./adoption.scss";
import AnimalCard from "../AnimalCard/AnimalCard";
import Dialog from "../Dialog/Dialog";
import Button from "../Button/Button";
import Filters from "../Filters/Filters";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAnimalsThunk, getOneAnimalThunk } from "../../api/animal.api";
import { APP_ROUTES } from "../../constants/route.const";
import { getAge } from "../../utils/animals.utils";
import { getUsersFollowIDsThunk, postUserFollowThunk, unfollowThunk } from "../../api/user.api";
import { setSelectedAnimalFollow } from "../../redux/reducers/user.reducer";
import { FaAngleRight, FaSliders } from "react-icons/fa6";
import { closeDialog, setIsFilters } from "../../redux/reducers/dialog.reducer";
import { updateScroll } from "../../redux/reducers/window.reducer";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { Link } from "react-router-dom";

const Adoption = () => {
  const dispatch = useDispatch();

  const { scrollY } = useSelector(state => state.windowReducer);
  const { animals } = useSelector(state => state.animalReducer);
  const { isAuth, followIDs, selectedAnimalFollow, allAnimalsLoading } = useSelector(state => state.userReducer);
  const { all } = animals;

  const initialFiltersState = {
    species: ["chat", "chien", "autres"],
    sex: ["femelle", "mâle"],
    age: ["senior", "adulte", "junior"]
  }
  const [filters, setFilters] = useState({ ...initialFiltersState });
  const [filteredAnimals, setFilteredAnimals] = useState([]);

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
    setFilteredAnimals([...all]);
  }, [all]);

  useEffect(() => {
    if (isAuth && followIDs.includes(selectedAnimalFollow) && selectedAnimalFollow) {
      dispatch(unfollowThunk());
      dispatch(setSelectedAnimalFollow(""));
    }
    if (isAuth && !followIDs.includes(selectedAnimalFollow) && selectedAnimalFollow) {
      dispatch(postUserFollowThunk());
      dispatch(setSelectedAnimalFollow(""));
    }
  }, [selectedAnimalFollow]);

  const handleFollowClick = (animal) => {
    dispatch(setSelectedAnimalFollow(animal.id));
  }

  const handleOneAnimalClick = (animal) => {
    dispatch(getOneAnimalThunk(animal.id))
  }

  const handleOpenFilters = () => {
    dispatch(setIsFilters());
  }

  const handleCloseFilters = () => {
    dispatch(closeDialog());
  }

  const handleApplyFilters = (newFilters) => {
    const filtered = all.filter(animal => {
      const speciesFilters = newFilters.species.includes(animal.species);
      const sexFilters = newFilters.sex.includes(animal.sex);
      const ageFilters = (newFilters.age.includes(getAge(animal.age)));

      return speciesFilters && sexFilters && ageFilters;
    });

    setFilters(newFilters);
    setFilteredAnimals(filtered);
  }

  const handleResetFilters = () => {
    setFilters(initialFiltersState);
    setFilteredAnimals([...all]);
  }

  return (
    <>
      <div className="animals__page">
        <div className="title-wrapper">
          <h1>Adoption</h1>
        </div>
        <Breadcrumbs>
          <li className="breadcrumbs__link">
            <Link to={APP_ROUTES.HOME} >
              Accueil
            </Link>
            <FaAngleRight className="breadcrumbs__icon" />
          </li>
          <li className="breadcrumbs__link">
            <p>Adoption</p>
          </li>
        </Breadcrumbs>
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
            {allAnimalsLoading ?
              <div className="loading">
                <span className="loading__paws"></span>
                <p className="loading__text">Chargement en cours...</p>
              </div>
              :
              (
                filteredAnimals.map(animal => (
                  <AnimalCard
                    key={animal.id}
                    animalName={animal.name}
                    imgUrl={`${APP_ROUTES.API_URL}${animal.picture_url}`}
                    imgAlt={animal.picture_caption}
                    animalSex={animal.sex}
                    status={animal.status}
                    color={followIDs.includes(animal.id) && "var(--light-red)"}
                    followClick={() => handleFollowClick(animal)}
                    linkRedirect={`${APP_ROUTES.ADOPTION}/${animal.id}`}
                    linkClick={() => handleOneAnimalClick(animal)} />
                ))
              )
            }
          </div>
        </section>
        <Dialog>
          <Filters
            onClick={handleCloseFilters}
            initialFilters={filters}
            resetFilters={initialFiltersState}
            onFiltersChange={handleApplyFilters}
            resetClick={() => handleResetFilters()} />
        </Dialog>
      </div>
    </>
  )
}

export default Adoption;