import { useEffect } from "react";
import WorkoutDetails from "../WorkoutDetails/WorkoutDetails";
import WorkoutForm from "../../components/WorkoutForm/WorkoutForm";

const WorkoutsContainer = ({ setWorkouts, workouts }) => {
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts");
      const data = await response.json();
      if (response.ok) {
        return setWorkouts(data);
      }
    };
    fetchWorkouts();
  }, [setWorkouts]);

  return (
    <section className="flex flex-col-reverse md:flex-row gap-4 h-full">
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
