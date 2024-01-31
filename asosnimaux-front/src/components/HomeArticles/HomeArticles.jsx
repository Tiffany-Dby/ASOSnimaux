import { useSelector } from "react-redux";
import { APP_ROUTES } from "../../constants/route.const";
import Article from "../Article/Article";
import Button from "../Button/Button";
import "./homeArticles.scss";
import { setToLocalDate } from "../../utils/date.utils";

const HomeArticles = () => {
  const { overview } = useSelector(state => state.articleReducer.articles);

  return (
    <>
      <div className="title-wrapper">
        <h2>Articles</h2>
      </div>
      <div className="content-wrapper">
        <div className="articles-wrapper">
          {overview.map((article, index) => (
            <Article key={index} artclStyle="" imgUrl={article.picture_url} imgAlt={article.picture_caption} title={article.name} date={setToLocalDate(article.date)} text={article.truncated_description} />
          ))}
        </div>
        <div className="btn-wrapper">
          <a className="btn" href={APP_ROUTES.ARTICLES}>Voir plus d'articles</a>
        </div>
      </div>

    </>
  )
}

export default HomeArticles;