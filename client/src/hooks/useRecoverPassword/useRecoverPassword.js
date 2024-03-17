import { useState } from 'react'

const useRecoverPassword = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)

  const generateOTP = async (email) => {
    setIsLoading(true)
    setError(null)

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
  return { generateOTP, error, isLoading, data }
}

export default useRecoverPassword
