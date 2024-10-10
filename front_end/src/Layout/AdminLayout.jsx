import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  BoxIcon,
  ChevronLeft,
  Clock,
  Columns3Icon,
  Menu,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate} from "react-router-dom";
import { useUserContext } from "@/Context/UserContext";
import {
  ADMIN_DASHBOARD_ROUTE,
  ADMIN_MANAGE_LINES,
  ADMIN_MANAGE_SHIFTS,
  ADMIN_MANAGE_STATIONS,
  ADMIN_MANAGE_USERS,
  LOGIN_ROUTE,
  redirectToDashboard,
} from "@/router";
import { UserApi } from "@/Service/Api/UserApi";
import React, { useEffect } from "react";
import { Dropdown_Menu } from "./core/DropDown_Menu";
import { ModeToggle } from "@/components/mode-toggle";

export default function AdminLayout(params) {
  const [open, setOpen] = useState(true);

  const [activeIndex, setActiveIndex] = useState(null);
  const handleMenuClick = (index) => {
    setActiveIndex(index);
  };
  const Menus = [
    {
      title: "Lines",
      to: ADMIN_MANAGE_LINES,
      icon: <Columns3Icon className="w-5" />,
    },
    {
      title: "Stations",
      to: ADMIN_MANAGE_STATIONS,
      gap: true,
      icon: <BoxIcon className="w-5" />,
    },
    {
      title: "Users",
      to: ADMIN_MANAGE_USERS,
      gap: true,
      icon: <User className="w-5" />,
    },
    {
      title: "Shifts",
      to: ADMIN_MANAGE_SHIFTS,
      gap: true,
      icon: <Clock className="w-5" />,
    },
  ];
  const navigate = useNavigate();
  const {
    isAuthenticate,
    user,
    setUser,
    setIsAuthenticate,
    logout: ContextLogout,
  } = useUserContext();

  useEffect(() => {
    if (isAuthenticate) {
      UserApi.getUser()
        .then((response) => {
          const { role } = response.data;
          console.log(role);
          if (role !== "admin") {
            navigate(redirectToDashboard(role));
          }
          //console.log(response.data);
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
  const Logout = async () => {
    await UserApi.logout().then(() => {
      ContextLogout();
      navigate(LOGIN_ROUTE);
    });
  };
  //ida chi nhar jbarti mochkil khsk f side bar kbira wla chi 7aja , rja3 w-72 n w-60
  return (
    <>
      <div className="flex ">
        <div
          className={` ${
            open ? "w-72" : "w-20 "
          } bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 h-screen p-5  pt-8 relative duration-300 `}
        >
          <ChevronLeft
            className={`absolute cursor-pointer -right-3 text-dark-purple bottom-9 w-6  border-dark-purple
           border-2 rounded-full 
           ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex gap-x-4 items-center">
            <Link to={ADMIN_DASHBOARD_ROUTE}>
              <img
                src="/OP_Logo.png"
                className={`cursor-pointer w-20 duration-500 ${
                  open && "rotate-[360deg]"
                }`}
              />
            </Link>
          </div>

          <div className="pt-6">
            {Menus.map((Menu, index) => (
              <NavLink
                key={index}
                to={Menu.to}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4
                  ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === activeIndex ? "bg-light-white" : ""
                }`}
                onClick={() => handleMenuClick(index)} // Set the active index on click
              >
                {Menu.icon}
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="h-screen flex-1 overflow-y-auto">
          <div className="min-h-full">
            {/*bg-opacity-90 */}
            <Disclosure as="nav" className="bg-gray-900">
              {({ open }) => (
                <>
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                      {/* <div className="flex items-center"></div> */}
                      <div className="hidden md:block w-full">
                        <div className="ml-auto flex items-center justify-end md:ml-6">
                          {/* Profile dropdown and ModeToggle */}
                          <div className="mx-3">
                            <Dropdown_Menu />
                          </div>

                          <ModeToggle />
                        </div>
                      </div>
                      <div className="-mr-2 flex md:hidden">
                        {/* Mobile menu button */}
                        <DisclosureButton className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <X className="block h-6 w-6" aria-hidden="true" />
                          ) : (
                            <Menu
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </DisclosureButton>
                      </div>
                    </div>
                  </div>

                  <DisclosurePanel className="md:hidden">
                    <div className="border-t border-gray-700 pb-3 pt-4">
                      <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                          <User className=" w-9 h-9 bg-black/25 p-2 rounded-full text-white" />
                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium leading-none text-white">
                            {user?.name}
                          </div>
                          <div className="text-sm font-medium leading-none text-gray-400">
                            {user?.email}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 space-y-1 px-2">
                        <DisclosureButton
                          onClick={Logout}
                          as="a"
                          href="#"
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          Sign out
                        </DisclosureButton>
                      </div>
                    </div>
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
            <hr />
            <main>
              <div className=" mx-auto px-10 space-y-4 py-4">
                <div className="w-100 md:w-12/14 border">
                  <Outlet />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
/*max-w-7xl py-6 sm:px-6 lg:px-8 border*/
