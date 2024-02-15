import "./inputSelect.scss";

const InputSelect = ({ id, label, options, selected, onChange }) => {
  const handleChange = (value) => {
    onChange(value);
  }

  return (
    <>
      <div className="input__wrapper">
        <label className="input__label" htmlFor={id} >{label}</label>
        <select className="input" name={id} id={id} value={selected || ""} onChange={e => handleChange(e.target.value)}>
          <option value="">Choisir une option</option>
          {options.map((option, index) => (
            <option key={index} value={option.value} >{option.label}</option>
          ))}
        </select>
      </div>
    </>
  );
}

export default InputSelect;