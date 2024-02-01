import "./article.scss";

const Article = ({ artclStyle, imgUrl, imgAlt, title, date, text }) => {

  return (
    <>
      <article className={`article${artclStyle}`}>
        <div className="article__img">
          <img crossorigin="anonymous" src={imgUrl} alt={imgAlt} />
        </div>
        <div className="article__content">
          <div>
            <p className="article__content__date">{date}</p>
          </div>
          <h2 className="article__content__title">{title}</h2>
          <div>
            <p className="article__content__text">{text}</p>
          </div>
        </div>
      </article>
    </>
  )
}

export default Article;