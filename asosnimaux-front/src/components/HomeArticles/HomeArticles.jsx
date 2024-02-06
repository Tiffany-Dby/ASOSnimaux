import { useDispatch, useSelector } from "react-redux";
import { APP_ROUTES } from "../../constants/route.const";
import Article from "../Article/Article";
import Button from "../Button/Button";
import "./homeArticles.scss";
import { setToLocalDate, setToLocalDateLong } from "../../utils/date.utils";
import { useEffect } from "react";
import { getOverviewThunk } from "../../api/article.api";
import { Link } from "react-router-dom";

const HomeArticles = () => {
  const dispatch = useDispatch();
  const { articles } = useSelector(state => state.articleReducer);
  const { overview } = articles;

  useEffect(() => {
    dispatch(getOverviewThunk());
  }, []);

  return (
    <>
      <section className="articles-overview">
        <div className="title-wrapper">
          <h2>Articles</h2>
        </div>
        <div className="articles-overview__wrapper">
          {overview.map((article, index) => (
            <Article key={index} artclStyle="" imgUrl={article.picture_url} imgAlt={article.picture_caption} title={article.name} date={setToLocalDateLong(article.date)} text={article.truncated_description} />
          ))}
        </div>
        <div className="btn-wrapper">
          <Link className="btn" to={APP_ROUTES.ARTICLES}>Voir plus d'articles</Link>
        </div>
      </section>

    </>
  )
}

export default HomeArticles;