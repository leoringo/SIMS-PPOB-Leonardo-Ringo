import { createBrowserRouter, redirect } from "react-router-dom";
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
      element: <Login />,
      loader: async () => {
        let token = localStorage.token
        if(token) {
          return redirect ("/")
        };
        return null
      }
    },
    {
      path: "/register",
      element: <Register />,
      loader: async () => {
        let token = localStorage.token
        if(token) {
          return redirect("/")
        };
        return null
      }
    },
    {
      element: <App />,
      loader: async () => {
        let token = localStorage.token
        if(!token) {
          return redirect("/login")
        };
        return null
      },
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