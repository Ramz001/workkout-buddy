import WorkoutDetails from '../WorkoutDetails/WorkoutDetails'
import WorkoutForm from '../../components/WorkoutForm/WorkoutForm'
import Spinner from '../Spinner/Spinner'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchWorkouts } from '../../features/workouts/workoutsSlice'

const WorkoutsContainer = () => {
  const { isSignedIn, user } = useSelector((store) => store.user)
  const { workouts, isLoading, error } = useSelector((store) => store.workouts)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isSignedIn) {
      dispatch(fetchWorkouts(user.token))
    }
  }, [dispatch, isSignedIn, user])

  return (
    <section className="flex flex-col-reverse gap-y-6 md:flex-row md:gap-8">
      <div className="flex w-full flex-col gap-4">
        {isLoading ? (
          <Spinner />
        ) : (
          workouts &&
          workouts.length > 0 &&
          workouts.map((workout, index) => (
            <WorkoutDetails key={index} workout={workout} />
          ))
        )}
        {!isSignedIn
          ? !workouts && (
              <div className="mt-4 flex flex-col gap-2 text-center text-slate-900 dark:text-slate-200">
                <h3 className="text-2xl font-semibold md:text-3xl">
                  The user is not logged in!
                </h3>
                <p className="text-sm md:text-base">
                  Please login to see the content of workouts.
                </p>
                <p className="text-sm md:text-base">
                  Here is a link to the
                  <Link
                    to="/login"
                    className="mx-1 underline hover:text-green-600"
                  >
                    Login
                  </Link>
                  page.
                </p>
              </div>
            )
          : workouts &&
            workouts.length === 0 && (
              <p className="text-center text-lg font-semibold tracking-wide text-slate-900 md:text-xl dark:text-slate-200">
                No workouts are available!
              </p>
            )}
        {error && (
          <div
            className="mt-2 rounded-md border border-red-600 bg-slate-100 p-2 
        text-sm font-bold capitalize text-red-600 dark:bg-slate-800"
          >
            {error}!
          </div>
        )}
      </div>
      {!isLoading && workouts && <WorkoutForm />}
    </section>
  )
}

export default WorkoutsContainer
