import { useAuthContext } from '../useAuthContext/useAuthContext'
import { useState } from 'react'

const useRecoverPassword = () => {
  const { isSignedIn } = useAuthContext()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData]  = useState(null)

  const recoverPassword = async (email) => {
    setIsLoading(true)
    setError(null)

    if (isSignedIn) {
      return setError('The user is signed in')
    }

    const response = await fetch('api/user/recover-password', {
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
      setData(null)
    }
    if (response.ok) {
      setIsLoading(false)
      setData(data)
    }
  }
  return { recoverPassword, error, isLoading, data }
}

export default useRecoverPassword
