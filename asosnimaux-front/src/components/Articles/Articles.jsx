import { useDispatch, useSelector } from "react-redux";
import "./articles.scss";
import Article from "../Article/Article";
import { useEffect } from "react";
import { getAllArticlesThunk, getOneArticleThunk } from "../../api/article.api";
import { setToLocalDateLong } from "../../utils/date.utils";
import { APP_ROUTES } from "../../constants/route.const";
import { Link, NavLink } from "react-router-dom";

const Articles = () => {
  const dispatch = useDispatch();

  const { articles, allLoading, allError } = useSelector(state => state.articleReducer);
  const { all } = articles;

  const handleOneArticleClick = (article) => {
    dispatch(getOneArticleThunk(article.id))
  }

  useEffect(() => {
    dispatch(getAllArticlesThunk());
  }, []);

  return (
    <>
      <section className="articles-page">
        <div className="title-wrapper">
          <h1>Actualités</h1>
        </div>

        <div className="articles__wrapper">
          {all.map((article) => (
            <Link key={article.id} to={`${APP_ROUTES.ARTICLES}/${article.id}`} onClick={() => handleOneArticleClick(article)}>
              <Article artclStyle="" imgUrl={`${APP_ROUTES.API_URL}${article.picture_url}`} imgAlt={article.picture_caption} title={article.name} date={setToLocalDateLong(article.date)} text={article.truncated_description} />
            </Link>
          ))}
        </div>

      </section>
    </>
  );
}

export default Articles;