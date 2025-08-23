import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import AuthCard from "./AuthCard";
import { Link,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

    const API_URI = 'https://vault-vortex-server.vercel.app/user';

export default function SignupPage({ theme }) {

    const navigate = useNavigate();

  const onSubmit = async (data) => {

    const signupData = {
        name: data.name,
        email: data.email,
        password: data.password
    }

    await axios.post(`${API_URI}/signup`,signupData)
    .then(result=> {console.log(result.data)
        navigate('/login')
    })
    .catch(err=>console.log(err));
    reset();
  };

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();

  return (
    <div className={theme? "isDark" : ""}>
      <AuthCard
        title="Create Account"
        footer={
          <>
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 hover:underline">
              Login
            </Link>
          </>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username */}
          <div className={`flex items-center rounded-lg px-4 py-3 focus-within:ring-2
           focus-within:ring-purple-400 ${theme? 'bg-black/30':'bg-zinc-900/15'}`}>
            <FaUser className="mr-3 opacity-70" />
            <input
              type="text"
              placeholder="Username"
                {...register('name')}
              required
              className="bg-transparent flex-1 outline-none"
            />
          </div>

          {/* Email */}
          <div className={`flex items-center rounded-lg px-4 py-3 
            focus-within:ring-2 focus-within:ring-purple-400
            ${theme? 'bg-black/30':'bg-zinc-900/15'}`}>
            <FaEnvelope className="mr-3 opacity-70" />
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              required
              className="bg-transparent flex-1 outline-none"
            />
          </div>

          {/* Password */}
          <div className={`flex items-center rounded-lg px-4 py-3 focus-within:ring-2
           focus-within:ring-purple-400 
           ${theme? 'bg-black/30':'bg-zinc-900/15'}
           `}>
            <FaLock className="mr-3 opacity-70" />
            <input
              type="password"
              placeholder="Password"
             {...register("password")}
              required
              className="bg-transparent flex-1 outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors font-semibold shadow-md"
          >
            Sign Up
          </button>
        </form>
      </AuthCard>
    </div>
  );
}
