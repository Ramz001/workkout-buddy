import useResetPassword from '../../hooks/useResetPassword/useResetPassword'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Backdrop from '../../components/Backdrop/Backdrop'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { id, token } = useParams()
  const { updatePassword, error, isLoading, isPasswordChanged } =
    useResetPassword(id, token)
  const navigate = useNavigate()
  const [popup, setPopup] = useState(false)

  const handleResetBtn = async (e) => {
    e.preventDefault()

    await updatePassword(password)
    if (isPasswordChanged) {
      setPopup(true)
    }
  }

  const handlePopup = () => {
    setPopup(false)
    navigate('/login')
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-slate-100 
    text-slate-900 dark:bg-slate-900 dark:text-slate-300"
    >
      <form
        className="flex flex-col gap-2 rounded-xl 
      bg-slate-200 px-6 py-8 shadow-md md:min-w-96 dark:bg-slate-800"
      >
        <h2 className="mb-2 text-xl font-semibold md:mb-4 md:text-2xl">
          Reset Password
        </h2>
        <div className="relative flex flex-col gap-2">
          <label htmlFor="password" className="text-xs md:text-base">
            New password:
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            className="auth-input"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="material-symbols-outlined absolute bottom-1 right-2 cursor-pointer 
            select-none text-slate-600 md:bottom-2 dark:text-slate-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'visibility' : 'visibility_off'}
          </span>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="auth-submit-button"
          onClick={(e) => handleResetBtn(e)}
        >
          Update Password
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
            className="mt-2 rounded-md border border-red-600 bg-slate-100 
                    p-2 text-sm font-bold capitalize text-red-600"
          >
            {error}!
          </div>
        )}
      </form>
      {popup && (
        <Backdrop onClick={handlePopup}>
          <div
            className="mx-4 flex max-w-96 flex-col gap-1 text-wrap rounded-md 
                        bg-slate-100 px-4 py-8 text-sm text-slate-900 sm:mx-0 sm:px-6 
                        sm:py-10 sm:text-base md:max-w-[32rem] md:text-lg dark:bg-slate-900 
                        dark:text-slate-300"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              onClick={handlePopup}
              className="material-symbols-outlined mb-2 cursor-pointer self-end"
            >
              close
            </span>
            <h2 className="mb-4 text-lg font-semibold tracking-wide sm:text-xl md:text-2xl">
              Your password has been changed!
            </h2>
          </div>
        </Backdrop>
      )}
    </div>
  )
}

export default ResetPassword
