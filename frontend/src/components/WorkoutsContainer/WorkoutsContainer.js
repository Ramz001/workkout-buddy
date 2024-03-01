import { useEffect } from "react";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext/useWorkoutsContext";
import WorkoutDetails from "../WorkoutDetails/WorkoutDetails";
import WorkoutForm from "../../components/WorkoutForm/WorkoutForm";

const WorkoutsContainer = () => {
  const {state, dispatch} = useWorkoutsContext()
  const { workouts } = state

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
    <section className="flex flex-col-reverse md:flex-row gap-4">
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
