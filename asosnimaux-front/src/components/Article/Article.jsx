import { formatDescription } from "../../utils/articleDescription.utils";
import "./article.scss";

const Article = ({ artclStyle, imgUrl, imgAlt, title, date, text }) => {
  const paragraphs = formatDescription(text);

  return (
    <>
      <article className={`article${artclStyle}`}>
        <div className="article__img">
          <img loading="lazy" crossOrigin="anonymous" src={imgUrl} alt={imgAlt} />
        </div>
        <div className="article__content">
          <h2 className="article__title">{title}</h2>
          <span className="article__date">
            <p>{date}</p>
          </span>
          <div className="article__text">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
    </>
  )
}

export default Article;