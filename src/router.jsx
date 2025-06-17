import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Register from "./pages/forms/Register";
import Login from "./pages/forms/Login";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/Profile/Profile";
import Data from "./pages/Profile/pages/Data";
import UserConnected from "./components/ProtectedRoutes/UserConnected";
import UserNotConnected from "./components/ProtectedRoutes/UserNotConnected";
import { rootLoader } from "./loaders/rootLoader";
import ForgotPassword from "./pages/forms/Password/ForgotPassword";
import ResetPassword from "./pages/forms/Password/ResetPassword";
import Home from "./pages/Home";
import SearchCard from "./pages/SearchCard";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <App />,
    loader: rootLoader,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: (
          <UserNotConnected>
            <Register />
          </UserNotConnected>
        ),
      },
      {
        path: "/login",
        element: (
          <UserNotConnected>
            <Login />
          </UserNotConnected>
        ),
      },
      {
        path: "/forgot",
        element: (
          <UserNotConnected>
            <ForgotPassword />
          </UserNotConnected>
        ),
      },
      {
        path: "/resetPassword/:token",
        element: (
          <UserNotConnected>
            <ResetPassword />
          </UserNotConnected>
        ),
      },

      {
        path: "/profile",
        element: (
          <UserConnected>
            <Profile />
          </UserConnected>
        ),
        children: [
          {
            path: "data",
            element: <Data />,
          },
        ],
      },
      {
        path: "/search",
        element: <SearchCard />,
      },
    ],
  },
]);
