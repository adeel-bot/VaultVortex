import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import AuthCard from "./AuthCard";
import { Link } from "react-router-dom";
import {useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

  const API_URI = 'https://vaultvortex-production.up.railway.app/user';

export default function LoginPage({ theme }) {

    const [loading, setLoading] = useState();

   const {
      register,
      handleSubmit,
      setError,
      reset,
      formState: { errors },
    } = useForm();

      const navigate = useNavigate();

const onSubmit = async (data) => {
  setLoading(true);
  try {
    const result = await axios.post(`${API_URI}/signin`, data, { withCredentials: true });
    console.log("✅ Login successful:", result.data);
    reset(); 
    navigate('/');
  } catch (err) {
    const message = err.response?.data?.error || err.message;
    console.error("❌ Login error:", message);

    if (message.toLowerCase().includes("password")) {
      setError("password", { type: "server", message });
    } else if (message.toLowerCase().includes("email")) {
      setError("email", { type: "server", message });
    } else {
      setError("login", { type: "server", message });
    }
  } finally {
    setLoading(false);
  }
};



  return (
    <div className={theme? "isDark" : ""}>
      <AuthCard
        title="Welcome Back"
        footer={
          <>
            Don’t have an account?{" "}
            <Link to="/signup" className="text-purple-600 hover:underline">
              Sign up
            </Link>
          </>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div className={`flex items-center  rounded-lg px-4 py-3 
          focus-within:ring-2 focus-within:ring-purple-400
            ${theme? 'bg-black/30':'bg-zinc-900/15'}
          `}>
            <FaUser className="mr-3 opacity-70" />
            <input
              type="email"
              placeholder="Email"
              {...register('email', {required: "Email is required"})}
              required
              className="bg-transparent flex-1 outline-none "
            />
          </div>

          {/* Password */}
          <div className={`flex items-center bg-black/30 rounded-lg px-4 
            py-3 focus-within:ring-2 focus-within:ring-purple-400
             ${theme? 'bg-black/30':'bg-zinc-900/15'}`}>
            <FaLock className="mr-3 opacity-70" />
            <input
              type="password"
              placeholder="Password"
              {...register('password', {required: "Password is Required"})}
              required
              className="bg-transparent flex-1 outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors font-semibold shadow-md"
          >
            {loading?"Logging in...": "Login"}
          </button>
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
           {errors.login && <p className="text-red-500">{errors.login.message}</p>}
        </form>
      </AuthCard>
    </div>
  );
}
