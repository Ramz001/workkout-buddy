import { useState } from 'react'
import { fetchWorkouts } from '../../features/workouts/workoutsSlice'
import { useDispatch, useSelector } from 'react-redux'

export const useDeleteWorkout = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useSelector((store) => store.user)

  const deleteWorkout = async (id) => {
    setIsLoading(true)
    setError(null)

    if (!id || typeof id !== 'string') {
      return setError('ID is required')
    }

    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + '/api/workouts/' + id,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      const data = await response.json()

      if (response.ok) {
        setIsLoading(false)
        dispatch(fetchWorkouts(user.token))
      } else {
        setIsLoading(false)
        setError(data.error)
      }
    } catch (error) {
      setIsLoading(false)
      setError(error)
    }
  }
  return { deleteWorkout, isLoading, error }
}
