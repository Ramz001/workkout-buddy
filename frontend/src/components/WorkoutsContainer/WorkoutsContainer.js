import { useEffect } from "react";
import WorkoutDetails from "../WorkoutDetails/WorkoutDetails";
import WorkoutForm from "../../components/WorkoutForm/WorkoutForm";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext/useWorkoutsContext";

const WorkoutsContainer = () => {
  const {workouts, dispatch} = useWorkoutsContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts");
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: data })
      }
    };
    fetchWorkouts();
  }, [dispatch]);

  return (
    <section className="flex flex-col-reverse md:flex-row gap-4 h-full min-h-[85vh]">
      <div className="flex flex-col w-full gap-4">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </section>
  );
};

export default WorkoutsContainer;
