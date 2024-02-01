import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import "./user.scss";

const User = ({ username, imgUrl, imgAlt, email, date, testimonie }) => {
  return (
    <>
      <section className="user">
        <div className="title-wrapper">
          <h1>Bonjour {username}</h1>
        </div>
        <div className="user__avatar">
          <img src={imgUrl} alt={imgAlt} />
        </div>
        <div className="user__content-wrapper">
          <div className="articles-wrapper">
            <article>
              <h2>Informations de compte</h2>
              <div className="user__username">
                <div className="content__header">
                  <p>Pseudo</p>
                  <FaPencil className="manage-icons" />
                </div>
                <div className="content">
                  <p>{username}</p>
                </div>
              </div>
              <div className="user__email">
                <div className="content__header">
                  <p>Email</p>
                  <FaPencil className="manage-icons" />
                </div>
                <div className="content">
                  <p>{email}Lorem_ipsum@dolor.sit</p>
                </div>
              </div>
            </article>

            <article>
              <h2>Sécurité</h2>
              <div className="user__password">
                <div className="content__header">
                  <p>Mot de passe</p>
                  <FaPencil className="manage-icons" />
                </div>
              </div>
            </article>

            <article>
              <h2>Témoignages</h2>
              <div className="user__testimonies">
                <div className="content__header">
                  <p>Témoignage du {date}</p>
                  <div>
                    <FaPencil className="manage-icons" />
                    <FaTrashCan className="manage-icons" color="var(--dark-red)" />
                  </div>
                </div>
                <div className="content">
                  <p>{testimonie} Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat ex, eligendi accusamus minus officia voluptatem, explicabo voluptate repellendus aspernatur accusantium amet expedita repellat, aliquid ratione corrupti vel rerum itaque nesciunt.</p>
                </div>
              </div>
            </article>
          </div>

          <Button btnStyle={""} text="Supprimer le compte" />
        </div>
      </section>
    </>
  );
}

export default User;