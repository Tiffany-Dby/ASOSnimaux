import "./signIn.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { signInThunk } from "../../api/user.api";
import { useDispatch, useSelector } from "react-redux";
import { updateSignInForm } from "../../redux/reducers/user.reducer";
import { APP_ROUTES } from "../../constants/route.const.js"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { signInForm, signInLoading, signInError, isAuth, user } = useSelector(state => state.userReducer);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInThunk());
  }

  const updateForm = (input, value) => dispatch(updateSignInForm({ input, value }));

  const handleRedirect = () => {
    if (isAuth) {
      navigate(APP_ROUTES.ACCOUNT, { replace: true });
    }
  }

  useEffect(() => {
    if (isAuth) {
      navigate(APP_ROUTES.ACCOUNT, { replace: true });
    }
  }, [isAuth]);

  return (
    <>
      <div className="signIn-wrapper">
        <div className='title-wrapper'>
          <h1>Se connecter</h1>
        </div>
        <form onSubmit={handleSubmit}>
          {signInLoading ?
            <>
              <p>Chargement...</p>
              <span className="loading"></span>
            </>
            :
            <>
              <Input label="Email ou Pseudo" id="login" required={true} value={signInForm.login} onChange={value => updateForm("login", value)} />
              <Input label="Mot de passe" id="password" type="password" required={true} value={signInForm.password} onChange={value => updateForm("password", value)} />
              <Button btnStyle="" text="Connexion" type="submit" btnClick={handleRedirect} />
            </>
          }
        </form>

        <div className="redirect">
          <p>Pas encore un(e) Ami'nimaux ?</p>
          <a href={APP_ROUTES.SIGN_UP}>S'inscrire</a>
        </div>
      </div>
    </>
  );
}

export default SignIn;