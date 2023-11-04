import {createBrowserRouter} from "react-router-dom";
import Root from "../mainLayout/Root";
import Home from "../pages/home/Home";
import StudentData from "../pages/studentAllData/StudentData";
import Update from "../components/studentUpdate/Update";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import User from "../pages/allUser/User";
import PrivateRoutes from "./PrivateRoutes";


const myCreateRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/studentData",
        element: (
          <PrivateRoutes>
            <StudentData />
          </PrivateRoutes>
        ),
      },
      {
        path: "/studentUpdate/:id",
        element: <Update />,
        loader: ({params}) =>
          fetch(`http://localhost:5000/studentInfo/${params.id}`),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/user",
        element: (
          <PrivateRoutes>
            <User/>
          </PrivateRoutes>
        ),
        loader: () => fetch("http://localhost:5000/users"),
      },
    ],
  },
]);

export default myCreateRouter;
