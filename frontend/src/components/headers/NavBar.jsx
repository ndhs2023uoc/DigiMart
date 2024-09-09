import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { AuthContext } from "../../utilities/providors/AuthProvider";
import Swal from "sweetalert2";

const navLinks = [
  { name: "Home", route: "/" },
  { name: "Instructors", route: "/instructors" },
  { name: "Classes", route: "/classes" },
];

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHome, setIsHome] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [navBg, setNavBg] = useState("bg-transparent");
  const { logout, user } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsHome(location.pathname === "/");
    setIsLogin(location.pathname === "/login");
    setIsFixed(
      location.pathname === "/register" || location.pathname === "/login"
    );
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrollPosition > 10) {
      setNavBg("bg-white text-black shadow-md");
    } else {
      setNavBg(
        isHome || location.pathname === "/"
          ? "bg-transparent text-white"
          : "bg-white text-black"
      );
    }
  }, [scrollPosition, isHome, location]);

  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout me!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(() => {
            Swal.fire({
              title: "Logged Out!",
              text: "Successfully Logged Out.",
              icon: "success",
            });
          })
          .catch((err) => {
            Swal.fire("Error!", err.message, "error");
          });
      }
    });
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${navBg} ${
        isFixed ? "static" : "fixed"
      } top-0 transition-colors duration-500 ease-in-out w-full z-10`}
    >
      <div className="lg:w-[95%] mx-auto sm:px-4 lg:px-6">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex-shrink-0 cursor-pointer pl-7 md:p-0 flex items-center">
            <h1
              onClick={() => navigate("/")}
              className="text-2xl inline-flex gap-3 items-center font-bold"
            >
              DigiMark
              <img src="/logo.png" alt="" className="w-8 h-8" />
            </h1>
            <p className="font-bold text-[13px] tracking-[8px] hidden md:block">
              Quick Explore
            </p>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              className="text-current hover:text-secondary focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>

          <div
            className={`md:hidden ${
              isMenuOpen ? "block" : "hidden"
            } absolute top-full left-0 right-0 bg-white shadow-md`}
          >
            <ul className="px-4 py-2">
              {navLinks.map((link) => (
                <li key={link.route} className="py-2">
                  <NavLink
                    to={link.route}
                    className={({ isActive }) =>
                      `block font-bold ${
                        isActive
                          ? "text-secondary"
                          : "text-current hover:text-secondary"
                      } duration-500`
                    }
                    onClick={toggleMenu}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
              {user ? (
                <>
                  <li className="py-2">
                    <NavLink
                      to="/dashboard"
                      className="block font-bold text-current hover:text-secondary duration-500"
                      onClick={toggleMenu}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <button
                      onClick={(e) => {
                        handleLogout(e);
                        toggleMenu();
                      }}
                      className="block w-full text-left font-bold px-3 py-2 bg-secondary text-white rounded-xl hover:bg-opacity-80 transition duration-300"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="py-2">
                  <NavLink
                    to="/login"
                    className="block font-bold text-current hover:text-secondary duration-500"
                    onClick={toggleMenu}
                  >
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          <div className="hidden md:block">
            <ul className="ml-10 flex items-center space-x-4 pr-4">
              {navLinks.map((link) => (
                <li key={link.route}>
                  <NavLink
                    to={link.route}
                    className={({ isActive }) =>
                      `font-bold ${
                        isActive
                          ? "text-secondary"
                          : "text-current hover:text-secondary"
                      } duration-500`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
              {user ? (
                <>
                  <li>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : "text-current hover:text-secondary"
                        } duration-500`
                      }
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="font-bold px-3 py-2 bg-secondary text-white rounded-xl hover:bg-opacity-80 transition duration-300"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `font-bold ${
                        isActive
                          ? "text-secondary"
                          : "text-current hover:text-secondary"
                      } duration-500`
                    }
                  >
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
