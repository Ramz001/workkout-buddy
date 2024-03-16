import { Link, useLocation } from 'react-router-dom'
import { useLogOut } from '../../hooks/useLogOut/useLogOut'
import {  useSelector } from 'react-redux'



const Navbar = () => {
  const location = useLocation()
  const { logOut } = useLogOut()
  const { isSignedIn, user } = useSelector(store => store.user)

  return (
    location.pathname === '/' && (
      <nav
        className="mx-auto flex max-w-[1920px] items-center justify-between bg-slate-100 
        px-10 py-6 text-slate-900 shadow-md md:px-16 dark:bg-slate-900 dark:text-slate-300"
      >
        <h3
          className="cursor-default text-base font-bold tracking-wider 
        hover:text-green-600 sm:text-2xl md:text-3xl 2xl:text-4xl"
        >
          Mr Workout Buddy
        </h3>
        {isSignedIn ? (
          <div className="flex items-center justify-center gap-4 md:gap-8">
            <p className="hidden cursor-default tracking-wide sm:block">
              {user.name}
            </p>
            <Link to="/login" onClick={logOut}>
              <button className="tracking-wide hover:text-green-600 hover:underline">
                Log out
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4 tracking-wide sm:gap-6 md:gap-8">
            <Link to="/login" className="hover:text-green-600 hover:underline">
              Log In
            </Link>
            <Link
              to="/signup"
              className="hidden hover:text-green-600 hover:underline sm:block"
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    )
  )
}

export default Navbar
