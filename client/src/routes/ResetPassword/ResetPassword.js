import useResetPassword from "../../hooks/useResetPassword/useResetPassword";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Backdrop from "../../components/Backdrop/Backdrop";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { id, token } = useParams();
  const { updatePassword, error, isLoading, isPasswordChanged } = useResetPassword(id, token);
  const navigate = useNavigate()
  const [popup, setPopup] = useState(false)

  const handleResetBtn = async (e) => {
    e.preventDefault();

    await updatePassword(password);
    if(isPasswordChanged){
      setPopup(true)
    }
  };
  return (
    <div className="min-h-screen dark:bg-slate-900 bg-slate-100 flex justify-center 
    items-center dark:text-slate-300 text-slate-900">
      <form className="dark:bg-slate-800 bg-slate-200 md:min-w-96 rounded-xl 
      px-6 py-8 shadow-md flex flex-col gap-2">
        <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4">
          Reset Password
        </h2>
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="password" className="text-xs md:text-base">
            New password:
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            className="auth-input"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="material-symbols-outlined dark:text-slate-500 text-slate-600 select-none absolute 
            bottom-1 md:bottom-2 cursor-pointer right-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "visibility" : "visibility_off"}
          </span>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="auth-submit-button"
          onClick={e => handleResetBtn(e)}
        >
          Update Password
        </button>
        <Link
          to="/login"
          className="mt-2 dark:text-green-700 text-green-500 dark:hover:text-slate-300 
          hover:text-slate-900 flex justify-center hover:underline"
        >
          Back to Log In
        </Link>
        {error && (
          <div className="text-red-600 font-bold text-sm p-2 border bg-slate-100 rounded-md mt-2 border-red-600 capitalize">
            {error}!
          </div>
        )}
      </form>
      {popup && (
        <Backdrop onClick={() => setPopup(false)}>
          <div className="max-w-96 md:max-w-[32rem] text-wrap text-sm sm:text-base md:text-lg 
          dark:bg-slate-900 bg-slate-100 dark:text-slate-300 text-slate-900 flex flex-col gap-1 px-4 sm:px-6 py-8 sm:py-10 rounded-md 
          mx-4 sm:mx-0" onClick={() => navigate("/login")}>
            <span onClick={() => setPopup(false)} className="material-symbols-outlined self-end cursor-pointer mb-2">close</span>
            <h2 className="text-lg sm:text-xl md:text-2xl tracking-wide font-semibold mb-4">
              Your password has been changed!
            </h2>
          </div>
        </Backdrop>
      )}
    </div>
  );
};

export default ResetPassword;
