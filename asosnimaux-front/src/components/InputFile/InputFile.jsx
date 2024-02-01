// import "../Input/input.scss";
import "./inputFile.scss";

const InputFile = ({ id, label, onChange }) => {

  const handleChange = (e) => {
    const file = e.target.files[0];
    onChange(file);
  };

  return (
    <>
      <div className="input__wrapper">
        <label className="input__label" htmlFor={id} >{label}</label>
        <input className="input input-file" id={id} name={id} type="file" onChange={handleChange} />
      </div>
    </>
  );
}

export default InputFile;