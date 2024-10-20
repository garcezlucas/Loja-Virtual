import Dashboard from "../../views/Dashboard/Dashboard";

export const renderRoute = (page: string | undefined) => {
  switch (page) {
    case "dashboard":
      return <Dashboard />;
    default:
      return <Dashboard />;
  }
};
