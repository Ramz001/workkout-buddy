import { useAuthContext } from "../../hooks/useAuthContext/useAuthContext";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext/useWorkoutsContext";
import WorkoutEditPopup from "../WorkoutEditPopup/WorkoutEditPopup";

const WorkoutDetails = ({ workout }) => {
  const { title, repetitions, load, sets, duration, createdAt, _id } = workout;
  const { dispatch } = useWorkoutsContext();
  const { user, isSignedIn } = useAuthContext();

  const handleDeleteBtn = async () => {
    if (!isSignedIn) {
      return;
    }

    const response = await fetch("/api/workouts/" + _id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw Error("Cannot delete a workout");
    }
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: data });
    }
  };

  const handleEditBtn = () => {
    dispatch({ type: "TOGGLE_POPUP" });
  };

  return (
    <div
      className="text-lg flex justify-between items-start px-4 sm:px-8 py-6 shadow-xl bg-gray-100 
    md:min-w-96 h-fit rounded-xl text-gray-900"
    >
      <div className="flex flex-col justify-start items-start">
        <h4 className="text-lg md:text-xl mb-2 font-bold tracking-wide text-green-600">
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
          {createdAt && createdAt.slice(0, 10)}
        </p>
      </div>
      <div className="flex flex-col gap-4 self-center sm:self-start font-bold">
        <button
          className="text-red-600 text-base border border-red-600 py-1 px-3 
          rounded-lg hover:text-slate-100 hover:bg-red-600 material-symbols-outlined"
          onClick={handleDeleteBtn}
        >
          Delete
        </button>
        <button
          className="text-green-600 text-base border border-green-600 py-1 px-3 
          rounded-lg hover:text-slate-100 hover:bg-green-600 material-symbols-outlined"
          onClick={handleEditBtn}
        >
          edit
        </button>
      </div>
      <WorkoutEditPopup workout={workout} />
    </div>
  );
};

export default WorkoutDetails;
