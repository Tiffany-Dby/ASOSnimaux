import { Link } from "react-router-dom";
import "./animalCard.scss";
import { FaHeart, FaMars, FaVenus } from "react-icons/fa6";
import { APP_ROUTES } from "../../constants/route.const";

const AnimalCard = ({ imgUrl, imgAlt, animalName, status, animalSex, color, followClick }) => {
  return (
    <>
      <article className="animal">

        {(status === "réservé" || status === "adopté") &&
          <span className={`animal__status ${status === "réservé" ? "status--reserved" : ""}${status === "adopté" ? "status--adopted" : ""}`}>{status === "réservé" && "Réservé"}{status === "adopté" && "Adopté"}</span>
        }
        <FaHeart className="icon heart animal__follow-icon" color={color || "var(--dark-grey)"} onClick={followClick} role="button" aria-label="Bouton d'ajout/retrait des favoris" />
        <Link to={APP_ROUTES.HOME} className="animal__redirect">
          <div className="animal__img">
            <img loading="lazy" crossOrigin="anonymous" src={imgUrl} alt={imgAlt} />
          </div>
          <div className="animal__infos">
            <h3 className="animal__name">{animalName}</h3>
            {animalSex === "mâle" &&
              <FaMars size={22} className="animal__sex male" />
            }
            {animalSex === "femelle" &&
              <FaVenus size={22} className="animal__sex female" />
            }
          </div>
        </Link>
      </article>
    </>
  )
}

export default AnimalCard;