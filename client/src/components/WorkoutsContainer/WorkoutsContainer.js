import { useEffect } from 'react'
import WorkoutDetails from '../WorkoutDetails/WorkoutDetails'
import WorkoutForm from '../../components/WorkoutForm/WorkoutForm'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setWorkouts } from '../../features/workouts/workoutsSlice'

const WorkoutsContainer = () => {
  const dispatch = useDispatch()
  const { isSignedIn, user } = useSelector(store => store.user)
  const { workouts } = useSelector(store => store.workouts)

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      const data = await response.json()
      if (response.ok) {
        dispatch(setWorkouts(data))
      }
    }
    if (isSignedIn) {
      fetchWorkouts()
    }
  }, [dispatch, isSignedIn, user])

  return (
    <section className="flex flex-col-reverse gap-y-6 md:flex-row md:gap-8">
      <div className="flex w-full flex-col gap-4">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails
              key={workout._id + Math.random()}
              workout={workout}
            />
          ))}
        {!isSignedIn && !workouts && (
          <div className="mt-4 flex flex-col gap-2 text-center text-slate-900 dark:text-slate-200">
            <h3 className="text-2xl font-semibold md:text-3xl">
              The User is Not Logged in!
            </h3>
            <p className="text-sm md:text-base">
              Please login to see the content of workouts.
            </p>
            <p className="text-sm md:text-base">
              Here is a link to the{' '}
              <Link to="/login" className="underline hover:text-green-600">
                Login
              </Link>{' '}
              page.
            </p>
          </div>
        )}
        {workouts && workouts.length === 0 && isSignedIn && (
          <p className="text-center text-lg font-semibold tracking-wide text-slate-900 md:text-xl dark:text-slate-200">
            No workouts are available!
          </p>
        )}
      </div>
      {workouts && <WorkoutForm />}
    </section>
  )
}

export default WorkoutsContainer
