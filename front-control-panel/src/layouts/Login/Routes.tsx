import React, { Suspense } from "react";
import LoginForm from "../../views/Login/LoginForm";
import RecoveryPassword from "../../views/RecoveryPassword/RecoveryPassword";
import NewPassword from "../../views/NewPassord/NewPassord";

const routeMap: Record<string, React.FC<any>> = {
  "": LoginForm,
  login: LoginForm,
  "recovery-password": RecoveryPassword,
  "new-password": NewPassword,
};

export const renderRoute = (path: string | undefined) => {
  const Component = routeMap[path || ""] || LoginForm;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
};
