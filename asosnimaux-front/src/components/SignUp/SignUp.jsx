import "./signUp.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { signUpThunk } from "../../api/user.api";
import { updateSignUpForm } from "../../redux/reducers/user.reducer";
import { APP_ROUTES } from "../../constants/route.const.js";

const SignUp = () => {
  const dispatch = useDispatch();

  const { signUpForm, signUpLoading, user } = useSelector(state => state.userReducer);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(signUpThunk());
  }

  const updateForm = (input, value) => dispatch(updateSignUpForm({ input, value }));

  return (
    <>
      <div className="signUp-wrapper">
        <div className='title-wrapper'>
          <h1>S'inscrire</h1>
          <div className="title__decoration"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <Input label="Pseudo" id="username" required={true} value={signUpForm.username} onChange={value => updateForm("username", value)} />
          <Input label="Email" id="email" type="email" required={true} value={signUpForm.email} onChange={value => updateForm("email", value)} />
          <Input label="Mot de passe" id="password" type="password" required={true} value={signUpForm.password} onChange={value => updateForm("password", value)} />
          <Button btnStyle="" text="Inscription" type="submit" />
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