import { useAuthContext } from '../useAuthContext/useAuthContext'
import { useState } from 'react'

const useForgotPassword = () => {
  const { isSignedIn } = useAuthContext()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const forgotPassword = async (email) => {
    setIsLoading(true)
    setError(null)

    if (isSignedIn) {
      return setError('The user is signed in')
    }

    const response = await fetch('api/user/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
    const data = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(data.error)
    }
    if (response.ok) {
      setIsLoading(false)
    }
  }
  return { forgotPassword, error, isLoading }
}

export default useForgotPassword
