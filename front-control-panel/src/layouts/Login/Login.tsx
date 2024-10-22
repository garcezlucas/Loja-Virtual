import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { renderRoute } from "./Routes";
import './_login.scss';

const Login: React.FC = () => {
  const { path } = useParams();

  const [renderPage, setRenderPage] = useState<JSX.Element>(<></>);

  useEffect(() => {
    const newPage = renderRoute(path);

    setRenderPage(newPage);
  }, [path]);

  return (
    <div className="login-container">
      <main className="login-container-main">{renderPage}</main>
    </div>
  );
};

export default Login;
