import { useUserContext } from "@/Context/UserContext";
import { ADMIN_DASHBOARD_ROUTE, EMPLOYE_DASHBOARD_ROUTE } from "@/router";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
export default function GuestLayout() {
  const navigate = useNavigate();
  const { isAuthenticate, user } = useUserContext();

  useEffect(() => {
    if (isAuthenticate) {
      if (user?.role === "user") {
        navigate(EMPLOYE_DASHBOARD_ROUTE);
      } else if (user?.role === "admin") {
        navigate(ADMIN_DASHBOARD_ROUTE);
      }
    }
  }, [isAuthenticate]);
  return (
    <>
      {/* <header>
        <div className="items-center justify-between flex bg-gray-800 bg-opacity-90 px-12 py-4 mb-4 mx-auto ">
          <div className="text-2xl text-white font-semibold inline-flex items-center">
            Logo
          </div>
          <div>
            <ul className="flex text-white">
              <li className="ml-5 px-2 py-1">
                <Link className={"flex"} to={"/"}>
                  {" "}
                  <HomeIcon className="mx-1" /> Home page
                </Link>
              </li>
              <li className="ml-5 px-2 py-1">
                <Link className={"flex"} to={LOGIN_ROUTE}>
                  {" "}
                  <LogInIcon className="mx-1" /> Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header> */}
      <main>
        <Outlet />
      </main>
    </>
  );
}
