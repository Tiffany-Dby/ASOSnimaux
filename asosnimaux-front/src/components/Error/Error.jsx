import { Link } from "react-router-dom";
import "./error.scss";
import { APP_ROUTES } from "../../constants/route.const";

const Error = () => {
  return (
    <>
      <section className="error">
        <h1>OOPS</h1>
        <p><strong>Erreur 404</strong></p>
        <p>Il semblerait que cette page n'existe pas..</p>

        <img src="/bateau.png" alt="Sticker d'un chat, les yeux équarquillés, dans un bateau qui avance vite" />

        <p>Revenez parmis nous !</p>
        <nav>
          <ul>
            <li>
              <div className="btn-wrapper">
                <Link to={APP_ROUTES.HOME} className="btn">Accueil</Link>
              </div>
            </li>
            <li>
              <div className="btn-wrapper">
                <Link to={APP_ROUTES.ACCOUNT} className="btn">Compte</Link>
              </div>
            </li>
          </ul>
        </nav>
      </section>
    </>
  )
}

export default Error;