import "./inputCheckbox.scss";

const InputCheckbox = ({ id, label }) => {
  return (
    <>
      <label className="switch__label" htmlFor={id}>
        <div className="switch__wrapper">
          <input className="switch" type="checkbox" name={id} id={id} />
          <span></span>
        </div>
        {label}
      </label>
    </>
  );
}

export default InputCheckbox;