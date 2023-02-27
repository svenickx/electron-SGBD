import { createBrowserRouter } from "react-router-dom";
import Home from "../screens/home";
import Tables from "../screens/tables";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/tables/:db",
    element: <Tables />,
  },
]);

export default router;
