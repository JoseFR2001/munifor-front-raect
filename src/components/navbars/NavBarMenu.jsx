import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import userImage from "../../assets/img/images.png";
import { Link } from "react-router-dom";

const NavBarMenu = ({ profileType }) => {
  return (
    <Menu as="div" className="relative ml-3">
      <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Open user menu</span>
        <img
          alt=""
          src={userImage}
          className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
        />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <MenuItem>
          <Link
            to={`/${profileType}/profile`}
            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
          >
            Your profile
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            to="/login"
            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
          >
            Sign out
          </Link>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default NavBarMenu;
