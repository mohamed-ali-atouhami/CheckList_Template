import { createBrowserRouter, Navigate } from "react-router-dom";
import GuestLayout from "./Layout/GuestLayout";
import Login from "./views/Login";
//import DefaultLayout from "./Layout/DefaultLayout";
//import Not_found from "./views/Not_found";
import EmployeLayout from "./Layout/EmployeLayout";
import EmployeDashboard from "./components/Employes/EmployeDashboard";
import AdminLayout from "./Layout/AdminLayout";
import AdminDashboard from "./components/Admins/AdminDashboard";
import Manage_Lines from "./components/Admins/Manage_Lines";
import Manage_Stations from "./components/Admins/Manage_Stations";
import Manage_Users from "./components/Admins/Manage_Users";
import Manage_Shifts from "./components/Admins/Manage_Shifts";

export const LOGIN_ROUTE = "/login";
export const EMPLOYE_DASHBOARD_ROUTE = "/employe/dashboard"

const ADMIN_BASE_ROUTE = "/admin"
export const ADMIN_DASHBOARD_ROUTE = ADMIN_BASE_ROUTE + "/dashboard"
export const ADMIN_MANAGE_LINES = ADMIN_BASE_ROUTE + "/manage-lines"
export const ADMIN_MANAGE_STATIONS = ADMIN_BASE_ROUTE + "/manage-stations"
export const ADMIN_MANAGE_USERS = ADMIN_BASE_ROUTE + "/manage-users"
export const ADMIN_MANAGE_SHIFTS = ADMIN_BASE_ROUTE + "/manage-shifts"

export const redirectToDashboard = (roleType) => {
  switch (roleType) {
    case 'user':
      return (EMPLOYE_DASHBOARD_ROUTE);
    case 'admin':
      return (ADMIN_DASHBOARD_ROUTE);
  }
}
export const router = createBrowserRouter([
  // {
  //   element: <DefaultLayout />,
  //   children: [
  //     {
  //       path: "*",
  //       element: <Not_found />,
  //     },
  //     // {
  //     //   path: "/",
  //     //   element: <Home />,
  //     // },
  //   ],
  // },
  {
    path:'/',
    element: <GuestLayout />,
    children: [
      {
        path:'/',
        element:<Navigate to={LOGIN_ROUTE}/>
      },
      {
        path: LOGIN_ROUTE,
        element: <Login />,
      },
    ],
  },
  {
    element: <EmployeLayout />,
    children: [
      {
        path: EMPLOYE_DASHBOARD_ROUTE,
        element: <EmployeDashboard />,
      },
    ],
  },
  {
    //path: "/",
    element: <AdminLayout />,
    children: [
      // {
      //   path:'/',
      //   element:<Navigate to={ADMIN_DASHBOARD_ROUTE}/>
      // },
      {
        path: ADMIN_DASHBOARD_ROUTE,
        element: <AdminDashboard />,
      },
      {
        path: ADMIN_MANAGE_LINES,
        element: <Manage_Lines/>
      },
      {
        path: ADMIN_MANAGE_STATIONS,
        element: <Manage_Stations/>
      },
      {
        path: ADMIN_MANAGE_USERS,
        element: <Manage_Users/>
      },
      {
        path: ADMIN_MANAGE_SHIFTS,
        element: <Manage_Shifts/>
      }
    ],
  },
]);
