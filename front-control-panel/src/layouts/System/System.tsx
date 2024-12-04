import "./_system.scss";
import { useEffect, useState } from "react";
import { renderRoute } from "./Routes";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header/Header";
import Menu from "./Menu/Menu";
import { getFromLocalStorageDecrypted } from "../../utils/encryptStorage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const System: React.FC = () => {
  const { page, parameter } = useParams();
  const navigate = useNavigate();

  const queryClient = new QueryClient();

  const [renderPage, setRenderPage] = useState<JSX.Element>(<></>);
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [permissions, setPermissions] = useState<string[]>([]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const logout = () => {
    localStorage.removeItem("cookies");
    navigate("/login");
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const token = localStorage.getItem("cookies");
      const permissions = await getFromLocalStorageDecrypted("permissions");
      setPermissions(permissions);

      if (!token) {
        logout();
        navigate("/login");
      }

      if (isMounted) {
        setTimeout(() => {
          fetchData();
        }, 500000);
      }
    };
    fetchData();

    return () => {
      isMounted = false;
    };
  }, [page]);

  useEffect(() => {
    const newPage = renderRoute(page, parameter);

    setRenderPage(newPage);
  }, [page, parameter]);

  return (
    <div className={`system-container${!showMenu ? "-allMain" : ""}`}>
      <header>
        <Header
          toggleMenu={toggleMenu}
          logout={logout}
          permissions={permissions}
        />
      </header>
      {showMenu && (
        <aside>
          <Menu permissions={permissions} />
        </aside>
      )}
      <main>
        <QueryClientProvider client={queryClient}>
          {renderPage}
        </QueryClientProvider>
      </main>
    </div>
  );
};

export default System;
