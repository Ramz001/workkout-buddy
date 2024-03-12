import { Link } from 'react-router-dom'
import { useState } from 'react'
import useForgotPassword from '../../hooks/useForgotPassword/useForgotPassword'
import Backdrop from '../../components/Backdrop/Backdrop'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const { forgotPassword, error, isLoading } = useForgotPassword()
  const [popup, setPopup] = useState(false)

  const handleResetBtn = async (e) => {
    e.preventDefault()
    await forgotPassword(email)
    if (!error & !isLoading) {
      setPopup(true)
    }
  }

  return (
    <div
      className="flex min-h-screen items-center  justify-center bg-slate-100 
    text-slate-900 dark:bg-slate-900 dark:text-slate-300"
    >
      <form
        className="flex flex-col gap-2 rounded-xl 
      bg-slate-200 px-6 py-8 shadow-md md:min-w-96 dark:bg-slate-800"
      >
        <h2 className="mb-2 text-xl font-semibold md:mb-4 md:text-2xl">
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
          className="mt-2 flex justify-center text-green-500 
          hover:text-slate-900 hover:underline dark:text-green-700 dark:hover:text-slate-300"
        >
          Back to Log In
        </Link>
        {error && (
          <div
            className="mt-2 rounded-md border border-red-600 bg-slate-100 p-2 
          text-sm font-bold capitalize text-red-600 dark:bg-slate-800"
          >
            {error}!
          </div>
        )}
      </form>
      {popup && (
        <Backdrop onClick={() => setPopup(false)}>
          <div
            className="mx-4 flex max-w-96 flex-col gap-1 text-wrap 
          rounded-md bg-slate-100 px-4 py-8 
          text-sm text-slate-900 sm:mx-0 sm:px-6 sm:py-10 sm:text-base md:max-w-[32rem] md:text-lg 
          dark:bg-slate-900 dark:text-slate-300"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              onClick={() => setPopup(false)}
              className="material-symbols-outlined mb-2 cursor-pointer self-end"
            >
              close
            </span>
            <h2 className="mb-6 text-lg font-semibold tracking-wide sm:text-xl md:text-2xl dark:text-slate-200">
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
  )
}

export default ForgotPassword
