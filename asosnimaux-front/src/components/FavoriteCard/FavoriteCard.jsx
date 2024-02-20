import "./favoriteCard.scss";
import Button from "../Button/Button";
import { FaHeartCircleXmark, FaMars, FaVenus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const FavoriteCard = ({ status, imgUrl, imgAlt, animalName, animalSex, description, btnClick, redirect }) => {
  return (
    <>
      <article className="followed-animal">
        <div className="followed-animal__img">
          <img crossOrigin="anonymous" src={imgUrl} alt={imgAlt} />
        </div>
        {(status === "réservé" || status === "adopté") &&
          <span className={`followed-animal__status ${status === "réservé" ? "status--reserved" : ""}${status === "adopté" ? "status--adopted" : ""}`}>{status === "réservé" && "Réservé"}{status === "adopté" && "Adopté"}</span>
        }
        <div className="followed-animal__wrapper">
          <div className="followed-animal__content">
            <div className="followed-animal__content__header">
              <h3 className="followed-animal__title">
                {animalName}
                <span>
                  {animalSex === "mâle" &&
                    <FaMars size={20} className="animal__sex male" />
                  }
                  {animalSex === "femelle" &&
                    <FaVenus size={20} className="animal__sex female" />
                  }</span>
              </h3>
              <Button btnStyle=" followed-animal__unfollow" text={
                <>
                  Retirer des favoris
                  <span>
                    <FaHeartCircleXmark size={20} />
                  </span>
                </>
              } btnClick={btnClick} />
            </div>
            <p>{description}</p>
            <div className="btn-wrapper">
              <Link className="btn followed-animal__redirect" to={redirect}>Voir la fiche détaillée</Link>
            </div>
          </div>
        </div>

      </article>
    </>
  );
}

export default FavoriteCard;