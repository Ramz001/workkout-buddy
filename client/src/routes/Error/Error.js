import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2 text-wrap px-4">
      <span className="material-symbols-outlined mb-4 text-[10rem] text-slate-700 md:text-[14rem] dark:text-slate-500">
        sentiment_dissatisfied
      </span>
      <h1 className="text-3xl font-semibold text-red-500 md:text-4xl">
        Error 404!
      </h1>
      <p className="text-base md:text-lg dark:text-slate-200">
        Unfortunately, the page you are requesting is not found.
      </p>
      <p className="text-sm text-slate-700 md:text-base dark:text-slate-300">
        Please press this button to return to the home page.
      </p>
      <Link
        to="/"
        className="mt-2 flex justify-center gap-1 rounded-xl border border-slate-600 
        px-4 py-2 hover:bg-slate-600 hover:text-slate-100 dark:text-slate-100"
      >
        <span className="material-symbols-outlined font-bold">Arrow_Back</span>
        Go Back
      </Link>
    </div>
  )
}

export default Error
