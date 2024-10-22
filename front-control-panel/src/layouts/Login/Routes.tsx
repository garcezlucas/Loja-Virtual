import React, { Suspense } from "react";
import LoginForm from "../../views/Login/LoginForm";

const routeMap: Record<string, React.FC<any>> = {
  "": LoginForm,
  login: LoginForm,
};

export const renderRoute = (path: string | undefined) => {
  const Component = routeMap[path || ""] || LoginForm;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
};
