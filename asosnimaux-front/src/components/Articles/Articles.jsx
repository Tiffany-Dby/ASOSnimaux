import "./articles.scss";
import Article from "../Article/Article";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllArticlesThunk, getOneArticleThunk } from "../../api/article.api";
import { setToLocalDateLong } from "../../utils/date.utils";
import { APP_ROUTES } from "../../constants/route.const";
import { Link } from "react-router-dom";

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
      <div className="articles__page">
        <div className="title-wrapper">
          <h1>Actualités</h1>
        </div>
        <section className="articles">
          <div className="articles__header">
            <h2>Les actualités de l'association</h2>
            <p>La liste de toutes les actualités qui ont été postées sur notre site, de la plus récente à la plus ancienne. Cliquez dessus pour plus de détails.</p>
          </div>
          <div className="articles__wrapper">
            {all.map((article) => (
              <Link key={article.id} to={`${APP_ROUTES.ARTICLES}/${article.id}`} onClick={() => handleOneArticleClick(article)}>
                <Article artclStyle="" imgUrl={`${APP_ROUTES.API_URL}${article.picture_url}`} imgAlt={article.picture_caption} title={article.name} date={setToLocalDateLong(article.date)} text={article.truncated_description} />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Articles;