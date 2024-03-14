import { useState } from 'react'

const useGenerateCode = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData]  = useState(null)

  const generateCode = async (email, _id, token) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('api/user/generateOTP', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, _id, token }),
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
  return { generateCode, error, isLoading, data }
}

export default useGenerateCode
