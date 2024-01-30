import { useDispatch, useSelector } from "react-redux";
import { APP_ROUTES } from "../../constants/route.const";
import Article from "../Article/Article";
import Button from "../Button/Button";
import "./homeArticles.scss";
import { getArticleThunk } from "../../api/article.api";
import { useEffect } from "react";

const HomeArticles = () => {
  const dispatch = useDispatch();
  const { articlesOverview } = useSelector(state => state.articleReducer);

  useEffect(() => {
    dispatch(getArticleThunk());
  }, [dispatch]);

  return (
    <>
      <div className="title-wrapper">
        <h2>Articles</h2>
      </div>
      <div className="content-wrapper">
        <div className="articles-wrapper">
          {articlesOverview.map((article, index) => (
            <Article key={index} artclStyle="" imgUrl={""} imgAlt={""} title={article.name} date={article.date} text={article.description} />
          ))}
        </div>
        {/* <Button btnStyle="" text="Voir plus d'articles" /> */}
        <div className="btn-wrapper">
          <a className="btn" href={APP_ROUTES.ARTICLES}>Voir plus d'articles</a>
        </div>
      </div>

    </>
  )
}

export default HomeArticles;