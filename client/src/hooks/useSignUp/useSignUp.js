import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../features/user/userSlice'

export const useSignUp = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const signUp = async (name, email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('https://workout-buddy-self.vercel.app/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })
    const data = await response.json()

    if (!response.ok) {
      setError(data.error)
      setIsLoading(false)
    }
    if (response.ok) {
      dispatch(login(data))
      setIsLoading(false)
    }
  }
  return { signUp, isLoading, error }
}
