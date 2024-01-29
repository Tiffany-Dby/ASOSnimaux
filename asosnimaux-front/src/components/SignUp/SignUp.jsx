import Button from "../Button/Button";
import Input from "../Input/Input";
import "./signUp.scss";

const SignUp = () => {
  return (
    <>
      <div className="signUp-wrapper">
        <div className='title-wrapper'>
          <h1>S'inscrire</h1>
          <div className="title__decoration"></div>
        </div>
        <form>
          <Input label="Pseudo" id="username" required={true} />
          <Input label="Email" id="mail" type="email" required={true} />
          <Input label="Mot de passe" id="password" type="password" required={true} />
          <Button btnStyle="" text="Inscription" />
        </form>

        <div className="redirect">
          <p>Déjà un(e) Ami'nimaux ?</p>
          <a href="#">Se connecter</a>
        </div>
      </div>
    </>
  );
}

export default SignUp;