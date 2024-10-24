import { useNavigate } from "react-router-dom";
import "./_loginForm.scss";
import { useLoginForm } from "./useLogin";
import VisibleEye from "../../assets/icons/eye-visible-show.svg";
import HideEye from "../../assets/icons/eye-visible-hide.svg";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const {
    email,
    password,
    visiblePassword,
    isValid,
    loading,

    handleSubmit,
    handleEmail,
    handleEmailBlur,
    handlePassword,
    togglePassword,
  } = useLoginForm({
    navigate,
  });

  return (
    <div className="loginForm-container">
      <header>Seja bem-vindo</header>
      <p>
        Para acessar o painel de controle,
        <br />
        por favor, insira suas credenciais.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="loginForm-container-group">
          <label>Email</label>
          <div className="loginForm-container-group-input">
            <input
              type="text"
              value={email}
              onChange={handleEmail}
              onBlur={handleEmailBlur}
              required={true}
              className={isValid ? "valid" : "invalid"}
            />
          </div>
          {!isValid && <span>Email inválido</span>}
        </div>
        <div className="loginForm-container-group">
          <label>Senha</label>
          <div className="loginForm-container-group-input">
            <input
              type={visiblePassword ? "text" : "password"}
              value={password}
              onChange={handlePassword}
              required={true}
            />

            <button
              type="button"
              onClick={() => togglePassword()}
              className="toggle-password-visibility"
            >
              {visiblePassword ? (
                <img src={HideEye} alt="hide" />
              ) : (
                <img src={VisibleEye} alt="show" />
              )}
            </button>
          </div>
          <a href="/recovery-password">Forgot password</a>
        </div>
        <footer>
          <button type="submit" onClick={handleSubmit} disabled={loading}>
            <span>Entrar</span>
          </button>
        </footer>
      </form>
    </div>
  );
};

export default LoginForm;
