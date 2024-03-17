import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../features/user/userSlice'

export const useLogIn = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const logIn = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('https://workout-buddy-self.vercel.app/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    const data = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(data.error)
    }
    if (response.ok) {
      dispatch(login(data))
      setIsLoading(false)
    }
  }
  return { logIn, isLoading, error }
}
