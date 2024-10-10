import { useUserContext } from "@/Context/UserContext";
import { UserApi } from "@/Service/Api/UserApi";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LOGIN_ROUTE } from "@/router";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { Fragment } from "react";

export function Dropdown_Menu() {
  const { user, logout: ContextLogout } = useUserContext();
  const navigate = useNavigate();
  const Logout = async () => {
    await UserApi.logout().then(() => {
      ContextLogout();
      navigate(LOGIN_ROUTE)
    })
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className=" rounded-full text-sm focus:ring-2 focus:ring-white" >
          <User className="mr-2 h-4 w-4" /> {user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={Logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    // <Menu as="div" className="relative ml-3">
    //   <div>
    //     <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
    //       <span className="absolute -inset-1.5" />
    //       <span className="sr-only">Open user menu</span>
    //       <User className=" w-9 h-9 bg-black/25 p-2 rounded-full text-white" />
    //       <div className="text-base m-2 font-medium leading-none text-white">{user?.name}</div>
    //     </MenuButton>
    //   </div>
    //   <Transition
    //     as={Fragment}
    //     enter="transition ease-out duration-100"
    //     enterFrom="transform opacity-0 scale-95"
    //     enterTo="transform opacity-100 scale-100"
    //     leave="transition ease-in duration-75"
    //     leaveFrom="transform opacity-100 scale-100"
    //     leaveTo="transform opacity-0 scale-95"
    //   >
    //     <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
    //       <MenuItem >
    //         <a
    //           href='#'
    //           onClick={Logout}
    //           className={'block px-4 py-2 text-sm text-gray-700'}
    //         >
    //           Log out
    //         </a>
    //       </MenuItem>
    //     </MenuItems>
    //   </Transition>
    // </Menu>
  );
}
