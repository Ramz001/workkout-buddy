import { useEffect } from "react";
import { useWorkoutsContext } from "../../hooks/useWorkoutsContext/useWorkoutsContext";
import WorkoutDetails from "../WorkoutDetails/WorkoutDetails";
import WorkoutForm from "../../components/WorkoutForm/WorkoutForm";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext/useAuthContext";

const WorkoutsContainer = () => {
  const { state, dispatch } = useWorkoutsContext();
  const { workouts } = state;
  const { isSignedIn, user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: data });
      }
    };
    if (isSignedIn) {
      fetchWorkouts();
    }
  }, [dispatch, isSignedIn, user]);

  return (
    <section className="flex flex-col-reverse md:flex-row gap-y-6 md:gap-8">
      <div className="flex flex-col w-full gap-4">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails
              key={workout._id + Math.random()}
              workout={workout}
            />
          ))}
        {!isSignedIn && !workouts && (
          <div className="text-center flex flex-col gap-2 mt-4 dark:text-slate-200 text-slate-900">
            <h3 className="text-2xl font-semibold md:text-3xl">
              The User is Not Logged in!
            </h3>
            <p className="text-sm md:text-base">
              Please login to see the content of workouts.
            </p>
            <p className="text-sm md:text-base">
              Here is a link to the{" "}
              <Link to="/login" className="underline hover:text-green-600">
                Login
              </Link>{" "}
              page.
            </p>
          </div>
        )}
        {workouts && workouts.length === 0 && isSignedIn && (
          <p className="text-center text-lg md:text-xl tracking-wide font-semibold dark:text-slate-200 text-slate-900">
            No workouts are available!
          </p>
        )}
      </div>
      {workouts && <WorkoutForm />}
    </section>
  );
};

export default WorkoutsContainer;
