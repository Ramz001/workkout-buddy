import { useAuthContext } from '../../hooks/useAuthContext/useAuthContext'
import { useWorkoutsContext } from '../../hooks/useWorkoutsContext/useWorkoutsContext'
import WorkoutEditPopup from '../WorkoutEditPopup/WorkoutEditPopup'
import { formatDistanceToNow } from 'date-fns'

const WorkoutDetails = ({ workout }) => {
  const { title, repetitions, load, sets, duration, createdAt, _id } = workout
  const { dispatch } = useWorkoutsContext()
  const { user, isSignedIn } = useAuthContext()

  const handleDeleteBtn = async () => {
    if (!isSignedIn) {
      return
    }

    const response = await fetch('/api/workouts/' + _id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    const data = await response.json()

    if (!response.ok) {
      throw Error('Cannot delete a workout')
    }
    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: data })
    }
  }

  const handleEditBtn = () => {
    dispatch({ type: 'TOGGLE_POPUP' })
  }

  return (
    <div
      className="flex h-fit items-start justify-between rounded-xl bg-slate-100 px-4 py-6 
      text-lg text-gray-900 shadow-xl sm:px-8 md:min-w-96 
      2xl:px-10 dark:bg-slate-900 dark:text-slate-200"
    >
      <div className="flex flex-col items-start justify-start gap-1">
        <h4 className="mb-2 text-lg font-bold tracking-wide text-green-600 md:text-xl">
          {title}
        </h4>
        {load !== 0 && load && (
          <p className="text-sm sm:text-base">
            <span className="bold">Load: </span>
            {load} kgs
          </p>
        )}
        <p className="text-sm sm:text-base">
          <span className="font-bold">Sets: </span> {sets}
        </p>
        <p className="text-sm sm:text-base">
          <span className="font-bold">Reps: </span> {repetitions}
        </p>

        {duration !== 0 && duration && (
          <p className="text-sm sm:text-base">
            <span className="font-bold">Duration: </span> {duration} seconds
          </p>
        )}
        <p className="text-sm sm:text-base">
          <span className="font-bold">Date: </span>
          {formatDistanceToNow(new Date(createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
      <div className="flex flex-col gap-4 self-center font-bold sm:self-start">
        <button
          className="material-symbols-outlined rounded-lg border border-red-600 px-3 py-1 
          text-base text-red-600 hover:bg-red-600 hover:text-slate-100"
          onClick={handleDeleteBtn}
        >
          Delete
        </button>
        <button
          className="material-symbols-outlined rounded-lg border border-green-600 px-3 py-1 
          text-base text-green-600 hover:bg-green-600 hover:text-slate-100"
          onClick={handleEditBtn}
        >
          edit
        </button>
      </div>
      <WorkoutEditPopup workout={workout} />
    </div>
  )
}

export default WorkoutDetails
