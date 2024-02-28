import { useState } from "react";
import WorkoutsContainer from "../../components/WorkoutsContainer/WorkoutsContainer";

const Home = () => {
  const [workouts, setWorkouts] = useState(null);

  return (
    <div className="bg-gray-300 text-xl font-semibold px-10 md:px-16 py-6 ">
      <WorkoutsContainer setWorkouts={setWorkouts} workouts={workouts} />
    </div>
  );
};

export default Home;
