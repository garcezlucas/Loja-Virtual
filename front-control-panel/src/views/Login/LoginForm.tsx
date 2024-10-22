import { useNavigate } from "react-router-dom";
import DynamicForm from "../../components/DynamicForm/DynamicForm";
import "./_loginForm.scss";
import { useLoginForm } from "./useLogin";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const { fields, handleSubmit, handleCancel, handleChange } =
    useLoginForm({ navigate });

  return (
    <div className="loginForm-container">
      <div className="loginForm-container-fix">
        <header>Seja bem-vindo à Loja Virtual</header>
        <br />
        <p>
          Para acessar o sistema,
          <br />
          por favor, insira seu e-mail e senha.
        </p>
        <DynamicForm
          title=""
          fields={fields}
          handleSubmit={handleSubmit}
            handleCancel={handleCancel}
          handleChange={handleChange}
          labelColor="#FAFAFA"
          titleSubmitButton="Entrar"
          titleCancelButton='Limpar'
        />
      </div>
    </div>
  );
};

export default LoginForm;
