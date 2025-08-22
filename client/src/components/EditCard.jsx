import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const EditPopup = ({ theme, onClose, cardToEdit, onSave }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 20); 

    return () => clearTimeout(timeout);
  }, []);
  
 

      const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      website: cardToEdit.website,
      username: cardToEdit.username,
      password: cardToEdit.password,
    },
  });

  const handleNewSubmit = (data) => {
    onSave(data); 
    handleClose();
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <>
  <div
    className={`fixed inset-0 bg-black/30 transition-opacity duration-300 ease-in-out z-40 ${
      isVisible ? "opacity-100" : "opacity-0"
    }`}
    onClick={handleClose}
  />

  <div
    className={`fixed top-0 right-0 h-full w-[80%] sm:w-[350px] z-50 shadow-lg transform transition-transform ease-in-out duration-300 ${
      theme
        ? "bg-[#121218f8] text-white border border-[#15151b]"
        : "bg-[#faf6ff] text-black"
    } ${isVisible ? "translate-x-0" : "translate-x-full"}`}
  >
    <div className="p-6 flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Edit Account</h2>
        <button
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          ✕
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(handleNewSubmit)}
        className="flex flex-col gap-4 flex-1"
      >
        {/* Website */}
        <div>
          <label className="block text-md mb-1.5 pl-3">Website</label>
          <input
            type="text"
            {...register("website")}
            className={`w-full px-3 py-2 rounded-lg outline-none transition-colors duration-200 ${
              theme
                ? "bg-[#1e1e25] text-white placeholder-gray-400 border border-[#2a2a35] focus:border-indigo-500"
                : "bg-[#ede9ffc7] text-black placeholder-gray-600 border border-[#d5ccff] focus:border-indigo-500"
            }`}
            placeholder="Enter website"
            spellCheck="false"
          />
        </div>
        {/* Username */}
        <div>
          <label className="block text-md mb-1.5 pl-3">Username</label>
          <input
            type="text"
            {...register("username", { required: "Username is required" })}
            className={`w-full px-3 py-2 rounded-lg outline-none transition-colors duration-200 ${
              theme
                ? "bg-[#1e1e25] text-white placeholder-gray-400 border border-[#2a2a35] focus:border-indigo-500"
                : "bg-[#ede9ffc7] text-black placeholder-gray-600 border border-[#d5ccff] focus:border-indigo-500"
            }`}
            placeholder="Enter username"
            spellCheck="false"
          />
          {errors.username && (
            <p className="text-red-500 mt-3 pl-2 text-xs">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-md mb-1.5 pl-3">Password</label>
          <input
            type="text"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            className={`w-full px-3 py-2 rounded-lg outline-none transition-colors duration-200 ${
              theme
                ? "bg-[#1e1e25] text-white placeholder-gray-400 border border-[#2a2a35] focus:border-indigo-500"
                : "bg-[#ede9ffc7] text-black placeholder-gray-600 border border-[#d5ccff] focus:border-indigo-500"
            }`}
            placeholder="Enter password"
            spellCheck="false"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-3 pl-2">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Bottom Buttons */}
        <div className="mt-auto flex justify-end gap-3">
          {/* Cancel */}
          <button
            type="button"
            onClick={handleClose}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              theme
                ? "bg-[#2a2a35] hover:bg-[#383845] text-white"
                : "bg-[#eeebff] hover:bg-[#dfd6fb] text-black"
            }`}
          >
            Cancel
          </button>

          {/* Save */}
          <button
            type="submit"
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              theme
                ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                : "bg-indigo-500 hover:bg-indigo-600 text-white"
            }`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</>

  );
};

export default EditPopup;
