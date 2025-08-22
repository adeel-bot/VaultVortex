import { useState, useEffect, memo } from "react";
import "../index.css";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import IconSwap from "../services/IconSwap";
import generateStrongPassword from "../utils/PasswordGenerator";
import EditPopup from "../components/EditCard";
import { motion, AnimatePresence } from "framer-motion";
import { scroller, animateScroll as scroll } from "react-scroll";
import { ToastContainer, toast } from "react-toastify";
import {
  back_to_top,
  add_light,
  add_dark,
  tornado_icon,
  person_dark,
  person_light,
  visible_dark,
  visible_light,
  invisible_dark,
  invisible_light,
  web_dark_globe,
  web_light_globe,
  create_pass_dark_icon,
  create_pass_light_icon,
} from "../index";
import PasswordCard from "../components/PasswordCard";
import { Slide } from "react-toastify/unstyled";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URI = process.env.REACT_APP_API_URL || "http://localhost:3000/api/vortex";

const Card = memo(
  ({
    rec,
    i,
    theme,
    lastAddedId,
    showPass,
    cardToEdit,
    deleteId,
    handleShowPass,
    handleCopy,
    handleEditCard,
    manageDelete,
  }) => (
    <motion.div
      key={rec._id}
      layout
      initial={{
        opacity: 0,
        y: 15,
        boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
        borderWidth: "1.5px",
        borderStyle: "solid",
        borderColor: theme ? "rgba(107, 55, 204, 0.4)" : "#c6c6c6",
        transition: {
          duration: lastAddedId === rec._id ? 0.5 : 0.28,
          ease: lastAddedId === rec._id ? [0.4, 0, 0.2, 1] : "easeOut",
          delay: i * 0.05,
        },
      }}
      animate={{
        opacity: 1,
        y: 0,
        borderColor: theme ? "rgba(107, 55, 204, 0.4)" : "#c6c6c6",
        ...(lastAddedId === rec._id
          ? {
              boxShadow: "1px 4px 45px rgba(107, 55, 204, 0.25)",
              transition: {
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
              },
            }
          : {}),
      }}
      exit={{
        opacity: 0,
        y: -15,
        scale: 0.95,
        transition: {
          duration: 0.3,
          ease: "linear",
        },
      }}
      whileHover={
        theme
          ? {
              y: -4,
              borderColor: "rgba(0, 0, 0, 0)",
              boxShadow: `
              6px 6px 16px rgba(107, 55, 204, 0.18), 
              -6px -6px 16px rgba(60, 30, 90, 0.5)
            `,
              transition: {
                borderColor: { duration: 0 },
                y: { duration: 0.3 },
                boxShadow: { duration: 0.3 },
              },
            }
          : {
              y: -4,
              borderColor: "rgba(0, 0, 0, 0)",
              boxShadow: `
              6px 6px 12px #c6c6c6, 
              -6px -6px 12px #ffffff
            `,
              transition: {
                borderColor: { duration: 0 },
                y: { duration: 0.3 },
                boxShadow: { duration: 0.3 },
              },
            }
      }
      style={{
        borderRadius: "1rem",
      }}
      className="card w-full flex justify-center p-2 items-center border rounded-xl will-change-transform will-change-opacity"
    >
      <PasswordCard
        website={rec.website}
        username={rec.username}
        password={rec.password}
        date={rec.dateAdded}
        theme={theme}
        showPass={showPass === rec._id}
        cardToEdit={cardToEdit === rec._id}
        handleShowPass={() => handleShowPass(rec._id)}
        handleCopy={handleCopy}
        handleEditCard={() => handleEditCard(rec._id)}
        deleteId={deleteId === rec._id}
        manageDelete={() => manageDelete(rec._id)}
        isNew={lastAddedId === rec._id}
      />
    </motion.div>
  )
);

function App({ theme, setTheme }) {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const res = await axios.get(API_URI, { withCredentials: true });
        setRecords(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login");
        }
        console.error("Error fetching passwords:", err);
      }
    };
    fetchPasswords();
  }, []);

  const [showPass, setshowPass] = useState(null);
  const [cardToEdit, setCardToEdit] = useState(null);
  const [lastAddedId, setLastAddedId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showSocialCard, setshowSocialCard] = useState(false);

  useEffect(() => {
    if (lastAddedId) {
      const timer = setTimeout(() => {
        setLastAddedId(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [lastAddedId]);

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast("Copied to Clipboard!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme ? "light" : "dark",
          transition: Slide,
        });
      })
      .catch((err) => {
        console.error("Failed to copy!", err);
      });
  };

  const saveTheme = () => {
    const newTheme = !theme;
    setTheme(newTheme);
    localStorage.setItem("isDark", JSON.stringify(newTheme));
  };

  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const newEntry = {
        website: data.website,
        username: data.username,
        password: data.password,
      };

      const res = await axios.post(API_URI, newEntry, {
        withCredentials: true,
      });
      setRecords([...records, res.data]);
      setLastAddedId(res.data._id);
      reset();
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
      console.error("Error saving password:", err);
    }
  };

  const handleShowPass = (id) => {
    setshowPass((prevId) => (prevId === id ? null : id));
  };

  const handleEditCard = (id) => {
    setCardToEdit((prevId) => (prevId === id ? null : id));
  };

  const handlePasswordGeneration = () => {
    const newPass = generateStrongPassword();
    setValue("password", newPass);
  };

  const handleSave = async (data) => {
    try {
      const res = await axios.patch(`${API_URI}/${cardToEdit}`, data, {
        withCredentials: true,
      });
      setRecords(
        records.map((record) => (record._id === cardToEdit ? res.data : record))
      );
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
      console.error("Error Updating data:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URI}/${id}`, { withCredentials: true });
      const updatedList = records.filter((item) => item._id !== id);
      setRecords(updatedList);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
      console.error("Error deleting password:", err);
    }

    setTimeout(() => setDeleteId(null), 300);
    setShowDelete(false);
    toast("Password Deleted Successfully!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme ? "light" : "dark",
      transition: Slide,
    });
  };

  const manageDelete = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const handleInputFocus = () => {
    const isSmallScreen = window.innerWidth < 768;
    if (isSmallScreen) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        setFocus("website");
      }, 600);
    } else {
      scroller.scrollTo("websiteContainer", {
        duration: 500,
        smooth: "easeOutCubic",
        offset: -180,
      });
      setTimeout(() => {
        setFocus("website");
      }, 503);
    }
  };

  const handleScroll = () => {
    const isSmallScreen = window.innerWidth < 768;
    if (isSmallScreen) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      scroll.scrollToTop({
        duration: 700,
        smooth: "easeOutCubic",
      });
    }
  };

  return (
    <div className={` ${theme ? "isDark" : ""} min-h-screen `}>
      <Navbar
        theme={theme}
        saveTheme={saveTheme}
        showSocialCard={showSocialCard}
        setshowSocialCard={setshowSocialCard}
      />

      <div
        className="mx-auto lg:max-w-6xl sm:max-w-4xl pl-12 pr-12 pt-12 pb-3 space-y-5 "
        onClick={() => setshowSocialCard(false)}
      >
        <div className="heading flex justify-center items-center space-x-3 mb-7 ">
          <span className="lock-icon relative inline-block h-6 w-6 md:h-8 md:w-8">
            <img
              src={add_light}
              alt="add-light"
              className={`absolute top-0 left-0 h-full w-full ${
                theme ? "opacity-100" : "opacity-0"
              }`}
            />
            <img
              src={add_dark}
              alt="add-dark"
              className={`absolute top-0 left-0 h-full w-full ${
                theme ? "opacity-0" : "opacity-100"
              }`}
            />
          </span>
          <h1 className="text-[22px] md:text-[28px] font-semibold">
            Add New Password
          </h1>
        </div>

        {/* ----------------------- INPUT CONTAINER -------------------*/}

        <div className="input-container">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="input_form text-sm md:text-[16px] grid grid-cols-1 md:grid-cols-3 gap-y-5 md:gap-y-10 gap-x-5 mx-auto justify-items-center"
          >
            <div className="w-full relative md:h-13 h-11 flex justify-center items-center overflow-hidden rounded-xl">
              <input
                className="w-full h-10 px-3 py-5 md:px-4 md:py-6 border-2 rounded-xl"
                placeholder="Website URL"
                type="text"
                {...register("website")}
                id="websiteContainer"
              />
              <div className="icon-transition absolute right-4 ">
                <IconSwap
                  lightIcon={web_light_globe}
                  darkIcon={web_dark_globe}
                  theme={theme}
                  size={22}
                  alt="web icon"
                />
              </div>
            </div>

            <div className="w-full md:h-13 h-11 relative flex justify-center rounded-xl items-center overflow-hidden">
              <input
                className="w-full h-10 px-3 py-5 md:px-4 md:py-6 border-2 rounded-xl"
                placeholder="Username / Email"
                type="text"
                spellCheck="false"
                {...register("username", {
                  minLength: {
                    value: 4,
                    message: "Minimum length of username is 4 characters",
                  },
                  required: { value: true, message: "Username is required" },
                })}
              />
              <div className="icon-transition absolute right-4">
                <IconSwap
                  lightIcon={person_light}
                  darkIcon={person_dark}
                  theme={theme}
                  size={22}
                  alt="web icon"
                />
              </div>
            </div>
            <div className="w-full md:h-13 h-11 relative flex justify-center rounded-xl items-center overflow-hidden">
              <input
                className="w-full h-10 px-3 py-5 md:px-4 md:py-6 border-2 rounded-xl"
                placeholder="Password"
                type={!showPass ? "password" : "text"}
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "Minimum length of password is 8 characters",
                  },
                  required: { value: true, message: "Password is required" },
                })}
              />
              <div className="flex absolute right-4 items-center gap-4 md:gap-3">
                {!theme && (
                  <div
                    className="icon-transition flex items-center justify-center w-4 h-4 cursor-pointer"
                    onClick={() => handleShowPass("123")}
                  >
                    <img
                      src={visible_dark}
                      alt="visible icon"
                      className={` w-4 h-4 ${
                        !showPass ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <img
                      src={invisible_dark}
                      alt="invisible icon"
                      className={` w-4 h-4 absolute ${
                        !showPass ? "opacity-0" : "opacity-100"
                      }`}
                    />
                  </div>
                )}
                {theme && (
                  <div
                    className="icon-transition flex items-center justify-center w-4 h-4 cursor-pointer"
                    onClick={() => handleShowPass("123")}
                  >
                    <img
                      src={visible_light}
                      alt="visible icon"
                      className={`w-4 h-4 ${
                        !showPass ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <img
                      src={invisible_light}
                      alt="invisible icon"
                      className={`w-4 h-4 absolute ${
                        !showPass ? "opacity-0" : "opacity-100"
                      }`}
                    />
                  </div>
                )}
                <div
                  className="icon-transition flex items-center justify-center h-[15px] w-[15px] md:w-4 md:h-4 hover:scale-[1.05]"
                  onClick={handlePasswordGeneration}
                >
                  <div className={`relative flex justify-center items-center `}>
                    {theme ? (
                      <img
                        src={create_pass_light_icon}
                        alt="create_pass_icon"
                        className={` ${theme ? "opacity-100" : "opacity-0"}`}
                      />
                    ) : (
                      <img
                        src={create_pass_dark_icon}
                        alt="create_pass_icon"
                        className={`${theme ? "opacity-0" : "opacity-100"}`}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-3 mt-3 md:mt-0 col-span-1 h-13 flex justify-center text-center rounded-xl items-center overflow-hidden">
              <input
                className="px-4 h-13 cursor-alias border-2 hover:-translate-y-[1px] border-black rounded-xl text-center"
                style={{ cursor: `url(${tornado_icon}) 1 1, auto` }}
                disabled={isSubmitting}
                type="submit"
                value={isSubmitting ? "Absorbing..." : "Save to Vortex"}
              />
            </div>
            <div className="md:col-span-3 col-span-1 text-red-500 text-center">
              {errors.website && <div>{errors.website.message}</div>}
              {errors.password && <div>{errors.password.message}</div>}
              {errors.username && <div>{errors.username.message}</div>}
              {errors.form && <div>{errors.form.message}</div>}
            </div>
          </form>
        </div>
      </div>
      <div className="flex lg:max-w-6xl sm:max-w-4xl justify-center items-center text-center w-full mx-auto pl-12 pr-12 pt-3 pb-7">
        <div className="flex flex-col p-2 gap-1">
          <h1 className="text-xl md:text-2xl font-semibold">Your Passwords</h1>
          <div
            className={`text-sm md:text-md   ${
              theme ? "text-[#a6a6a6]" : "text-[#202020]"
            }`}
          >
            {`You have ${records.length} saved password(s)`}
          </div>
        </div>
      </div>

      <div className="md:p-12 p-10 mx-auto lg:max-w-6xl sm:max-w-4xl">
        <div className="card-container grid grid-cols-1 md:grid-cols-3 gap-7 justify-items-center">
          <AnimatePresence mode="popLayout">
            {records.length === 0 ? (
              <motion.div
                // key={theme}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={
                  theme
                    ? {
                        y: -4,
                        borderColor: "rgba(0, 0, 0, 0)",
                        boxShadow: `
              6px 6px 16px rgba(107, 55, 204, 0.18), 
              -6px -6px 16px rgba(60, 30, 90, 0.5)
            `,
                        transition: {
                          borderColor: { duration: 0 },
                          y: { duration: 0.3 },
                          boxShadow: { duration: 0.3 },
                        },
                      }
                    : {
                        y: -4,
                        borderColor: "rgba(0, 0, 0, 0)",
                        boxShadow: `
              6px 6px 12px #c6c6c6, 
              -6px -6px 12px #f5f5f5
            `,
                        transition: {
                          borderColor: { duration: 0 },
                          y: { duration: 0.3 },
                          boxShadow: { duration: 0.3 },
                        },
                      }
                }
                className={`w-full flex flex-col items-center justify-center text-center p-8 rounded-xl
                  ${
                    theme
                      ? "bg-[#14141B] text-white"
                      : "bg-[#f4f4f4] text-gray-600"
                  }  `}
              >
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                  <span className="text-gray-400 text-2xl">🔍</span>
                </div>
                <h3 className="text-lg font-medium">No passwords saved yet</h3>
                <p className="text-sm mt-2">
                  Add your first password to get started with secure password
                  management.
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  onClick={handleInputFocus}
                >
                  Add Your First Password
                </button>
              </motion.div>
            ) : (
              records.map((rec, i) => (
                <Card
                  key={rec._id}
                  rec={rec}
                  i={i}
                  theme={theme}
                  lastAddedId={lastAddedId}
                  showPass={showPass}
                  cardToEdit={cardToEdit}
                  deleteId={deleteId}
                  handleShowPass={handleShowPass}
                  handleCopy={handleCopy}
                  handleEditCard={handleEditCard}
                  manageDelete={manageDelete}
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme ? "light" : "dark"}
        transition={Slide}
      />
      {cardToEdit && (
        <EditPopup
          theme={theme}
          onClose={() => setCardToEdit(null)}
          cardToEdit={records.find((item) => cardToEdit === item._id)}
          onSave={handleSave}
        />
      )}

      <AnimatePresence>
        {showDelete && (
          <motion.div
            className="fixed inset-0 flex justify-center items-center text-center z-50 h-full w-full backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              backgroundColor: theme ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.5)",
            }}
          >
            <motion.div
              className={`w-[75%] confirmation-box max-w-md md:w-[25%]  rounded-2xl shadow-2xl border p-4 md:p-6 space-y-4 md:space-y-6 ${
                theme
                  ? "bg-[#1e1e25] text-white border-[#2a2a35]"
                  : "bg-[#FCF9F4] text-gray-800 border-[#E5E1DA]"
              }`}
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* Header */}
              <div className="space-y-3 md:space-y-4">
                <h1 className="md:text-2xl text-[19px] font-semibold tracking-tight">
                  Are you sure?
                </h1>
                <p className="md:text-base text-[13px] leading-relaxed opacity-85 md:px-0 px-2">
                  This will permanently delete the password. This action cannot
                  be undone.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex justify-between md:px-0 px-2 items-center gap-7 md:gap-4">
                <button
                  onClick={() => setShowDelete(false)}
                  className={`md:flex-1 flex-1/12 p-2 md:text-md text-sm md:p-2 rounded-lg transition-all duration-200 ease-in-out hover:scale-105 ${
                    theme
                      ? "bg-[#2a2a35] hover:bg-[#383845] text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  className={`md:flex-1 flex-1/12 p-2 md:p-2 md:text-md text-sm rounded-lg transition-all duration-200 ease-in-out hover:scale-105 ${
                    theme
                      ? "bg-red-600 hover:bg-red-500 text-white"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 md:bottom-4 md:right-5">
        <button onClick={handleScroll}>
          <img
            src={back_to_top}
            alt="back_to_top"
            className="w-[30px] h-[30px] md:w-[37px] md:h-[37px]"
          />
        </button>
      </div>
    </div>
  );
}

export default App;
