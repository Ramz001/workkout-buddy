import { useState } from 'react'

const useResetPassword = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isPasswordChanged, setIsPasswordChanged] = useState(false)

  const updatePassword = async (password, _id, token) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`https://workout-buddy-self.vercel.app/api/user/reset-password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, _id, token }),
      })
      const data = await response.json()
  
      if (response.ok) {
        setIsLoading(false)
        setIsPasswordChanged(true)
      } else {
        setIsPasswordChanged(false)
        setIsLoading(false)
        setError(data.error)
      }
    } catch (error) {
      setIsLoading(false)
      setError(error)      
    }
  }
  return { updatePassword, error, isLoading, isPasswordChanged }
}

export default useResetPassword
