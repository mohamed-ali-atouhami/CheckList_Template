import { useUserContext } from "@/Context/UserContext";
import { EMPLOYE_DASHBOARD_ROUTE, LOGIN_ROUTE, redirectToDashboard } from "@/router";
import { UserApi } from "@/Service/Api/UserApi";
import React, { useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Dropdown_Menu } from "./core/DropDown_Menu";
export default function EmployeLayout(params) {
  const navigate = useNavigate();
  const {
    isAuthenticate,
    setUser,
    setIsAuthenticate,
    logout: ContextLogout,
  } = useUserContext();

  useEffect(() => {
    if (isAuthenticate) {
      UserApi.getUser()
        .then((response) => {
          //console.log(response.data);
          const { role } = response.data;
          console.log(role);
          if (role !== "user") {
            navigate(redirectToDashboard(role));
          }
          setUser(response.data);
          setIsAuthenticate(true);
        })
        .catch(() => {
          ContextLogout();
        });
    } else {
      navigate(LOGIN_ROUTE);
    }
  }, [isAuthenticate]);
  return (
    <>
      <header>
        <div className="items-center justify-between flex bg-gray-800 bg-opacity-90 px-12 py-4 mb-4 mx-auto shadow-2xl">
          <div className="text-2xl text-white font-semibold inline-flex items-center">
            Logo
          </div>
          <div>
            <ul className="flex text-white">
              <li className="ml-5 px-2 py-1">
                <Link className={"flex"} to={EMPLOYE_DASHBOARD_ROUTE}>
                  {" "}
                  Dashboard
                </Link>
              </li>
              <li className="ml-5 px-2 py-1">
                <Dropdown_Menu />
              </li>
            </ul>
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}
