import Button from "../Button/Button";
import Icon from "../Icon/Icon";
import Input from "../Input/Input";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import "./admin.scss";
import InputFile from "../InputFile/InputFile";

const Admin = ({ count, title, date }) => {
  return (
    <>
      <div className="admin">
        <div className="title-wrapper">
          <h1>Page administrateur</h1>
        </div>

        <section className="new-article">
          <h2>Nouvel article</h2>

          <form>
            <Input label="Titre" id="title" />
            <Input label="Localisation" id="location" />
            <InputFile label="Choisir une image" id="image" />
            <div className="input__wrapper">
              <label className="input__label" htmlFor="article">Contenu</label>
              <textarea className="input" name="article" id="article"></textarea>
            </div>
            <Button btnStyle="" text="Valider" type="submit" />
          </form>
        </section>

        <section className="all-articles">
          <h2>Tous les articles ({count})</h2>

          <div className="articles-overview__wrapper">
            <article className="article-overview">
              <div className="article-overview__content">
                <div className="article-overview__title">
                  <h3>{title}Test</h3>
                </div>
                <div className="article-overview__date">
                  <p>{date}28/01/2014</p>
                </div>
              </div>
              <div className="icons-wrapper">
                <FaPencil className="manage-icons" />
                <FaTrashCan className="manage-icons" color="var(--dark-red)" />
                {/* <Icon iconStyle={""} imgUrl="/pencil.svg" imgAlt="Icone de crayon" /> */}
                {/* <Icon iconStyle={""} imgUrl="/delete.svg" imgAlt="Icone de suppression" /> */}
              </div>
            </article>
          </div>
        </section>
      </div>
    </>
  );
}

export default Admin;