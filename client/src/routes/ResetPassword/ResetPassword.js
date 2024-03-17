import useResetPassword from '../../hooks/useResetPassword/useResetPassword'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const ResetPassword = ({ temp, setTemp }) => {
  const [password, setPassword] = useState('')
  const { _id, token } = temp
  const [showPassword, setShowPassword] = useState(false)
  const { updatePassword, error, isLoading, isPasswordChanged } =
    useResetPassword()
  const navigate = useNavigate()
  const [popup, setPopup] = useState(false)

  const handleResetBtn = async (e) => {
    e.preventDefault()

    await updatePassword(password, _id, token)
  }

  useEffect(() => {
    if (isPasswordChanged) {
      setPopup(true)
    }
    if (popup) {
      setTimeout(() => {
        navigate('/login')
      }, 2500)
    }
  }, [popup, navigate, isPasswordChanged])

  return (
    <div
      className="flex min-h-svh md:min-h-screen items-center justify-center bg-slate-100 
    text-slate-900 dark:bg-slate-900 dark:text-slate-300"
    >
      <form
        className="flex min-w-96 flex-col gap-2 rounded-xl bg-slate-200 px-6 
        py-8 shadow-md md:min-w-[26rem] dark:bg-slate-800"
      >
        <h2 className="mb-2 text-xl font-semibold md:mb-4 md:text-2xl">
          Reset Password
        </h2>
        {popup && (
          <div className="rounded-md bg-green-600 bg-opacity-25 p-2 text-sm md:text-base">
            <p>Your password has been successfully updated!</p>
          </div>
        )}
        <div className="relative flex flex-col gap-2">
          <label htmlFor="password" className="text-xs md:text-base">
            New password:
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            className="auth-input h-10"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="material-symbols-outlined absolute bottom-2 right-2 
            cursor-pointer select-none text-slate-600 dark:text-slate-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'visibility' : 'visibility_off'}
          </span>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="auth-submit-button mt-4"
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
            className="mt-2 max-w-96 rounded-md border border-red-600 
            bg-slate-100 p-2 text-sm font-bold capitalize text-red-600"
          >
            {error}!
          </div>
        )}
      </form>
    </div>
  )
}

export default ResetPassword
