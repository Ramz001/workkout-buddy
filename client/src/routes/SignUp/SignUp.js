import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSignUp } from '../../hooks/useSignUp/useSignUp'
import { useAuthContext } from '../../hooks/useAuthContext/useAuthContext'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [inputError, setInputError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { isSignedIn } = useAuthContext()

  const { signUp, error, isLoading } = useSignUp()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(confirmPassword === password)
    if (confirmPassword !== password) {
      return setInputError('Passwords do not match!')
    }

    await signUp(name, email, password)
    if (!error) {
      setPassword('')
      setConfirmPassword('')
      setName('')
      setEmail('')
      setInputError('')
    }
    if (isSignedIn) {
      navigate('/')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-300">
      <form className="flex flex-col gap-2 rounded-xl bg-slate-200 px-4 py-8 shadow-md md:min-w-96 md:px-6 dark:bg-slate-800">
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
            className="material-symbols-outlined absolute bottom-1 
            right-2 cursor-pointer 
            select-none text-slate-600 md:bottom-2 dark:text-slate-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'visibility' : 'visibility_off'}
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
            className="material-symbols-outlined absolute bottom-1 
            right-2 cursor-pointer select-none text-slate-600 md:bottom-2 dark:text-slate-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? 'visibility' : 'visibility_off'}
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
