import React, { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("../../views/Dashboard/Dashboard"));
const Management = lazy(() => import("../../views/Management/Management"));

const routeMap: Record<string, React.FC<any>> = {
  dashboard: Dashboard,
  management: Management,
};

export const renderRoute = (
  page: string | undefined,
  parameter: string | undefined
) => {
  const Component = routeMap[page || ""] || Dashboard;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component parameter={parameter} />
    </Suspense>
  );
};
