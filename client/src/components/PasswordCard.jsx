import { React, useRef, useEffect } from "react";
import ClipURL from "../utils/ClipURL";
import {
  edit_dark,
  edit_light,
  delete_icon,
  lock_dark,
  lock_light,
  person_dark,
  person_light,
  visible_dark,
  visible_light,
  invisible_dark,
  invisible_light,
  copy_dark,
  copy_light,
  web_icon,
} from "../index";
import IconSwap from "../services/IconSwap";
import "../index.css";
import StrenghtBar from "../services/StrengthBar";
import formatAddedDate from "../utils/formatDate";
import { motion } from "framer-motion";

const PasswordCard = ({
  website,
  username,
  password,
  date,
  theme,
  showPass,
  handleShowPass,
  handleCopy,
  handleEditCard,
  manageDelete,
  isNew,
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (isNew && cardRef.current) {
      requestAnimationFrame(() => {
        cardRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
    }
  }, [isNew]);

  return (
    <motion.div
      ref={cardRef}
      initial={isNew ? { boxShadow: "0 0 0px rgba(0,0,0,0)" } : false}
      transition={{
        duration: 1.2,
        ease: "easeInOut",
      }}
      className=" w-full h-full flex flex-col justify-center gap-5 md:gap-4 pl-2 pr-2 pt-1 pb-1 md:pl-3 md:pr-3 md:pt-2 md:pb-2"
    >
      {/* Card Top */}
      <div className="card-top flex justify-between  px-1 py-2  md:px-2 md:py-2 items-center">
        <div className="card-top-left flex items-center gap-2">
          <div className="icon-transition flex items-center justify-center w-6 h-6 ">
            <img className=" w-full h-full" src={web_icon} alt="web-icon" />
          </div>
          <h1 className="text-[15px] md:text-[17px] font-semibold relative top-0.5">
            {website ? ClipURL(website) : "Personal Account"}
          </h1>
        </div>

        <div className="card-top-right flex justify-between items-center gap-3 md:gap-4">
          <div
            className="icon-transition relative h-5 w-5 cursor-pointer transition ease-in-out will-change-transform hover:scale-[1.1] "
            onClick={handleEditCard}
          >
            <IconSwap
              lightIcon={edit_light}
              darkIcon={edit_dark}
              theme={theme}
              size={19}
              alt="edit icon"
            />
          </div>

          <div
            className="delete-icon flex justify-center cursor-pointer transition ease-in-out will-change-transform items-center h-6.5 w-6.5 "
            onClick={manageDelete}
          >
            <img className="h-5 w-5" src={delete_icon} alt="delete icon" />
          </div>
        </div>
      </div>

      {/* Card Middle */}
      <div className="card-mid h-25 px-1 md:h-28 w-full flex flex-col gap-3.5 md:gap-5 justify-center ">
        {/* Username */}
        <div
          className={`username-cont flex items-center justify-between  p-3 rounded-xl w-full
                       ${theme ? "bg-zinc-900" : "bg-[#e0e0e06b]"}
                  `}
        >
          {/* Left side */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-5 h-5">
              <IconSwap
                lightIcon={person_light}
                darkIcon={person_dark}
                theme={theme}
                size={18}
                alt="person icon"
              />
            </div>
            <span className="text-[13px] md:text-[15px] leading-none relative top-0.5">
              {username}
            </span>
          </div>

          {/* Right side */}
          <div
            className="icon-transition flex items-center justify-center h-[13px] w-[13px] md:w-5 md:h-5 hover:scale-[1.05]"
            onClick={() => handleCopy(username)}
          >
            <div
              className={`relative flex justify-center items-center h-full w-full`}
            >
              {theme ? (
                <img
                  src={copy_light}
                  alt="copy-icon"
                  className={` m-3.5 h-3.5 ${
                    theme ? "opacity-100" : "opacity-0"
                  }`}
                />
              ) : (
                <img
                  src={copy_dark}
                  alt="copy-icon"
                  className={`m-3.5 h-3.5 ${
                    theme ? "opacity-0" : "opacity-100"
                  }`}
                />
              )}
            </div>
          </div>
        </div>

        {/* Password */}
        <div
          className={`password flex items-center justify-between p-3 rounded-xl w-full 
                      ${theme ? "bg-zinc-900" : "bg-[#e0e0e06b]"}
                  `}
        >
          {/* Left side */}
          <div className="flex items-center gap-2.5 ">
            <div className="flex items-center justify-center w-5 h-5">
              <IconSwap
                lightIcon={lock_light}
                darkIcon={lock_dark}
                theme={theme}
                size={17}
                alt="lock icon"
              />
            </div>
            <div className="text-[13px] md:text-[15px] leading-none relative top-0.5">
              <p className="max-w-[200px] overflow-hidden whitespace-nowrap">
                {showPass
                  ? password.length > 17
                    ? password.slice(0, 14) + " . . ."
                    : password
                  : password.length > 17
                  ? "•".repeat(19)
                  : "•".repeat(password.length)}
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4.5 md:gap-3">
            {/* Show/Hide Password */}
            {!theme && (
              <div
                className="icon-transition flex items-center justify-center w-4 h-4 cursor-pointer"
                onClick={handleShowPass}
              >
                <img
                  src={visible_dark}
                  alt="visible icon"
                  className={`h-4 w-4 ${
                    !showPass ? "opacity-100" : "opacity-0"
                  }`}
                />
                <img
                  src={invisible_dark}
                  alt="invisible icon"
                  className={`h-4 w-4 absolute ${
                    !showPass ? "opacity-0" : "opacity-100"
                  }`}
                />
              </div>
            )}
            {theme && (
              <div
                className="icon-transition flex items-center justify-center w-4 h-4 cursor-pointer"
                onClick={handleShowPass}
              >
                <img
                  src={visible_light}
                  alt="visible icon"
                  className={`h-4 w-4 ${
                    !showPass ? "opacity-100" : "opacity-0"
                  }`}
                />
                <img
                  src={invisible_light}
                  alt="invisible icon"
                  className={`h-4 w-4 absolute ${
                    !showPass ? "opacity-0" : "opacity-100"
                  }`}
                />
              </div>
            )}

            {/* Copy Icon */}
            <div
              className="icon-transition flex items-center justify-center h-[13px] w-[13px] md:w-5 md:h-5 hover:scale-[1.05]"
              onClick={() => handleCopy(password)}
            >
              <div
                className={`relative flex justify-center items-center h-full w-full`}
              >
                {theme ? (
                  <img
                    src={copy_light}
                    alt="copy-icon"
                    className={` m-3.5 h-3.5 ${
                      theme ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ) : (
                  <img
                    src={copy_dark}
                    alt="copy-icon"
                    className={`m-3.5 h-3.5 ${
                      theme ? "opacity-0" : "opacity-100"
                    }`}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Bottom */}
      <div className="card-bottom flex flex-col gap-1 w-full px-1 md:py-1 md:px-1">
        <div className="flex justify-between items-center ">
          <div
            className={`pl-1.5 text-[13px] md:text-[13px] flex justify-center items-center  ${
              theme ? "text-[#ffffffe2]" : "text-black"
            }`}
          >
            {formatAddedDate(date)}
          </div>
          <div className="flex justify-center items-center gap-2">
            <StrenghtBar password={password} theme={theme} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PasswordCard;
