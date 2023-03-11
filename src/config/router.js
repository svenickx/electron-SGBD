import { createBrowserRouter } from "react-router-dom";
import Databases from "../screens/databases";
import DataTable from "../screens/dataTable";
import Home from "../screens/home";
import Tables from "../screens/tables";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/databases",
    element: <Databases />,
  },
  {
    path: "/tables/:db",
    element: <Tables />,
  },
  {
    path: "/dataTable/:dbName/:tableName",
    element: <DataTable />,
  },
]);

export default router;
