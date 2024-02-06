import "./filters.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";

const Filters = () => {
  return (
    <>
      <div className="filters-wrapper">
        <h2>Filtres</h2>
        <div className="search">
          <Input label="Rechercher" id="search" />
          <Button btnStyle="" text="Rechercher" />
        </div>

        <form className="filters">
          <fieldset>
            <legend>Espèces</legend>
            <div className="inputs-wrapper">
              <label htmlFor="cats">
                <div className="switch">
                  <input type="checkbox" name="cats" id="cats" />
                  <span></span>
                </div>
                Chats
              </label>
              <label htmlFor="dogs">
                <div className="switch">
                  <input type="checkbox" name="dogs" id="dogs" />
                  <span></span>
                </div>
                Chiens
              </label>
              <label htmlFor="others">
                <div className="switch">
                  <input type="checkbox" name="others" id="others" />
                  <span></span>
                </div>
                Autres
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend>Sexe</legend>
            <div className="inputs-wrapper">
              <label htmlFor="female">
                <div className="switch">
                  <input type="checkbox" name="female" id="female" />
                  <span></span>
                </div>
                Femelle
              </label>
              <label htmlFor="male">
                <div className="switch">
                  <input type="checkbox" name="male" id="male" />
                  <span></span>
                </div>
                Mâle
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend>Âge</legend>
            <div className="inputs-wrapper">
              <label htmlFor="senior">
                <div className="switch">
                  <input type="checkbox" name="senior" id="senior" />
                  <span></span>
                </div>
                Senior
              </label>
              <label htmlFor="adult">
                <div className="switch">
                  <input type="checkbox" name="adult" id="adult" />
                  <span></span>
                </div>
                Adulte
              </label>
              <label htmlFor="junior">
                <div className="switch">
                  <input type="checkbox" name="junior" id="junior" />
                  <span></span>
                </div>
                Junior
              </label>
            </div>
          </fieldset>
        </form>

        <Button btnStyle="" text="Réinitialiser les filtres" />
      </div>


    </>
  );
}

export default Filters;