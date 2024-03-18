import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useLogIn } from '../../hooks/useLogIn/useLogIn'
import { useSelector } from 'react-redux'
import Visibility from '../../assets/icons/visibility.svg'
import VisibilityOff from '../../assets/icons/visibility_off.svg'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { logIn, error, isLoading } = useLogIn()
  const { isSignedIn } = useSelector((store) => store.user)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    await logIn(email, password)
    if (isSignedIn) {
      navigate('/')
    }
  }

  return (
    <div
      className="z-20 flex min-h-svh items-center justify-center bg-slate-100 
    text-slate-900 md:min-h-screen dark:bg-slate-900"
    >
      <form
        className="flex flex-col gap-2 rounded-xl bg-slate-200 px-6 py-8 
      text-slate-900 shadow-md md:min-w-[28rem] dark:bg-slate-800 dark:text-slate-300"
      >
        <h2 className=" mb-2 text-xl font-semibold tracking-widest md:mb-4 md:text-2xl">
          Login
        </h2>
        <div className="flex flex-col gap-1">
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
        </div>
        <div className="relative flex flex-col gap-1">
          <label htmlFor="password" className="text-xs md:text-base">
            Password:
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            placeholder="Password"
            className="auth-input relative"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="absolute bottom-1 right-2 cursor-pointer select-none md:bottom-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <img src={Visibility} alt="show password" />
            ) : (
              <img src={VisibilityOff} alt="hide password" />
            )}
          </span>
        </div>
        <div className="my-2 flex items-center justify-between">
          <Link to="/recover-password" className="auth-bottom-link">
            Forgot password?
          </Link>
          <Link to="/signup" className="auth-bottom-link">
            Create an account
          </Link>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="auth-submit-button"
          onClick={handleSubmit}
        >
          Sign In
        </button>
        {error && (
          <div
            className="mt-2 rounded-md border border-red-600 bg-slate-100 p-2 
          text-sm font-bold capitalize text-red-600 dark:bg-slate-800"
          >
            {error}!
          </div>
        )}
      </form>
    </div>
  )
}

export default Login
