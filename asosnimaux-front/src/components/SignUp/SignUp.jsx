import "./signUp.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { signUpThunk } from "../../api/user.api";
import { updateSignUpForm } from "../../redux/reducers/user.reducer";
import { APP_ROUTES } from "../../constants/route.const.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { signUpForm, signUpLoading, signUpError, isSignUpDone } = useSelector(state => state.userReducer);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(signUpThunk());
  }

  const updateForm = (input, value) => dispatch(updateSignUpForm({ input, value }));

  useEffect(() => {
    if (isSignUpDone) {
      navigate(APP_ROUTES.SIGN_IN, { replace: true });
    }
  }, [isSignUpDone]);

  return (
    <>
      <div className="signUp-wrapper">
        <div className='title-wrapper'>
          <h1>S'inscrire</h1>
          <div className="title__decoration"></div>
        </div>
        {signUpError &&
          <span className="text-error">{signUpError}</span>
        }
        <form onSubmit={handleSubmit}>
          {signUpLoading ?
            <>
              <p>Chargement...</p>
              <span className="loading"></span>
            </>
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
          <a href={APP_ROUTES.SIGN_IN}>Se connecter</a>
        </div>
      </div>
    </>
  );
}

export default SignUp;