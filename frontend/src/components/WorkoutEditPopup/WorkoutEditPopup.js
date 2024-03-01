import { useWorkoutsContext } from "../../hooks/useWorkoutsContext/useWorkoutsContext";
import { useState } from "react";

const WorkoutEditPopup = ({ workout }) => {
  const { state, dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [repetitions, setRepetitions] = useState(0);
  const [sets, setSets] = useState(0);
  const [load, setLoad] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(null);

  const handleCloseBtn = () => {
    dispatch({ type: "TOGGLE_POPUP" })
  }

  const handleSubmit = async (e, type) => {
    e.preventDefault()

    if (!title || !sets || !repetitions) {
      return setError("Fields are required!");
    }

    const editedWorkout = { title, load, repetitions, sets, duration, createdAt: workout.createdAt };

    const response = await fetch('/api/workouts/' + workout._id, {
      method: "PATCH",
      body: JSON.stringify(editedWorkout),
      headers: {
        'Content-Type': 'application/json',
        },
    })

    const data = await response

    if (!response.ok) {
      setError(data.error);
    }
    if (response.ok) {
      dispatch({ type: "EDIT_WORKOUT", payload: editedWorkout });
      dispatch({ type: "DELETE_WORKOUT", payload: workout })
      dispatch({ type: "TOGGLE_POPUP" })
      setError(null);
      setTitle(null);
      setLoad(null);
      setRepetitions(null);
      setSets(null);
    }
  }

  return (
    state.popup && (
      <div
        className="absolute bottom-0 left-0 top-0 flex items-center justify-center 
    w-full h-full bg-black bg-opacity-25"
      >
        <form
          className="flex flex-col gap-2 justify-start items-start min-w-96
    rounded-xl p-4 text-base  bg-slate-100"
        >
          <button onClick={handleCloseBtn} type="button" className="material-symbols-outlined self-end">Close</button>
          <h3 className="text-2xl font-semibold tracking-wider mb-4">
            Edit a Workout
          </h3>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="workout-title" className="">
              Exercise Title:
            </label>
            <input
              type="text"
              name="title"
              id="workout-title"
              className={` px-2 h-10 rounded-lg`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="workout-repetitions">Reps: </label>
            <input
              type="number"
              name="repetitions"
              id="workout-repetitions"
              className={` px-2 h-10 rounded-lg`}
              value={repetitions}
              onChange={(e) => setRepetitions(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="workout-sets">Sets: </label>
            <input
              type="number"
              name="sets"
              id="workout-sets"
              className={` px-2 h-10 rounded-lg`}
              value={sets}
              onChange={(e) => setSets(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="workout-load">Load: (in Kilos)</label>
            <input
              type="number"
              name="load"
              id="workout-load"
              className="px-2 h-10 rounded-lg"
              value={load}
              onChange={(e) => setLoad(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="workout-duration">Duration: (in seconds)</label>
            <input
              type="number"
              name="duration"
              id="workout-duration"
              className="px-2 h-10 rounded-lg"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="self-center rounded-xl px-5 py-2 hover:bg-green-600 text-base 
          md:text-lg font-semibold flex justify-center items-center bg-green-500 
          text-slate-100 mt-4"
          onClick={handleSubmit}
          >
            Edit Workout
          </button>
          {error && (
        <div className="text-red-600 font-bold text-sm w-full p-2 border bg-slate-100 rounded-md mt-2 border-red-600">
          {error}
        </div>
      )}
        </form>
      </div>
    )
  );
};

export default WorkoutEditPopup;
