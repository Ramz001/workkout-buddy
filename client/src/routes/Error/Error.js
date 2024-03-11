import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="h-screen w-full flex-col gap-2 flex justify-center items-center px-4 text-wrap">
      <span className="material-symbols-outlined text-[10rem] md:text-[14rem] mb-4 dark:text-slate-500 text-slate-700">
        sentiment_dissatisfied
      </span>
      <h1 className="text-3xl md:text-4xl font-semibold text-red-500">
        Error 404!
      </h1>
      <p className="md:text-lg text-base dark:text-slate-200">
        Unfortunately, the page you are requesting is not found.
      </p>
      <p className="dark:text-slate-300 text-slate-700 text-sm md:text-base">
        Please press this button to return to the home page.
      </p>
      <Link
        to="/"
        className="border border-slate-600 px-4 py-2 flex gap-1 justify-center 
        rounded-xl hover:bg-slate-600 hover:text-slate-100 mt-2 dark:text-slate-100"
      >
        <span className="material-symbols-outlined font-bold">Arrow_Back</span>
        Go Back
      </Link>
    </div>
  );
};

export default Error;
