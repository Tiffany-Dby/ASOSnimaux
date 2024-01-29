import Icon from "../Icon/Icon";
import "./animalCard.scss";

const AnimalCard = ({ imgUrl, imgAlt, animalName }) => {
  return (
    <>
      <article className="animal">
        <span className="reserved">Réservé</span>
        <Icon iconStyle={" animal__follow-icon"} imgUrl={"/heart.svg"} imgAlt={"Icone de favoris en forme de coeur"} />
        <div className="animal__img">
          <img src={imgUrl} alt={imgAlt} />
        </div>
        <div className="animal__infos">
          <h2 className="animal__name">{animalName}</h2>
          <img className="animal__sex" src="/male.svg" alt="Icone mâle" />
        </div>
      </article>
    </>
  )
}

export default AnimalCard;