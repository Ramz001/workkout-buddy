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
        className="px-10 md:px-16 py-6 justify-between items-center bg-slate-100
       text-slate-900 2xl:rounded-2xl shadow-md flex"
      >
        <Link
          href="/"
          className="text-xl sm:text-2xl md:text-3xl 2xl:text-4xl font-bold tracking-wider"
        >
          <h2>Workout Buddy</h2>
        </Link>
        {isSignedIn ? (
          <div className="flex gap-4 items-center justify-center">
            <p className="tracking-wide">{user.name}</p>
            <Link to="/login" onClick={logOut}>
              <button className="hover:underline hover:text-slate-500 tracking-wide">Log out</button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 tracking-wide">
            <Link to="/login" className="hover:underline">
              Log In
            </Link>
            <Link to="/signup" className="hidden sm:block hover:underline">
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    )
  );
};

export default Navbar;
