import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSignUp } from '../../hooks/useSignUp/useSignUp'
import { useSelector } from 'react-redux'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [inputError, setInputError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { isSignedIn } = useSelector((store) => store.user)

  const { signUp, error, isLoading } = useSignUp()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signUp(name, email, password)
  }
  useEffect(() => {
    if (!error) {
      setPassword('')
      setConfirmPassword('')
      setName('')
      setEmail('')
      setInputError('')
    }
    if (confirmPassword !== password) {
      return setInputError('Passwords do not match!')
    }
    if (isSignedIn) {
      navigate('/')
    }
  }, [error, password, confirmPassword, isSignedIn, navigate])

  return (
    <div
      className="flex min-h-svh items-center justify-center bg-slate-100 text-slate-900 
    md:min-h-screen dark:bg-slate-900 dark:text-slate-300"
    >
      <form
        className="flex flex-col gap-2 rounded-xl bg-slate-200 px-4 py-8 
      shadow-md md:min-w-96 md:px-6 xl:min-w-[28rem] dark:bg-slate-800"
      >
        <h2 className=" mb-2 text-xl font-semibold tracking-widest md:mb-4 md:text-2xl">
          Sign up
        </h2>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-xs md:text-base">
            User Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="auth-input"
            placeholder="Your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-xs md:text-base">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email address"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="absolute bottom-1 right-2 cursor-pointer select-none md:bottom-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                className="fill-slate-600 dark:fill-slate-500"
              >
                <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                className="fill-slate-600 dark:fill-slate-500"
              >
                <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
              </svg>
            )}
          </span>
        </div>
        <div className="relative flex flex-col gap-1">
          <label htmlFor="confirm-password" className="text-xs md:text-base">
            Confirm Password:
          </label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirm-password"
            id="confirm-password"
            placeholder="Confirm password"
            className="auth-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span
            className="absolute bottom-1 right-2 cursor-pointer select-none md:bottom-2"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                className="fill-slate-600 dark:fill-slate-500"
              >
                <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                className="fill-slate-600 dark:fill-slate-500"
              >
                <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
              </svg>
            )}
          </span>
        </div>
        <div className="my-2 flex items-center justify-between">
          <Link to="/login" className="auth-bottom-link">
            Already have an account
          </Link>
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="auth-submit-button"
          onClick={handleSubmit}
        >
          Sign Up
        </button>
        {error && (
          <div
            className="mt-2 rounded-md border border-red-600 bg-slate-100 p-2 
          text-sm font-bold capitalize text-red-600"
          >
            {error}!
          </div>
        )}
        {inputError && (
          <div
            className="mt-2 rounded-md border border-red-600 bg-slate-100 p-2 
          text-sm font-bold text-red-600"
          >
            {inputError}!
          </div>
        )}
      </form>
    </div>
  )
}

export default SignUp
