import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Signin from "../pages/signin";
import { Suspense } from "react";
import Account from "../layouts/account/main";
import Dashboard from "../pages/dashboard";
import Signup from "../pages/signup";
import Logout from "../pages/logout";
import Reset from "../pages/reset";


const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  {
    path:"/",
    element:(
      <Account/>
    ),
    children:[
      {
        path:"dashboard",
        element:
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <Dashboard/>
        </Suspense>
      },
      {
        path:"signin",
        element:
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <Signin/>
        </Suspense>
      },
      {
        path:"signup",
        element:
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <Signup/>
        </Suspense>
      },
      {
        path:"reset",
        element:
        <ProtectedRoute>
          <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
            <Reset/>
          </Suspense>
        </ProtectedRoute>
      }
    ]
  },
  {
    path:"*",
    element:<Navigate to="/dashboard" replace/>
  },
  {
    path:"/logout",
    element:
    <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
      <Logout/>
    </Suspense>
  },
]);

export default router;
