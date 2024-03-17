import { useEffect, useState } from 'react'
import Backdrop from '../Backdrop/Backdrop'
import { useDispatch, useSelector } from 'react-redux'
import {
  togglePopup,
  updateWorkout,
} from '../../features/workouts/workoutsSlice'

const WorkoutEditPopup = ({ workout }) => {
  const dispatch = useDispatch()
  const { popup } = useSelector((store) => store.workouts)
  const { isSignedIn, user } = useSelector((store) => store.user)

  const [title, setTitle] = useState('')
  const [repetitions, setRepetitions] = useState('')
  const [sets, setSets] = useState('')
  const [load, setLoad] = useState('')
  const [duration, setDuration] = useState('')
  const [error, setError] = useState(null)

  const handleCloseBtn = () => {
    dispatch(togglePopup())
  }

  const handleSubmit = async (e, type) => {
    e.preventDefault()
    if (!isSignedIn) {
      setError('The user must be authorized')
      return
    }

    if (!title || !sets || !repetitions) {
      return setError('Fields are required!')
    }

    const editedWorkout = {
      title,
      load,
      repetitions,
      sets,
      duration,
      createdAt: workout.createdAt,
    }

    const response = await fetch('https://workout-buddy-self.vercel.app/api/workouts/' + workout._id, {
      method: 'PATCH',
      body: JSON.stringify(editedWorkout),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      setError(data.error)
    }
    if (response.ok) {
      console.log(data)
      dispatch(updateWorkout({ prev: data, current: editedWorkout }))
      dispatch(togglePopup())
      setError(null)
      setTitle(null)
      setLoad(null)
      setRepetitions(null)
      setSets(null)
    }
  }

  useEffect(() => {
    console.log()
  }, [])

  return (
    popup && (
      <Backdrop onClick={handleCloseBtn}>
        <form
          className="mx-4 flex min-w-[18rem] flex-col items-start justify-start 
          gap-2 rounded-2xl bg-slate-100 p-4 text-base text-slate-900 
          sm:min-w-96 sm:p-8 dark:bg-slate-900 dark:text-slate-300"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleCloseBtn}
            type="button"
            className="material-symbols-outlined self-end"
          >
            Close
          </button>
          <h3 className="mb-4 text-2xl font-semibold tracking-wider text-slate-900 dark:text-slate-200">
            Edit a Workout
          </h3>
          <div className="flex w-full flex-col gap-1">
            <label htmlFor="workout-title" className="">
              Exercise Title:
            </label>
            <input
              type="text"
              name="title"
              id="workout-title"
              className="h-10 rounded-lg bg-slate-50 px-2 dark:bg-slate-800"
              placeholder="Exercise title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col gap-1">
            <label htmlFor="workout-repetitions">Reps: </label>
            <input
              type="number"
              name="repetitions"
              id="workout-repetitions"
              placeholder="Reps"
              className="h-10 rounded-lg bg-slate-50 px-2 dark:bg-slate-800"
              value={repetitions}
              onChange={(e) => setRepetitions(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col gap-1">
            <label htmlFor="workout-sets">Sets: </label>
            <input
              type="number"
              name="sets"
              id="workout-sets"
              placeholder="Sets"
              className="h-10 rounded-lg bg-slate-50 px-2 dark:bg-slate-800"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col gap-1">
            <label htmlFor="workout-load">Load: (in Kilos)</label>
            <input
              type="number"
              name="load"
              id="workout-load"
              placeholder="Load"
              className="h-10 rounded-lg bg-slate-50 px-2 dark:bg-slate-800"
              value={load}
              onChange={(e) => setLoad(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col gap-1">
            <label htmlFor="workout-duration">Duration: (in seconds)</label>
            <input
              type="number"
              name="duration"
              id="workout-duration"
              placeholder="Duration"
              className="h-10 rounded-lg bg-slate-50 px-2 dark:bg-slate-800"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="mt-4 flex items-center justify-center self-center rounded-xl 
          bg-green-500 px-5 py-2 text-base font-semibold text-slate-100 hover:bg-green-600 
          md:text-lg dark:bg-green-700"
            onClick={handleSubmit}
          >
            <span className="material-symbols-outlined mr-2 text-xl">edit</span>
            Edit Workout
          </button>
          {error && (
            <div className="mt-2 w-full rounded-md border border-red-600 bg-slate-100 p-2 text-sm font-bold text-red-600">
              {error}
            </div>
          )}
        </form>
      </Backdrop>
    )
  )
}

export default WorkoutEditPopup
