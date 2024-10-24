import "./_recoveryPassword.scss";
import { useNavigate } from "react-router-dom";
import { useRecoveryPassword } from "./useRecoveryPassword";

const RecoveryPassword: React.FC = () => {
  const navigate = useNavigate();

  const {
    email,
    isValid,
    loading,

    handleSubmit,
    handleEmail,
    handleEmailBlur,
  } = useRecoveryPassword({ navigate });

  return (
    <div className="recovery-password-container">
      <header>Recuperação de senha</header>
      <p>
        Para recuperar sua senha, por favor, insira seu email.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="recovery-password-container-group">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={handleEmail}
            onBlur={handleEmailBlur}
            required={true}
            className={isValid ? "valid" : "invalid"}
          />
          {!isValid && <span>Email inválido</span>}
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

export default RecoveryPassword;
