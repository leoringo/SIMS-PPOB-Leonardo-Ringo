import { createBrowserRouter } from "react-router-dom";
import App from '../App'
import Login from '../views/Login'
import Register from '../views/Register'
import Home from '../views/Home'
import Transaction from "../views/Transaction";
import TopUp from "../views/TopUp";
import Account from "../views/Account";


const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/top-up",
          element: <TopUp />
        },
        {
          path: "/transaction",
          element: <Transaction />
        },
        {
          path: "/profile",
          element: <Account />
        }
      ]
    }
  ]);


export default router