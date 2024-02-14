import { useDispatch, useSelector } from "react-redux";
import { setToLocalDate, setToLocalDateLong } from "../../utils/date.utils";
import "./articleDetails.scss";
import Article from "../Article/Article";
import { splitDescription } from "../../utils/articleDescription.utils";

const ArticleDetails = () => {
  const dispatch = useDispatch();

  const { articles, oneLoading, oneError } = useSelector(state => state.articleReducer);
  const { one } = articles;

  const paragraphs = splitDescription(one.description);

  return (
    <>
      <section className="article-page">
        <div className="article-page__wrapper">
          <article>
            <div className="article-page__img">
              <img crossOrigin="anonymous" loading="lazy" src={one.picture_url} alt={one.picture_caption} />
            </div>
            <div className="article-page__content">
              <h1 className="article-page__title">{one.name}</h1>
              <p className="article-page__date">{setToLocalDateLong(one.date)}, {one.location}</p>
              <div className="article-page__text">
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

export default ArticleDetails;