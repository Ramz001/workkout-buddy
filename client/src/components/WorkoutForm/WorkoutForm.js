import { useState } from "react";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext/useWorkoutsContext";
import { useAuthContext } from "../../hooks/useAuthContext/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user, isSignedIn } = useAuthContext()
  const [title, setTitle] = useState("");
  const [repetitions, setRepetitions] = useState("");
  const [sets, setSets] = useState("");
  const [load, setLoad] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!isSignedIn){
      setError("The user must be authorized")
      return
    }
    if (!title || !sets || !repetitions) {
      return setError("Fields are required!");
    }
    const createdAt = new Date().toISOString().slice(0, 10);

    const workout = { title, load, repetitions, sets, duration, createdAt };

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      },
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      setEmptyFields(data.emptyFields);
    }
    if (response.ok) {
      dispatch({ type: "CREATE_WORKOUT", payload: workout });
      setError(null);
      setTitle(null);
      setLoad(null);
      setRepetitions(null);
      setSets(null);
      setEmptyFields([]);
    }
  };

  return (
    <form
      className="max-w-[22rem] md:max-w-96 self-center flex flex-col gap-1 justify-start items-start sticky shadow-md
    rounded-xl py-6 px-4 text-base bg-slate-100 h-fit w-full md:w-1/3"
    >
      <h3 className="text-xl md:text-xl mb-2 md:mb-4 font-semibold">Add a New Workout</h3>
      <div className="flex flex-col gap-1 w-full">
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
            emptyFields && emptyFields.includes("title")
              ? "border-2 border-red-500"
              : " "
          } px-2 h-8 rounded-lg shadow`}
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="workout-repetitions" className="text-sm sm:text-base">
          Reps:{" "}
        </label>
        <input
          type="number"
          name="repetitions"
          id="workout-repetitions"
          value={repetitions}
          onChange={(e) => setRepetitions(e.target.value)}
          className={`${
            emptyFields && emptyFields.includes("repetitions")
              ? "border-2 border-red-500"
              : " "
          } px-2 h-8 rounded-lg shadow`}
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="workout-sets" className="text-sm sm:text-base">
          Sets:{" "}
        </label>
        <input
          type="number"
          name="sets"
          id="workout-sets"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          className={`${
            emptyFields && emptyFields.includes("sets")
              ? "border-2 border-red-500"
              : ""
          } px-2 h-8 rounded-lg shadow`}
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="workout-load" className="text-sm sm:text-base">
          Load: (in Kilos)
        </label>
        <input
          type="number"
          name="load"
          id="workout-load"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          className="px-2 h-8 rounded-lg shadow"
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="workout-duration" className="text-sm sm:text-base">
          Duration: (in seconds)
        </label>
        <input
          type="number"
          name="duration"
          id="workout-duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="px-2 h-8 rounded-lg shadow"
        />
      </div>

      <button
        type="submit"
        className="rounded-lg px-5 py-2 hover:bg-green-600 text-base md:text-lg 
        font-semibold flex justify-center items-center bg-green-500 text-gray-100
        mt-4 shadow-inner "
        onClick={(e) => handleSubmit(e)}
      >
        <span className="material-symbols-outlined mr-2">Add</span>
        Add Workout
      </button>
      {error && (
        <div className="text-red-600 font-bold text-sm p-2 border bg-slate-100 rounded-md mt-2 border-red-600">
          {error}
        </div>
      )}
    </form>
  );
};

export default WorkoutForm;
