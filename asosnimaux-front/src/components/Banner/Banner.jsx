import Button from "../Button/Button";
import "./banner.scss";

const Banner = () => {
  return (
    <>
      <section className="banner">
        <div className="banner__header">
          <div className="banner__logo">
            <img src="/logo-lm.svg" alt="Logo ASOS'nimaux" />
          </div>
          <h1>Refuge pour animaux en Gironde</h1>
        </div>
        <div className="banner__text">
          <p>Donnons-leur autant qu'ils nous apportent !</p>
          <div className="banner__buttons">
            <Button btnStyle="" text="Je donne" />
            <Button btnStyle="" text="J'adopte" />
          </div>
        </div>

      </section>
    </>
  );
}

export default Banner;