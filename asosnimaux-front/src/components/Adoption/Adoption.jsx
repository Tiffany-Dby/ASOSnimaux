import "./adoption.scss";
import AnimalCard from "../AnimalCard/AnimalCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAnimalsThunk } from "../../api/animal.api";
import { APP_ROUTES } from "../../constants/route.const";

const Adoption = () => {
  const dispatch = useDispatch();

  const { animals } = useSelector(state => state.animalReducer);
  const { all } = animals;

  useEffect(() => {
    dispatch(getAllAnimalsThunk());
  }, []);

  return (
    <>
      <section className="animals">
        <div className="title-wrapper">
          <h2>Adoption</h2>
        </div>
        <p>Vous trouverez ici tous les animaux en attente d'une famille pour les accueillir ! Ils n'attendent que vous pour aimer et être aimé.</p>
        <div className="animals__wrapper">
          {all.map(animal => (
            <AnimalCard key={animal.id} animalName={animal.name} imgUrl={`${APP_ROUTES.API_URL}${animal.picture_url}`} imgAlt={animal.picture_caption} animalSex={animal.sex} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Adoption;