import AnimalCard from "../AnimalCard/AnimalCard";
import "./adoption.scss";

const Adoption = () => {
  return (
    <>
      <section className="animals">
        <div className="title-wrapper">
          <h2>Adoption</h2>
        </div>
        <p>Vous trouverez ici tous les animaux en attente d'une famille pour les accueillir ! Ils n'attendent que vous pour aimer et être aimé.</p>
        <div className="animals__wrapper">
          <AnimalCard animalName={"Pichu"} imgUrl={"/equipe.jpg"} />
          <AnimalCard animalName={"Pichu"} imgUrl={"/equipe.jpg"} />
          <AnimalCard animalName={"Pichu"} imgUrl={"/equipe.jpg"} />
          <AnimalCard animalName={"Pichu"} imgUrl={"/equipe.jpg"} />
          <AnimalCard animalName={"Pichu"} imgUrl={"/equipe.jpg"} />
        </div>
      </section>
    </>
  )
}

export default Adoption;