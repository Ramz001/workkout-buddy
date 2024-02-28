/* eslint-disable no-unused-vars */
import { useState } from "react";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [repetitions, setRepetitions] = useState(0);
  const [sets, setSets] = useState(0);
  const [load, setLoad] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, repetitions, sets };
    console.log(workout);

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    setError(null);
    setTitle(null);
    setLoad(null);
    setRepetitions(null);
    setSets(null);
    console.log("new workout added:", json);
  };

  return (
    <form className="flex flex-col gap-1 justify-start items-start bg-gray-100 rounded-xl p-4 text-base md:w-80 md:h-[29rem]">
      <h3 className="text-xl mb-4">Add a New Workout</h3>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="workout-title" className="">
          Exercise Title:{" "}
        </label>
        <input
          type="text"
          name="title"
          id="workout-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-2 h-8 rounded-lg"
          required
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="workout-repetitions">Reps: </label>
        <input
          type="number"
          name="repetitions"
          id="workout-repetitions"
          value={repetitions}
          onChange={(e) => setRepetitions(e.target.value)}
          className="px-2 h-8 rounded-lg"
          required
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="workout-sets">Sets: </label>
        <input
          type="number"
          name="sets"
          id="workout-sets"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          className="px-2 h-8 rounded-lg"
          required
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="workout-load">Load: </label>
        <input
          type="number"
          name="load"
          id="workout-load"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          className="px-2 h-8 rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="workout-duration">Duration: </label>
        <input
          type="number"
          name="duration"
          id="workout-duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="px-2 h-8 rounded-lg"
        />
      </div>

      <button
        type="submit"
        className="rounded-xl px-5 py-2 hover:bg-green-600 text-base md:text-lg 
        font-semibold flex justify-center items-center bg-green-500 text-gray-100
        mt-4"
        onClick={(e) => handleSubmit(e)}
      >
        Add Workout
      </button>
      {error && <div className="text-red-500 text-base">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
