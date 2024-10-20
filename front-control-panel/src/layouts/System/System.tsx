import './_system.scss';
import { useEffect, useState } from "react";
import { renderRoute } from "./Routes";
import { useParams } from "react-router-dom";
import Header from "./Header/Header";
import Menu from "./Menu/Menu";

const System: React.FC = () => {
  const { page } = useParams();

  const [renderPage, setRenderPage] = useState<JSX.Element>(<></>);

  useEffect(() => {
    const newPage = renderRoute(page);

    setRenderPage(newPage);
  }, [page]);

  return (
    <div className="system-container">
      <header>
        <Header />
      </header>
      <aside>
        <Menu />
      </aside>

      <main>{renderPage}</main>
    </div>
  );
};

export default System;
