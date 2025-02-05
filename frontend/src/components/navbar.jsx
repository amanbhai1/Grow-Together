import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions.js";
import { FiUser } from "react-icons/fi";
import { PiStudent } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { IoIosSearch } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineLogout, MdMenu, MdClose } from "react-icons/md";
import GrowTogetherLogo from '../assets/growTogetherLogo.png';

const Navbar = (item) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeNavItem = item.page;

  const handleClick = (route) => {
    navigate(route);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="mt-18 top-0 left-0 w-full bg-white shadow-lg z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <img className="w-48" src={GrowTogetherLogo} alt="Grow Together Logo" />
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <NavItem
            active={activeNavItem === "tutor"}
            onClick={() => handleClick("/tutor")}
            tooltip="Teach"
            Icon={LiaChalkboardTeacherSolid}
          />
          <NavItem
            active={activeNavItem === "learner"}
            onClick={() => handleClick("/learner")}
            tooltip="Learn"
            Icon={PiStudent}
          />
          <NavItem
            active={activeNavItem === "search"}
            onClick={() => handleClick("/search")}
            tooltip="Search"
            Icon={IoIosSearch}
          />
          <NavItem
            active={activeNavItem === "notification"}
            onClick={() => handleClick("/notification")}
            tooltip="Notification"
            Icon={IoMdNotificationsOutline}
          />
          <a
            href="#"
            className="text-gray-700 hover:text-teal-600 transition-all font-medium"
          >
            Become a Mentor
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-teal-600 transition-all font-medium"
          >
            Find a Mentor
          </a>
          <button
            className="px-4 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-all shadow-md hover:shadow-lg"
            onClick={() => handleClick("/signup")}
          >
            Signup
          </button>
          <button
            className="px-4 py-2 text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-600 hover:text-white transition-all shadow-md hover:shadow-lg"
            onClick={() => handleClick("/login")}
          >
            Login
          </button>
          <NavItem
            active={activeNavItem === "profile"}
            onClick={() => handleClick("/profile")}
            tooltip="Profile"
            Icon={FiUser}
          />
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 hover:text-teal-600 focus:outline-none transition-all"
          >
            {isMobileMenuOpen ? (
              <MdClose className="text-2xl" />
            ) : (
              <MdMenu className="text-2xl" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 right-0 w-full bg-white shadow-lg">
            <div className="flex flex-col space-y-4 p-4">
              <MobileNavItem
                active={activeNavItem === "tutor"}
                onClick={() => handleClick("/tutor")}
                text="Teach"
                Icon={LiaChalkboardTeacherSolid}
              />
              <MobileNavItem
                active={activeNavItem === "learner"}
                onClick={() => handleClick("/learner")}
                text="Learn"
                Icon={PiStudent}
              />
              <MobileNavItem
                active={activeNavItem === "search"}
                onClick={() => handleClick("/search")}
                text="Search"
                Icon={IoIosSearch}
              />
              <MobileNavItem
                active={activeNavItem === "notification"}
                onClick={() => handleClick("/notification")}
                text="Notification"
                Icon={IoMdNotificationsOutline}
              />
              <a
                href="#"
                className="text-gray-700 hover:text-teal-600 transition-all font-medium"
              >
                Become a Mentor
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-teal-600 transition-all font-medium"
              >
                Find a Mentor
              </a>
              <button
                className="px-4 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-all shadow-md hover:shadow-lg"
                onClick={() => handleClick("/signup")}
              >
                Signup
              </button>
              <button
                className="px-4 py-2 text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-600 hover:text-white transition-all shadow-md hover:shadow-lg"
                onClick={() => handleClick("/login")}
              >
                Login
              </button>
              <MobileNavItem
                active={activeNavItem === "profile"}
                onClick={() => handleClick("/profile")}
                text="Profile"
                Icon={FiUser}
              />
              <button
                className="flex items-center justify-center px-4 py-2 text-gray-700 hover:text-teal-600 transition-all"
                onClick={handleLogout}
              >
                <MdOutlineLogout className="mr-2" /> Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Desktop NavItem Component
const NavItem = ({ active, onClick, tooltip, Icon }) => {
  return (
    <div className="relative group flex flex-col items-center">
      <button
        className={`p-2 rounded-full transition-all ${
          active
            ? "text-teal-600 scale-95 shadow-[0_0_7px_rgb(0,128,128)]"
            : "text-gray-700 hover:text-teal-600 hover:scale-95 hover:shadow-[0_0_3px_rgb(173,216,230)]"
        }`}
        onClick={onClick}
      >
        <Icon className="text-2xl" />
      </button>
      <span className="absolute bottom-[110%] left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-gray-700 text-white rounded opacity-0 transition-all group-hover:opacity-100">
        {tooltip}
      </span>
      <div
        className={`w-1 h-[70%] ${
          active ? "bg-teal-600 shadow-[0_0_15px_teal]" : "bg-transparent"
        } rounded-full transition-all`}
      ></div>
    </div>
  );
};

// Mobile NavItem Component
const MobileNavItem = ({ active, onClick, text, Icon }) => {
  return (
    <button
      className={`flex items-center space-x-2 p-2 w-full text-left rounded-lg transition-all ${
        active
          ? "text-teal-600 bg-teal-50 shadow-md"
          : "text-gray-700 hover:text-teal-600 hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      <Icon className="text-xl" />
      <span className="font-medium">{text}</span>
    </button>
  );
};

export default Navbar;