import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLogIn } from "../../hooks/useLogIn/useLogIn";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, error, isLoading } = useLogIn();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await logIn(email, password);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center text-slate-900">
      <form className="bg-slate-200 md:min-w-96 rounded-xl px-6 py-8 shadow-md flex flex-col gap-2">
        <h2 className=" text-xl md:text-2xl font-semibold tracking-widest mb-2 md:mb-4">
          Login
        </h2>
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
        <label htmlFor="password" className="text-xs md:text-base">
          Password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-between items-center my-2">
          <Link
            to="/forgot-password"
            className="underline text-xs md:text-sm tracking-tighter md:tracking-tight"
          >
            Forgot password?
          </Link>
          <Link
            to="/signup"
            className="underline tracking-tighter md:tracking-tight text-xs md:text-sm"
          >
            Create a new account
          </Link>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-600 text-white h-10 rounded-lg mt-2 border 
          hover:border-green-600 hover:bg-slate-200 hover:text-slate-900"
          onClick={handleSubmit}
        >
          Sign In
        </button>
        {error && (
          <div className="text-red-600 font-bold text-sm p-2 border bg-slate-100 rounded-md mt-2 border-red-600 capitalize">
            {error}!
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
