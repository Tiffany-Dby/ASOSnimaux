import Button from "../Button/Button";
import Input from "../Input/Input";
import "./signIn.scss";
import { signInThunk } from "../../api/user.api";
import { useDispatch, useSelector } from "react-redux";
import { updateSignInForm } from "../../redux/reducers/user.reducer";

const SignIn = () => {
  const dispatch = useDispatch();

  const { signInForm, signInLoading, signInError } = useSelector(store => store.userState);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInThunk());
  }

  const updateForm = (value, input) => {
    dispatch(updateSignInForm({ value, input }));
  }

  return (
    <>
      <div className="signIn-wrapper">
        <div className='title-wrapper'>
          <h1>Se connecter</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <Input label="Email ou Pseudo" id="login" required={true} value={signInForm.login} onChange={value => updateForm(value, "login")} />
          <Input label="Mot de passe" id="password" type="password" required={true} value={signInForm.password} onChange={value => updateForm(value, "password")} />
          <Button btnStyle="" text="Connexion" type="submit" />
        </form>

        <div className="redirect">
          <p>Pas encore un(e) Ami'nimaux ?</p>
          <a href="#">S'inscrire</a>
        </div>
      </div>
    </>
  );
}

export default SignIn;