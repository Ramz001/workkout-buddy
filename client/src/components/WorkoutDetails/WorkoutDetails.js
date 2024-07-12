import WorkoutEditPopup from '../WorkoutEditPopup/WorkoutEditPopup'
import { useState } from 'react'
import { useDeleteWorkout } from '../../hooks/useDeleteWorkout/useDeleteWorkout'

const WorkoutDetails = ({ workout }) => {
  const { title, repetitions, load, sets, duration, createdAt, _id } = workout
  const [popUp, setPopUp] = useState(false)
  const { deleteWorkout, error } = useDeleteWorkout()

  const handleDeleteBtn = async () => {
    await deleteWorkout(_id)
  }

  const handleEditBtn = () => {
    setPopUp(true)
  }
  let hours = new Date(createdAt).toString().slice(15, 24)
  let date = new Date(createdAt).toString().slice(0, 15)

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
            <span className="font-bold">Load: </span>
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
          {hours}, {date}
        </p>
        {error && <p>{error.message}</p>}
      </div>
      <div className="flex flex-col gap-4 self-center font-bold sm:self-start">
        <button
          className="rounded-lg border border-red-600 fill-red-600 px-3 py-1 
          hover:bg-red-600 hover:fill-slate-100"
          onClick={handleDeleteBtn}
          aria-label="delete"
          title="Delete a workout"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
        </button>
        <button
          className="group rounded-lg border border-green-600 fill-green-600 
          px-3 py-1 hover:bg-green-600 hover:fill-slate-100"
          aria-label="edit"
          title="Edit a workout"
          onClick={handleEditBtn}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
          </svg>
        </button>
      </div>
      {popUp && (
        <WorkoutEditPopup popUp={popUp} setPopUP={setPopUp} workout={workout} />
      )}
    </div>
  )
}

export default WorkoutDetails
