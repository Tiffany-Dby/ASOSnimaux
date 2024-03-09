import { useState } from "react";
import InputHelp from "../InputHelp/InputHelp";
import "./input.scss";

const Input = ({ id, label, helps, name, type, min, max, value, required, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  }

  const handleBlur = () => {
    setIsFocused(false);
  }

  const handleChange = (value) => {
    onChange(value);
  }

  return (
    <>
      <div className="input__wrapper">
        <label className="input__label" htmlFor={id} >{label}</label>
        {isFocused && helps &&
          <div className="input__help__wrapper">
            {helps.map((help, index) => (
              <InputHelp key={index} success={help.success} fail={help.fail} text={help.message} />
            ))}
          </div>
        }
        <input
          className="input"
          id={id}
          name={name || id}
          type={type || "text"}
          min={min}
          max={max}
          value={value || ""}
          required={required}
          onChange={e => handleChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </>
  );
}

export default Input;