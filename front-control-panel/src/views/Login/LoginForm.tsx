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
        <header>Seja bem-vindo</header>
        <br />
        <p>
          Para acessar o painel de controle,
          <br />
          por favor, insira suas credenciais.
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
