import { useState } from 'react'
import { fetchWorkouts } from '../../features/workouts/workoutsSlice'
import { useDispatch, useSelector } from 'react-redux'

export const useCreateWorkout = () => {
  const { user } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const createWorkout = async ({
    title,
    load,
    repetitions,
    sets,
    duration,
    createdAt,
  }) => {
    setIsLoading(true)
    setError(null)

    if (!title || !repetitions || !sets) {
      return setError('All fields are required')
    }

    try {
      const workout = { title, load, repetitions, sets, duration, createdAt }
      const response = await fetch(
        process.env.REACT_APP_API_URL + '/api/workouts/',
        {
          method: 'POST',
          body: JSON.stringify(workout),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      const data = await response.json()

      if (response.ok) {
        setIsLoading(false)
        dispatch(fetchWorkouts(user.token, user.expiresAt))
      } else {
        setIsLoading(false)
        setError(data.error)
      }
    } catch (error) {
      setIsLoading(false)
      setError(error)
    }
  }
  return { createWorkout, isLoading, error }
}
