import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createWorkout } from '../../features/workouts/workoutsSlice'

const WorkoutForm = () => {
  const dispatch = useDispatch()
  const { user, isSignedIn } = useSelector((store) => store.user)

  const [title, setTitle] = useState('')
  const [repetitions, setRepetitions] = useState('')
  const [sets, setSets] = useState('')
  const [load, setLoad] = useState('')
  const [duration, setDuration] = useState('')
  const [error, setError] = useState('')
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isSignedIn) {
      setError('The user must be authorized')
      return
    }
    if (!title || !sets || !repetitions) {
      return setError('Fields are required!')
    }
    const createdAt = new Date().toISOString().slice(0, 10)

    const workout = { title, load, repetitions, sets, duration, createdAt }

    const response = await fetch(
      'https://workout-buddy-self.vercel.app/api/workouts',
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

    if (!response.ok) {
      setError(data.error)
      setEmptyFields(data.emptyFields)
    }
    if (response.ok) {
      dispatch(createWorkout(data))
      setError('')
      setTitle('')
      setLoad('')
      setRepetitions('')
      setSets('')
      setEmptyFields([])
    }
  }

  return (
    <form
      className="sticky flex h-fit w-full max-w-[22rem] flex-col items-start justify-start 
      gap-1 self-center rounded-xl bg-slate-100 px-4 py-6 text-base shadow-md md:w-1/3 
      md:max-w-96 md:self-start dark:bg-slate-900 dark:text-slate-300"
    >
      <h3 className="mb-2 text-xl font-semibold text-slate-900 md:mb-4 md:text-xl dark:text-slate-200">
        Add a New Workout
      </h3>
      <div className="flex w-full flex-col gap-1">
        <label htmlFor="workout-title" className="text-sm sm:text-base">
          Exercise Title:
        </label>
        <input
          type="text"
          name="title"
          id="workout-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`${
            emptyFields && emptyFields.includes('title')
              ? 'border-2 border-red-500'
              : ' '
          } h-8 rounded-lg bg-slate-50 px-2 shadow dark:bg-slate-700`}
        />
      </div>
      <div className="flex w-full flex-col gap-1">
        <label htmlFor="workout-repetitions" className="text-sm sm:text-base">
          Reps:{' '}
        </label>
        <input
          type="number"
          name="repetitions"
          id="workout-repetitions"
          value={repetitions}
          onChange={(e) => setRepetitions(e.target.value)}
          className={`${
            emptyFields && emptyFields.includes('repetitions')
              ? 'border-2 border-red-500'
              : ' '
          } h-8 rounded-lg bg-slate-50 px-2 shadow dark:bg-slate-700`}
        />
      </div>
      <div className="flex w-full flex-col gap-1">
        <label htmlFor="workout-sets" className="text-sm sm:text-base">
          Sets:{' '}
        </label>
        <input
          type="number"
          name="sets"
          id="workout-sets"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          className={`${
            emptyFields && emptyFields.includes('sets')
              ? 'border-2 border-red-500'
              : ''
          } h-8 rounded-lg bg-slate-50 px-2 shadow dark:bg-slate-700`}
        />
      </div>
      <div className="flex w-full flex-col gap-1">
        <label htmlFor="workout-load" className="text-sm sm:text-base">
          Load: (in Kilos)
        </label>
        <input
          type="number"
          name="load"
          id="workout-load"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          className="h-8 rounded-lg bg-slate-50 px-2 shadow dark:bg-slate-700"
        />
      </div>
      <div className="flex w-full flex-col gap-1">
        <label htmlFor="workout-duration" className="text-sm sm:text-base">
          Duration: (in seconds)
        </label>
        <input
          type="number"
          name="duration"
          id="workout-duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="h-8 rounded-lg bg-slate-50 px-2 shadow dark:bg-slate-700"
        />
      </div>

      <button
        type="submit"
        className="mt-4 flex items-center justify-center gap-1 rounded-lg 
        bg-green-500 fill-slate-100 px-4 py-2 text-base font-semibold
        text-slate-100 shadow-inner hover:bg-green-600 md:text-lg dark:bg-green-700"
        onClick={(e) => handleSubmit(e)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
        Workout
      </button>
      {error && (
        <div className="mt-2 rounded-md border border-red-600 bg-slate-100 p-2 text-sm font-bold text-red-600 dark:bg-slate-800">
          {error}
        </div>
      )}
    </form>
  )
}

export default WorkoutForm
