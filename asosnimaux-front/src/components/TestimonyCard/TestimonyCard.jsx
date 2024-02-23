import "./testimonyCard.scss";

const TestimonyCard = ({ title, imgUrl, imgAlt, date, text }) => {
  return (
    <>
      <article className="testimony">
        <h3>{title}</h3>
        <div className="testimony__img">
          <img src={imgUrl} alt={`${imgAlt}, avatar utilisateur`} />
        </div>
        <span className="testimony__date">
          <p>{date}</p>
        </span>
        <div className="testimony__text">
          {text}
        </div>
      </article>
    </>
  );
}

export default TestimonyCard;