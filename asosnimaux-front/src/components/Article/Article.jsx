import "./article.scss";

const Article = ({ artclStyle, imgUrl, imgAlt, title, date, text }) => {

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
          <p>{text}</p>
        </div>
      </article>
    </>
  )
}

export default Article;