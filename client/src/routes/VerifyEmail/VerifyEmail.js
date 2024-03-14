import { useState } from 'react'
import useGenerateCode from '../../hooks/useGenerateCode/useGenerateCode'

const VerifyEmail = () => {
  const [code, setCode] = useState('')
  const { generateCode, isLoading, error, data } = useGenerateCode()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(code)

  }

  return (
    <section
      className="mx-4 flex min-h-screen items-center justify-center 
    text-slate-900 dark:text-slate-200"
    >
      <form
        className="flex max-w-96 flex-col gap-2 rounded-xl bg-slate-200 px-4 
      py-6 md:max-w-[30rem] md:px-6 md:py-8 dark:bg-slate-800"
      >
        <h2 className="mb-4 text-lg font-semibold tracking-wide md:text-xl">
          OTP Code Verification
        </h2>
        <div className="rounded-md bg-green-600 bg-opacity-25 p-2 text-sm md:text-base">
          <p>We've sent a verification code to your email - example@mail.com</p>
        </div>
        <input
          type="number"
          placeholder="Enter Code"
          name="code"
          maxLength={6}
          className="auth-input mt-2 h-12 w-full"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          type="submit"
          className="auth-submit-button"
          onClick={handleSubmit}
        >
          Submit
        </button>
        { error && (
          <div
            className="mt-2 rounded-md border border-red-600 bg-slate-100 p-2 
          text-sm font-bold capitalize text-red-600 dark:bg-slate-800 max-w-96"
          >
            {error}!
          </div>
        )}
      </form>
    </section>
  )
}

export default VerifyEmail
