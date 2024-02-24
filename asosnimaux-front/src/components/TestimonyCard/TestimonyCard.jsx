import "./testimonyCard.scss";
import Button from "../Button/Button";
import { formatDescription } from "../../utils/description.utils";

const TestimonyCard = ({ imgUrl, date, text, author, btnClick }) => {
  // Utils -> description.utils.js -> returns an array of strings
  const paragraphs = formatDescription(text);

  return (
    <>
      <blockquote className="testimony">
        <div className="testimony__text">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <Button btnStyle={""} text="Lire la suite" btnClick={btnClick} />
        <cite className="testimony__cite">
          <div className="testimony__img">
            <img crossOrigin="anonymous" src={imgUrl} alt={`Avatar utilisateur : un sticker animal`} />
          </div>
          <p><span>{author}</span> le {date}</p>
        </cite>
      </blockquote>
    </>
  );
}

export default TestimonyCard;