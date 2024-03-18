import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useRecoverPassword from '../../hooks/useRecoverPassword/useRecoverPassword'

const RecoverPassword = ({ temp, setTemp }) => {
  const [email, setEmail] = useState('')
  const { generateOTP, error, isLoading, data } = useRecoverPassword()
  const navigate = useNavigate()
  console.log(temp)

  const handleRecoverBtn = async (e) => {
    e.preventDefault()
    await generateOTP(email)
  }

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    }
    if (data) {
      setTemp((prevState) => ({ ...prevState, email, _id: data._id }))
      navigate('/verify-email')
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [data, navigate, setTemp, email])

  return (
    <div
      className="flex min-h-svh md:min-h-screen items-center justify-center bg-slate-100 
      text-slate-900 dark:bg-slate-900 dark:text-slate-300"
    >
      <form
        className="win-w-80 flex flex-col gap-2 rounded-xl bg-slate-200 px-6 
        py-8 shadow-md md:min-w-[28rem] dark:bg-slate-800"
      >
        <h2 className="mb-2 text-xl font-semibold md:mb-4 md:text-2xl">
          Forgot Your Password
        </h2>
        {data && (
          <div className="rounded-md bg-green-600 bg-opacity-25 p-2 text-sm md:text-base">
            <p>{data.status}</p>
          </div>
        )}
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
          className="auth-submit-button mt-4 "
          onClick={(e) => handleRecoverBtn(e)}
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
            className="mt-2 max-w-96 rounded-md border border-red-600 bg-slate-100 
          p-2 text-sm font-bold capitalize text-red-600 dark:bg-slate-800"
          >
            {error}!
          </div>
        )}
      </form>
    </div>
  )
}

export default RecoverPassword
