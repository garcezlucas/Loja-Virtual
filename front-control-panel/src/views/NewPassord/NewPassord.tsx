import "./_newPassword.scss";
import VisibleEye from "../../assets/icons/eye-visible-show.svg";
import HideEye from "../../assets/icons/eye-visible-hide.svg";
import { useNewPassword } from "./useNewPassword";
import { useNavigate } from "react-router-dom";

const NewPassword: React.FC = () => {
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("email");
  const code = urlParams.get("code");

  const {
    password,
    visiblePassword,
    confirmPassword,
    visibleConfirmPassword,
    isValid,
    loading,

    handleSubmit,
    handlePassword,
    togglePassword,
    handleConfirmPassword,
    toggleConfirmPassword,
    handleBlurConfirmPassword,
  } = useNewPassword({ navigate, email, code });

  return (
    <div className="new-password-container">
      <header>Alteração de senha</header>
      <p>Insira a sua nova senha</p>
      <form onSubmit={handleSubmit}>
        <div className="new-password-container-group">
          <label>Senha</label>
          <div className="new-password-container-group-input">
            <input
              type={visiblePassword ? "text" : "password"}
              value={password}
              onChange={handlePassword}
              required={true}
              className={isValid ? "valid" : "invalid"}
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
        </div>
        <div className="new-password-container-group">
          <label>Confirmação da senha</label>
          <div className="new-password-container-group-input">
            <input
              type={visibleConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPassword}
              required={true}
              onBlur={handleBlurConfirmPassword}
              className={isValid ? "valid" : "invalid"}
            />

            <button
              type="button"
              onClick={() => toggleConfirmPassword()}
              className="toggle-password-visibility"
            >
              {visibleConfirmPassword ? (
                <img src={HideEye} alt="hide" />
              ) : (
                <img src={VisibleEye} alt="show" />
              )}
            </button>
          </div>
          {!isValid && <span>Senhas não são iguais</span>}
        </div>
        <footer>
          <button type="submit" onClick={handleSubmit} disabled={loading}>
            <span>Enviar</span>
          </button>
        </footer>
      </form>
    </div>
  );
};

export default NewPassword;
