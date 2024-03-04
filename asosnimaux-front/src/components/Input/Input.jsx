import "./input.scss";

const Input = ({ id, label, name, type, min, max, value, required, onChange }) => {
  const handleChange = (value) => {
    onChange(value);
  }

  return (
    <>
      <div className="input__wrapper">
        <label className="input__label" htmlFor={id} >{label}</label>
        <input className="input" id={id} name={name || id} type={type || "text"} min={min} max={max} value={value || ""} required={required} onChange={e => handleChange(e.target.value)} />
      </div>
    </>
  );
}

export default Input;