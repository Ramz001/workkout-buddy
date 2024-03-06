import { Link } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleResetBtn = () => {
    
  }

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center text-slate-900">
      <form className="bg-slate-200 md:min-w-96 rounded-xl px-6 py-8 shadow-md flex flex-col gap-2">
        <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4">
          Forgot Your Password
        </h2>
        <label htmlFor="email" className="text-xs md:text-base">
          Email:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 text-white h-10 rounded-lg mt-4 border 
          hover:border-green-600 hover:bg-slate-200 hover:text-slate-900"
        >
          Reset Password
        </button>
         <Link
            to="/login"
            className="mt-2 text-slate-500 hover:text-slate-900 flex justify-center hover:underline"
          >
            Back to Log In
          </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
