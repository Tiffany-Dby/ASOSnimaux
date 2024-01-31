// import "../Input/input.scss";
import "./inputFile.scss";

const InputFile = ({ id, label, value, onChange }) => {

  const handleChange = (value) => {
    onChange(value);
  }

  return (
    <>
      <div className="input__wrapper">
        <label className="input__label" htmlFor={id} >{label}</label>
        <input className="input input-file" id={id} name={id} type="file" value={value || ""} onChange={() => { }} />
      </div>
    </>
  );
}

export default InputFile;