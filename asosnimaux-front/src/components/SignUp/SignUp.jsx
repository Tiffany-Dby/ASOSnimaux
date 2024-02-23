import "./signUp.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUpThunk } from "../../api/user.api";
import { updateSignUpForm } from "../../redux/reducers/user.reducer";
import { APP_ROUTES } from "../../constants/route.const.js";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // User Reducer
  const { signUpForm, signUpLoading, signUpError, signUpSuccess } = useSelector(state => state.userReducer);

  // Sumbit Sign Up Form
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(signUpThunk());
  }

  // Inputs onChange
  const updateForm = (input, value) => dispatch(updateSignUpForm({ input, value }));

  // Redirect after Sign up -> Sign In
  useEffect(() => {
    if (signUpSuccess) {
      navigate(APP_ROUTES.SIGN_IN, { replace: true });
    }
  }, [signUpSuccess]);

  return (
    <>
      <section className="sign">
        <div className='title-wrapper'>
          <h1>S'inscrire</h1>
        </div>
        {signUpError &&
          <span className="text-error">{signUpError}</span>
        }
        <form onSubmit={handleSubmit}>
          {signUpLoading ?
            <div className="loading">
              <p className="loading__text">Chargement...</p>
              <span className="loading__paws"></span>
            </div>
            :
            <>
              <Input label="Pseudo" id="username" required={true} value={signUpForm.username} onChange={value => updateForm("username", value)} />
              <Input label="Email" id="email" type="email" required={true} value={signUpForm.email} onChange={value => updateForm("email", value)} />
              <Input label="Mot de passe" id="password" type="password" required={true} value={signUpForm.password} onChange={value => updateForm("password", value)} />
              <Button btnStyle="" text="Inscription" type="submit" />
            </>
          }
        </form>

        <div className="redirect">
          <p>Déjà un(e) Ami'nimaux ?</p>
          <Link to={APP_ROUTES.SIGN_IN}>Se connecter</Link>
        </div>
      </section>
    </>
  );
}

export default SignUp;