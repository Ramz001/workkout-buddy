import { useState } from 'react'
import { fetchWorkouts } from '../../features/workouts/workoutsSlice'
import { useDispatch, useSelector } from 'react-redux'

export const useUpdateWorkout = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((store) => store.user)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const updateWorkout = async ({
    title,
    repetitions,
    sets,
    duration,
    load,
    id,
  }) => {
    setIsLoading(true)
    setError(null)

    if (!id || typeof id !== 'string') {
      return setError('ID is required')
    }
    if (!title || !repetitions || !sets) {
      return setError('All fields are required')
    }

    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + '/api/workouts/' + id,
        {
          method: 'PATCH',
          body: JSON.stringify({
            title,
            repetitions,
            sets,
            duration,
            load,
            _id: id,
          }),
          headers: {
            'Content-Type': 'application/json',
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
  return { updateWorkout, isLoading, error }
}
