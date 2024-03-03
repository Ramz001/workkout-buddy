import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSignUp } from "../../hooks/useSignUp/useSignUp";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, error, isLoading } = useSignUp();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signUp(name, email, password);
    if(!error){
      setPassword("");
      setName("");
      setEmail("");
    }
    navigate('/')
  };

  return (
    <div className="min-h-screen flex justify-center items-center text-slate-900">
      <form className="bg-slate-200 md:min-w-96 rounded-xl px-4 md:px-6 py-8 shadow-md flex flex-col gap-2">
        <h2 className=" text-xl md:text-2xl font-semibold tracking-widest mb-2 md:mb-4">
          Sign up
        </h2>
        <label htmlFor="name" className="text-xs md:text-base">
          User Name:
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="auth-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <label htmlFor="password" className="text-xs md:text-base">
          Password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-between items-center my-2">
          <Link
            to="/login"
            className="underline tracking-tighter md:tracking-tight text-xs md:text-sm"
          >
            Already have an account
          </Link>
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="bg-green-600 text-white h-10 rounded-lg mt-2 border 
          hover:border-green-600 hover:bg-slate-200 hover:text-slate-900"
          onClick={handleSubmit}
        >
          Sign Up
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

export default SignUp;
