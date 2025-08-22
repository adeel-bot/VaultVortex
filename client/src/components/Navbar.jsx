import React from "react";
import logo from "../assets/logo-icon.png";
import Theme_switch from "./Switch.jsx";
import contact_light from "../assets/contact-light.svg";
import contact_dark from "../assets/contact-dark.svg";
import { motion, AnimatePresence } from "framer-motion";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import { FaInstagram } from "react-icons/fa";
import "../index.css";
import { github_icon } from "../index.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URI = "http://localhost:3000/user";

const Navbar = ({ theme, saveTheme, showSocialCard, setshowSocialCard }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${API_URI}/logout`,
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
      console.error("Error during logout:", err);
    }
  };

  return (
    <header className=" mx-auto sticky top-0 z-50 lg:max-w-7xl sm:max-w-4xl px-4 md:px-15 backdrop-blur-md bg-transparent/20 shadow-xs ">
      <div className="nav-section flex justify-between items-center">
        <div className="absolute md:right-2 top-39 -right-7 z-55">
          <AnimatePresence>
            {showSocialCard && (
              <motion.div
                initial={{ opacity: 0, x: 40, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`absolute right-14 top-1/2 -translate-y-1/2 w-45 md:w-56 
                  rounded-tl-xl rounded-tr-sm rounded-br-xl rounded-bl-xl 
                  shadow-xl border p-4 flex flex-col gap-3
                  ${
                    theme
                      ? "bg-zinc-900/95 border-zinc-700 text-gray-100 backdrop-blur-md"
                      : "bg-[#FAF6FF] border-white/30 text-gray-800 backdrop-blur-lg"
                  }`}
              >
                <h3 className="text-lg font-semibold">Connect</h3>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://www.github.com/adeel-bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-2 rounded-lg transition-colors duration-200
                      ${
                        theme
                          ? "hover:bg-zinc-800 hover:text-gray-50"
                          : "hover:bg-[#eae5fd91] hover:text-gray-900"
                      }`}
                  >
                    <span>
                      <img
                        width={18}
                        height={18}
                        src={github_icon}
                        alt="github_icon"
                      />
                    </span>
                    <span className="text-sm font-medium">GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/adeel-bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-2 rounded-lg transition-colors duration-200
                      ${
                        theme
                          ? "hover:bg-zinc-800 hover:text-gray-50"
                          : "hover:bg-[#eae5fd91] hover:text-gray-900"
                      }`}
                  >
                    <BriefcaseIcon className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </a>
                  <a
                    href="https://www.instagram.com/adeel_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-2 rounded-lg transition-colors duration-200
                      ${
                        theme
                          ? "hover:bg-zinc-800 hover:text-gray-50"
                          : "hover:bg-[#eae5fd91] hover:text-gray-900"
                      }`}
                  >
                    <FaInstagram className="w-5 h-5 text-pink-500" />
                    <span className="text-sm font-medium">Instagram</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex justify-between gap-1.5 items-center">
          <span>
            <img
              className=" h-11 w-11 md:h-13 md:w-13 rounded-4xl"
              src={logo}
              alt="logo"
            />
          </span>
          <span className="flex flex-col">
            <p className="pixelify-sans-font text-[1.28rem] md:text-2xl mb-[-3px]">
              Vault Vortex
            </p>
            <p className="text-[0.7rem] md:text-sm ">
              Your Vortex of Passwords
            </p>
          </span>
        </div>
        <div className="nav-right flex justify-evenly items-center">
          <div>
            <button
              onClick={handleLogout}
              className={`logout-btn font-medium text-[13px] md:text-[14px] hover:underline
                    ${theme ? "text-[#ae8cee]" : "text-[#6c1290]"}
              `}
            >
              Logout
            </button>
          </div>
          <div className="flex justify-between nav-right-inner">
            <div>
              <Theme_switch theme={theme} saveTheme={saveTheme} />
            </div>
            <div className="relative w-5 h-5 md:w-6 md:h-6">
              <img
                onClick={() => setshowSocialCard((prev) => !prev)}
                src={contact_dark}
                alt="contact-dark"
                className={`absolute top-0 cursor-pointer left-0 w-full h-full ease-in-out will-change-transform transition-opacity duration-200 ${
                  theme ? "opacity-0" : "opacity-100"
                }`}
              />
              <img
                onClick={() => setshowSocialCard((prev) => !prev)}
                src={contact_light}
                alt="contact-light"
                className={`absolute top-0 cursor-pointer rounded-2xl left-0 w-full h-full ease-in-out will-change-transform transition-opacity duration-200 ${
                  theme ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
