import "./signIn.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Toast from "../Toast/Toast.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInThunk } from "../../api/user.api";
import { updateSignInForm } from "../../redux/reducers/user.reducer";
import { APP_ROUTES } from "../../constants/route.const.js"

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Toast Reducer
  const { isToastOpen } = useSelector(state => state.toastReducer);

  // User Reducer
  const { signInForm, signInLoading, signInError, isAuth, signUpSuccess, updatePasswordSuccess, deleteUserSuccess } = useSelector(state => state.userReducer);

  // Submit Sign In Form
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInThunk());
  }

  // Inputs onChange
  const updateForm = (input, value) => dispatch(updateSignInForm({ input, value }));

  // Redirect after Sign In -> Dashboard
  const handleRedirect = () => {
    if (isAuth) {
      navigate(APP_ROUTES.ACCOUNT, { replace: true });
    }
  }

  // Redirect if User is already Authenticated -> Dashboard
  useEffect(() => {
    if (isAuth) {
      navigate(APP_ROUTES.ACCOUNT, { replace: true });
    }
  }, [isAuth]);

  return (
    <>
      <section className="sign">
        {isToastOpen &&
          <Toast message={signUpSuccess || updatePasswordSuccess || deleteUserSuccess} />
        }
        <div className='title-wrapper'>
          <h1>Se connecter</h1>
        </div>
        {signInError &&
          <span className="text-error">{signInError}</span>
        }
        <form onSubmit={handleSubmit}>
          {signInLoading ?
            <div className="loading">
              <p className="loading__text">Chargement...</p>
              <span className="loading__paws"></span>
            </div>
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
          <Link to={APP_ROUTES.SIGN_UP}>S'inscrire</Link>
        </div>
      </section>
    </>
  );
}

export default SignIn;