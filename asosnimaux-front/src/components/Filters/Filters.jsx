import "./filters.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";
import InputCheckbox from "../InputCheckbox/InputCheckbox";
import { FaXmark } from "react-icons/fa6";

const Filters = ({ onClick }) => {
  return (
    <>
      <div className="filters__wrapper">
        <div className="filters__header">
          <h2>Filtres</h2>
          <FaXmark className="manage-icons" onClick={onClick} role="button" aria-label="Fermer le menu des filtres" />
        </div>
        <div className="filters__search">
          <Input label="Rechercher" id="search" />
          <Button btnStyle="" text="Rechercher" />
        </div>

        <form className="filters">
          <fieldset>
            <legend>Espèces</legend>
            <div className="filters__inputs">
              <InputCheckbox id={"cats"} label={"Chats"} />
              <InputCheckbox id={"dogs"} label={"Chiens"} />
              <InputCheckbox id={"others"} label={"Autres"} />
            </div>
          </fieldset>
          <fieldset>
            <legend>Sexe</legend>
            <div className="filters__inputs">
              <InputCheckbox id={"female"} label={"Femelle"} />
              <InputCheckbox id={"male"} label={"Mâle"} />
            </div>
          </fieldset>
          <fieldset>
            <legend>Âge</legend>
            <div className="filters__inputs">
              <InputCheckbox id={"senior"} label={"Senior"} />
              <InputCheckbox id={"adult"} label={"Adulte"} />
              <InputCheckbox id={"junior"} label={"Junior"} />
            </div>
          </fieldset>
        </form>

        <Button btnStyle=" filters__reset" text="Réinitialiser les filtres" />
      </div >
    </>
  );
}

export default Filters;