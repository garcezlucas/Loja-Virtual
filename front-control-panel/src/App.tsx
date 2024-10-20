import "./App.scss";
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "./layouts/ErrorBoundary/ErrorBoundary";
import Login from "./layouts/Login/Login";
import System from "./layouts/System/System";

function App() {
  return (
    <ErrorBoundary>
        <Routes>
          {/* ROTAS RELACIONADAS AO LOGIN */}
          <Route index path="/" element={<Login />} />
          <Route index path="/:path" element={<Login />} />

          {/* ROTAS RELACIONADAS AO SISTEMA */}
          <Route index path="/system/:page" element={<System />} />
        </Routes>
    </ErrorBoundary>
  );
}

export default App;
