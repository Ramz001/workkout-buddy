import { useState } from 'react'

const useVerifyCode = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)

  const verifyCode = async (code, _id) => {
    setIsLoading(true)
    setError(null)
    setData(null)

    try {
      
      const response = await fetch('https://workout-buddy-self.vercel.app/api/user/verifyOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, _id }),
      })
  
      const data = await response.json()
      if (response.ok) {
        setData(data)
        setIsLoading(false)
      } else {
        setIsLoading(false)
        setData(null)
        setError(data.error)
      }
    } catch (error) {
      setIsLoading(false)
      setError(error)
    }
  }
  return { verifyCode, error, isLoading, data }
}

export default useVerifyCode
