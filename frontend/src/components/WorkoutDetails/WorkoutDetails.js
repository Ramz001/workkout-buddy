const WorkoutDetails = ({ workout }) => {
  const { title, repetitions, load, sets, duration, createdAt } = workout;

  return (
    <div className="text-lg flex flex-col items-start p-4 shadow-xl bg-gray-100 md:min-w-96 h-56 rounded text-gray-900">
      <h4 className="text-xl mb-2 font-bold tracking-wide text-green-600">
        {title}
      </h4>
      {load !== 0 && load && <p>{load}</p>}
      <p>
        <span className="font-bold">Sets: </span> {sets}
      </p>
      <p>
        <span className="font-bold">Reps: </span> {repetitions}
      </p>
      {duration !== 0 && duration && (
        <p>
          <span className="font-bold">Duration: </span> {duration}
        </p>
      )}

      <span>Date: {createdAt.substring(0, 10)}</span>
    </div>
  );
};

export default WorkoutDetails;
