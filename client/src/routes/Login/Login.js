import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLogIn } from "../../hooks/useLogIn/useLogIn";
import { useAuthContext } from "../../hooks/useAuthContext/useAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, error, isLoading } = useLogIn();
  const { isSignedIn } = useAuthContext()
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await logIn(email, password);
    if(isSignedIn){
      navigate("/")
    }
  };

  return (
    <div className="min-h-screen dark:bg-slate-900 bg-slate-100 flex justify-center items-center text-slate-900">
      <form className="dark:bg-slate-800 bg-slate-200 dark:text-slate-300 text-slate-900 md:min-w-96 rounded-xl px-6 py-8 shadow-md flex flex-col gap-2">
        <h2 className=" text-xl md:text-2xl font-semibold tracking-widest mb-2 md:mb-4">
          Log In
        </h2>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-xs md:text-base">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="auth-input"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="password" className="text-xs md:text-base">
            Password:
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Password"
            className="auth-input relative"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="material-symbols-outlined dark:text-slate-500 text-slate-600 select-none absolute bottom-1 md:bottom-2 cursor-pointer right-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "visibility" : "visibility_off"}
          </span>
        </div>
        <div className="flex justify-between items-center my-2">
          <Link
            to="/forgot-password"
            className="auth-bottom-link"
          >
            Forgot password?
          </Link>
          <Link
            to="/signup"
            className="auth-bottom-link"
          >
            Create a new account
          </Link>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="auth-submit-button"
          onClick={handleSubmit}
        >
          Sign In
        </button>
        {error && (
          <div className="text-red-600 font-bold text-sm p-2 border dark:bg-slate-800 
          bg-slate-100 rounded-md mt-2 border-red-600 capitalize">
            {error}!
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
