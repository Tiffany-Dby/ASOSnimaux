import "./input.scss";

const Input = ({ id, label, type, value, required, onChange }) => {

  const handleChange = (value) => {
    onChange(value);
  }

  return (
    <>
      <div className="input__wrapper">
        <label className="input__label" htmlFor={id} >{label}</label>
        <input className="input" id={id} name={id} type={type || "text"} value={value || ""} required={required} onChange={e => handleChange(e.target.value)} />
      </div>
    </>
  );
}

export default Input;