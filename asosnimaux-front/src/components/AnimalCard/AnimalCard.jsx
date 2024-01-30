import Icon from "../Icon/Icon";
import { FaHeart, FaMars, FaVenus } from "react-icons/fa6";
import "./animalCard.scss";

const AnimalCard = ({ imgUrl, imgAlt, animalName }) => {
  return (
    <>
      <article className="animal">
        <span className="reserved">Réservé</span>
        <FaHeart className="icon heart animal__follow-icon" color="var(--light-grey)" />
        <div className="animal__img">
          <img src={imgUrl} alt={imgAlt} />
        </div>
        <div className="animal__infos">
          <h2 className="animal__name">{animalName}</h2>
          <FaMars size={22} color="#0099ff" />
        </div>
      </article>
    </>
  )
}

export default AnimalCard;