
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions.js";
import { FiUser } from "react-icons/fi";
import { PiStudent } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { IoIosSearch } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineLogout, MdMenu, MdClose } from "react-icons/md";
import GrowTogetherLogo from '../assets/growTogetherLogo.png';
// import { use } from "react";

const Navbar = (item) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const user = useSelector(state => state.user);
  console.log(user);

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
    <nav className="top-0 left-0 z-50 bg-white shadow-lg mt-18 w-full">
      <div className="flex justify-between items-center mx-auto px-4 py-3 container">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <img className="w-48" src={GrowTogetherLogo} alt="Grow Together Logo" />
        </div>

        {/* Desktop Navigation Links */}
        <div className="md:flex items-center space-x-8 hidden">
          {
            (user.isLoggedIn && user.user.isAdmin) ? (<>
              <NavItem
                active={activeNavItem === "tutor"}
                onClick={() => handleClick("/tutor")}
                tooltip="Teach"
                Icon={LiaChalkboardTeacherSolid}
              /></>) : <></>
          }
          {
            (user.isLoggedIn && user.user.isAdmin) ? (<>
            </>) : <>
              <NavItem
                active={activeNavItem === "learner"}
                onClick={() => handleClick("/learner")}
                tooltip="Learn"
                Icon={PiStudent}
              />
            </>
          }
          {
            (user.isLoggenIn && user.user.isAdmin) ? (<></>)
              : (
                <NavItem
                  active={activeNavItem === "search"}
                  onClick={() => handleClick("/search")}
                  tooltip="Search"
                  Icon={IoIosSearch}
                />
              )
          }

          <NavItem
            active={activeNavItem === "notification"}
            onClick={() => handleClick("/notification")}
            tooltip="Notification"
            Icon={IoMdNotificationsOutline}
          />
          {
            (user.isLoggedIn && user.user.isAdmin) ? (<></>)
              : (
                <a
                  href="/signup"
                  className="font-medium text-gray-700 hover:text-teal-600 transition-all"
                >
                  Become a Mentor
                </a>
              )
          }
          
          {
            (user.isLoggedIn && user.user.isAdmin) ? (<></>)
              : (
                <a
            href="/"
            className="font-medium text-gray-700 hover:text-teal-600 transition-all"
          >
            Find a Mentor
          </a>
              )
          }

          <div className="font-semibold text-teal-500">
            {(user.isLoggedIn) ? user.user.name : ''}
            
          </div>
          {(user.isLoggedIn && user.user.isAdmin==false) ? (
            <NavLink to='/ai-feedback'>
              <a
            href="/ai-feedback"
            className="bg-gradient-to-r from-teal-600 hover:from-teal-700 to-purple-600 hover:to-teal-700 p-2 rounded-lg font-medium text-white transition-all"
          >
            AI Mentor 
          </a>
            </NavLink>
          ) : null}
          {(user.isLoggedIn) ? (
            <button
              className="bg-teal-600 hover:bg-teal-800 px-4 py-2 rounded font-bold text-white"
              onClick={() => handleLogout()}>Logout</button>
          ) : (
            <>
              <button
                className="bg-teal-600 hover:bg-teal-700 shadow-md hover:shadow-lg px-4 py-2 rounded-lg text-white transition-all"
                onClick={() => handleClick("/signup")}
              >
                Signup
              </button>
              <button
                className="hover:bg-teal-600 shadow-md hover:shadow-lg px-4 py-2 border border-teal-600 rounded-lg text-teal-600 hover:text-white transition-all"
                onClick={() => handleClick("/login")}
              >
                Login
              </button>
            </>
          )
          }

          {
            (user.isLoggedIn) ? (
              <NavItem
                active={activeNavItem === "profile"}
                onClick={() => handleClick("/stdash")}
                tooltip="Profile"
                Icon={FiUser}
              />)
              : <>
              </>

          }

        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="right-7 absolute md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 hover:text-teal-600 focus:outline-none transition-all"
          >
            {isMobileMenuOpen ? (
              <MdClose className="text-4xl"/>
            ) : (
              <MdMenu className="text-4xl" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="top-28 right-2 z-[100] absolute md:hidden bg-white shadow-xl px-2 py-3 border w-[60%] sm:w-1/2">
            <div className="flex flex-col items-center gap-5 px-4">
              {
                (user.isLoggedIn && user.user.isAdmin) ? (<>
                  <NavItem
                    active={activeNavItem === "tutor"}
                    onClick={() => handleClick("/tutor")}
                    tooltip="Teach"
                    Icon={LiaChalkboardTeacherSolid}
                  /></>) : <></>
              }
              {
                (user.isLoggedIn && user.user.isAdmin) ? (<>
                </>) : <>
                  <NavItem
                    active={activeNavItem === "learner"}
                    onClick={() => handleClick("/learner")}
                    tooltip="Learn"
                    Icon={PiStudent}
                  />
                </>
              }
              {
                (user.isLoggenIn && user.user.isAdmin) ? (<></>)
                  : (
                    <NavItem
                      active={activeNavItem === "search"}
                      onClick={() => handleClick("/search")}
                      tooltip="Search"
                      Icon={IoIosSearch}
                    />
                  )
              }

              <NavItem
                active={activeNavItem === "notification"}
                onClick={() => handleClick("/notification")}
                tooltip="Notification"
                Icon={IoMdNotificationsOutline}
              />
              {
                (user.isLoggedIn && user.user.isAdmin) ? (<></>)
                  : (
                    <a
                      href="/signup"
                      className="font-medium text-gray-700 hover:text-teal-600 transition-all"
                    >
                      Become a Mentor
                    </a>
                  )
              }

              <a
                href="/"
                className="font-medium text-gray-700 hover:text-teal-600 transition-all"
              >
                Find a Mentor
              </a>
              <div className="font-semibold text-teal-500">
                {(user.isLoggedIn) ? user.user.name : ''}
              </div>
              {(user.isLoggedIn) ? (
                <button
                  className="bg-teal-600 hover:bg-teal-800 px-4 py-2 rounded font-bold text-white"
                  onClick={() => handleLogout()}>Logout</button>
              ) : (
                <>
                  <button
                    className="bg-teal-600 hover:bg-teal-700 shadow-md hover:shadow-lg px-4 py-2 rounded-lg text-white transition-all"
                    onClick={() => handleClick("/signup")}
                  >
                    Signup
                  </button>
                  <button
                    className="hover:bg-teal-600 shadow-md hover:shadow-lg px-4 py-2 border border-teal-600 rounded-lg text-teal-600 hover:text-white transition-all"
                    onClick={() => handleClick("/login")}
                  >
                    Login
                  </button>
                </>
              )
              }
              {
                (user.isLoggedIn) ? (
                  <NavItem
                    active={activeNavItem === "profile"}
                    onClick={() => handleClick("/stdash")}
                    tooltip="Profile"
                    Icon={FiUser}
                  />)
                  : <>
                  </>

              }
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
    <div className="group relative flex flex-col items-center">
      <button
        className={`p-2 rounded-full transition-all ${active
          ? "text-teal-600 scale-95 shadow-[0_0_7px_rgb(0,128,128)]"
          : "text-gray-700 hover:text-teal-600 hover:scale-95 hover:shadow-[0_0_3px_rgb(173,216,230)]"
          }`}
        onClick={onClick}
      >
        <Icon className="text-2xl" />
      </button>
      <span className="bottom-[110%] left-1/2 absolute bg-gray-700 opacity-0 group-hover:opacity-100 px-2 py-1 rounded text-white text-xs transition-all -translate-x-1/2">
        {tooltip}
      </span>
      <div
        className={`w-1 h-[70%] ${active ? "bg-teal-600 shadow-[0_0_15px_teal]" : "bg-transparent"
          } rounded-full transition-all`}
      ></div>
    </div>
  );
};

// Mobile NavItem Component
const MobileNavItem = ({ active, onClick, text, Icon }) => {
  return (
    <button
      className={`flex items-center space-x-2 p-2 w-full text-left rounded-lg transition-all ${active
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