import { useState } from 'react'

const useVerifyCode = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)

  const verifyCode = async (code, _id) => {
    setIsLoading(true)
    setError(null)
    setData(null)

    const response = await fetch('/api/user/verifyOTP', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, _id }),
    })

    const data = await response.json()

    if (!response.ok) {
      setData(null)
      setIsLoading(false)
      setError(data.error)
    }
    if (response.ok) {
      setData(data)
      setIsLoading(false)
    }
  }
  return { verifyCode, error, isLoading, data }
}

export default useVerifyCode
