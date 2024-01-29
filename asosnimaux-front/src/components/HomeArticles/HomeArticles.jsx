import Article from "../Article/Article";
import Button from "../Button/Button";
import "./homeArticles.scss";

const HomeArticles = () => {
  return (
    <>
      <div className="title-wrapper">
        <h2>Articles</h2>
      </div>
      <div className="content-wrapper">
        <div className="articles-wrapper">
          <Article artclStyle="" imgUrl={"/equipe.jpg"} imgAlt={"equipe"} title="Pompompom" date="27/01/2024" text="Je suis un texte en guise d'exemple, blablabla blablabla blablablablablabla blablablabla blabla" />
          <Article artclStyle="" imgUrl={"/equipe.jpg"} imgAlt={"equipe"} title="Pompompom" date="27/01/2024" text="Je suis un texte en guise d'exemple, blablabla blablabla blablablablablabla blablablabla blabla" />
          <Article artclStyle="" imgUrl={"/equipe.jpg"} imgAlt={"equipe"} title="Pompompom" date="27/01/2024" text="Je suis un texte en guise d'exemple, blablabla blablabla blablablablablabla blablablabla blabla" />
          <Article artclStyle="" imgUrl={"/equipe.jpg"} imgAlt={"equipe"} title="Pompompom" date="27/01/2024" text="Je suis un texte en guise d'exemple, blablabla blablabla blablablablablabla blablablabla blabla" />
          <Article artclStyle="" imgUrl={"/equipe.jpg"} imgAlt={"equipe"} title="Pompompom" date="27/01/2024" text="Je suis un texte en guise d'exemple, blablabla blablabla blablablablablabla blablablabla blabla" />
        </div>
        <Button btnStyle="" text="Voir plus d'articles" />
      </div>

    </>
  )
}

export default HomeArticles;