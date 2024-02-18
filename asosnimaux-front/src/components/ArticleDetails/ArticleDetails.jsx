import "./articleDetails.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { setToLocalDateLong } from "../../utils/date.utils";
import { formatDescription } from "../../utils/articleDescription.utils";
import { useEffect } from "react";
import { getOneArticleThunk } from "../../api/article.api";

const ArticleDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { articles, oneLoading, oneError } = useSelector(state => state.articleReducer);
  const { one } = articles;

  useEffect(() => {
    if (id) {
      dispatch(getOneArticleThunk(id));
    }
  }, []);

  const paragraphs = formatDescription(one.description);

  return (
    <>
      <section className="article-page">
        <div className="article-page__wrapper">
          <article>
            <div className="article-page__title__wrapper">
              <h1 className="article-page__title">{one.name}</h1>
            </div>
            <div className="article-page__img">
              <img crossOrigin="anonymous" loading="lazy" src={one.picture_url} alt={one.picture_caption} />
            </div>
            <div className="article-page__content">
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