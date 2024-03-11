import { useContext } from "react";
import { WorkoutContext } from "../../providers/WorkoutContext.js/WorkoutContext";

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw Error("useWorkoutsContext must be used inside a Provider!");
  }

  return context;
};
