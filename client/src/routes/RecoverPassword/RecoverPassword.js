import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import useRecoverPassword from '../../hooks/useRecoverPassword/useRecoverPassword'

const RecoverPassword = () => {
  const [email, setEmail] = useState('')
  const { recoverPassword, error, isLoading, data } = useRecoverPassword()
  const navigate = useNavigate()

  const handleResetBtn = async (e) => {
    
    e.preventDefault()
    await recoverPassword(email)
    console.log(data)
    if(data){
      navigate('/verify-email')
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center text-slate-900 
      dark:text-slate-300 bg-slate-100 dark:bg-slate-900"
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
          className="auth-submit-button mt-4"
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
          text-sm font-bold capitalize text-red-600 dark:bg-slate-800 max-w-96"
          >
            {error}!
          </div>
        )}
      </form>
    </div>
  )
}

export default RecoverPassword
