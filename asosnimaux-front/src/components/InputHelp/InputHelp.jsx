// Styles
import "./inputHelp.scss";
// Components
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

const InputHelp = ({ success, fail, text }) => {
  return (
    <>
      <span className="input__help">
        {success &&
          <>
            <FaCircleCheck color={`var(--success)`} /> {text}
          </>
        }
        {fail &&
          <>
            <FaCircleXmark color={`var(--dark-red)`} /> {text}
          </>
        }
      </span>
    </>
  );
}

export default InputHelp;