import { Link } from "react-router-dom";
import { useState } from "react";
import useForgotPassword from "../../hooks/useForgotPassword/useForgotPassword";
import Backdrop from "../../components/Backdrop/Backdrop";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { forgotPassword, error, isLoading } = useForgotPassword();
  const [popup, setPopup] = useState(false);

  const handleResetBtn = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    if (!error & !isLoading) {
      setPopup(true);
    }
  };

  return (
    <div
      className="min-h-screen dark:bg-slate-900 bg-slate-100  flex justify-center 
    items-center dark:text-slate-300 text-slate-900"
    >
      <form
        className="dark:bg-slate-800 bg-slate-200 md:min-w-96 rounded-xl 
      px-6 py-8 shadow-md flex flex-col gap-2"
      >
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
          disabled={isLoading}
          onClick={(e) => handleResetBtn(e)}
          className="auth-submit-button"
        >
          Reset Password
        </button>
        <Link
          to="/login"
          className="mt-2 dark:text-green-700 text-green-500 hover:text-slate-900 
          flex justify-center hover:underline dark:hover:text-slate-300"
        >
          Back to Log In
        </Link>
        {error && (
          <div
            className="text-red-600 font-bold text-sm p-2 border dark:bg-slate-800 
          bg-slate-100 rounded-md mt-2 border-red-600 capitalize"
          >
            {error}!
          </div>
        )}
      </form>
      {popup && (
        <Backdrop onClick={() => setPopup(false)}>
          <div
            className="max-w-96 md:max-w-[32rem] text-wrap text-sm sm:text-base md:text-lg 
          dark:bg-slate-900 bg-slate-100 dark:text-slate-300 text-slate-900 
          flex flex-col gap-1 px-4 sm:px-6 py-8 sm:py-10 rounded-md 
          mx-4 sm:mx-0"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              onClick={() => setPopup(false)}
              className="material-symbols-outlined self-end cursor-pointer mb-2"
            >
              close
            </span>
            <h2 className="text-lg sm:text-xl md:text-2xl tracking-wide font-semibold mb-6 dark:text-slate-200">
              An email was sent to your account.
            </h2>
            <p>
              Please check your email and change your password via link sent.
            </p>
            <p>
              In case you cannot find an email please check your Spam folder.
            </p>
          </div>
        </Backdrop>
      )}
    </div>
  );
};

export default ForgotPassword;
