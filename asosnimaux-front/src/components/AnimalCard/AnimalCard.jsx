import "./animalCard.scss";
import { FaHeart, FaMars, FaVenus } from "react-icons/fa6";

const AnimalCard = ({ imgUrl, imgAlt, animalName, animalSex }) => {
  return (
    <>
      <article className="animal">
        <span className="reserved">Réservé</span>
        <FaHeart className="icon heart animal__follow-icon" color="var(--light-grey)" />
        <div className="animal__img">
          <img loading="lazy" crossOrigin="anonymous" src={imgUrl} alt={imgAlt} />
        </div>
        <div className="animal__infos">
          <h2 className="animal__name">{animalName}</h2>
          {animalSex === "mâle" &&
            <FaMars size={22} color="#0099ff" />
          }
          {animalSex === "femelle" &&
            <FaVenus size={22} color="#ED50A9" />
          }
        </div>
      </article>
    </>
  )
}

export default AnimalCard;