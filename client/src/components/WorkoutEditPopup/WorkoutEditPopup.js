import Backdrop from '../Backdrop/Backdrop'
import { useState } from 'react'
import { useUpdateWorkout } from '../../hooks/useUpdateWorkout/useUpdateWorkout'

const WorkoutEditPopup = ({ workout, setPopUP }) => {
  const { updateWorkout, isLoading, error } = useUpdateWorkout()

  const [title, setTitle] = useState(workout.title)
  const [repetitions, setRepetitions] = useState(workout.repetitions)
  const [sets, setSets] = useState(workout.sets)
  const [load, setLoad] = useState(workout.load ?? '')
  const [duration, setDuration] = useState(workout.duration ?? '')
  const [inputError, setInputError] = useState(null)

  const handleCloseBtn = () => {
    setPopUP(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !sets || !repetitions) {
      return setInputError('Fields are required!')
    }

    const editedWorkout = {
      id: workout._id,
      title,
      load,
      repetitions,
      sets,
      duration,
      createdAt: workout.createdAt,
    }
    console.log(editedWorkout)
    await updateWorkout(editedWorkout)

    if (!isLoading && !error) {
      setPopUP(false)
    }
  }

  return (
    <Backdrop onClick={handleCloseBtn}>
      <form
        className="mx-4 flex w-full min-w-[18rem] flex-col items-start justify-start gap-2 
          rounded-2xl border bg-slate-100 p-4 text-base text-slate-900 
          sm:min-w-96 sm:p-8 md:w-auto dark:bg-slate-900 dark:text-slate-300 "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleCloseBtn}
          type="button"
          className="self-end fill-slate-900 dark:fill-slate-100"
          aria-label="close popup"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
        <h3 className="mb-4  text-2xl font-semibold tracking-wider text-slate-900 dark:text-slate-200">
          Edit a Workout
        </h3>
        <div className="flex w-full flex-col gap-1">
          <label htmlFor="workout-title">Exercise Title:</label>
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
          className="mt-4 flex items-center justify-center gap-2 self-center 
          rounded-xl bg-green-500 fill-slate-100 px-5 py-2 text-base font-semibold 
          text-slate-100 hover:bg-green-600 md:text-lg dark:bg-green-700"
          onClick={handleSubmit}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            aria-details="edit button"
          >
            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
          </svg>
          Edit Workout
        </button>
        {inputError && (
          <div className="mt-2 w-full rounded-md border border-red-600 bg-slate-100 p-2 text-sm font-bold text-red-600">
            {inputError}
          </div>
        )}
        {error && (
          <div className="mt-2 w-full rounded-md border border-red-600 bg-slate-100 p-2 text-sm font-bold text-red-600">
            {error}
          </div>
        )}
      </form>
    </Backdrop>
  )
}

export default WorkoutEditPopup
