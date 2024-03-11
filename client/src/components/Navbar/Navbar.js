import { Link, useLocation } from "react-router-dom";
import { useLogOut } from "../../hooks/useLogOut/useLogOut";
import { useAuthContext } from "../../hooks/useAuthContext/useAuthContext";

const Navbar = () => {
  const location = useLocation();
  const { logOut } = useLogOut();
  const { isSignedIn, user } = useAuthContext();

  return (
    location.pathname === "/" && (
      <nav
        className="px-10 md:px-16 py-6 justify-between items-center bg-slate-100 dark:bg-slate-900
       text-slate-900 dark:text-slate-300 shadow-md flex max-w-[1920px] mx-auto"
      >
        <h3 className="text-base hover:text-green-600 sm:text-2xl md:text-3xl 
        2xl:text-4xl font-bold tracking-wider cursor-default">
          Mr Workout Buddy
        </h3>
        {isSignedIn ? (
          <div className="flex gap-4 md:gap-8 items-center justify-center">
            <p className="tracking-wide hidden sm:block cursor-default">{user.name}</p>
            <Link to="/login" onClick={logOut}>
              <button className="hover:underline hover:text-green-600 tracking-wide">
                Log out
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 tracking-wide">
            <Link to="/login" className="hover:underline hover:text-green-600">
              Log In
            </Link>
            <Link
              to="/signup"
              className="hidden sm:block hover:underline hover:text-green-600"
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    )
  );
};

export default Navbar;
