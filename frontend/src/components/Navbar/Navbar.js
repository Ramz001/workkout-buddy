import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav
      className={`px-10 md:px-16 py-6 flex justify-between items-center bg-slate-100
      ${location.pathname === "/login" && "hidden"}
      ${location.pathname === "/signup" && "hidden"}
    `}
    >
      <Link
        href="/"
        className="text-2xl md:text-3xl 2xl:text-4xl font-bold tracking-wider"
      >
        <h2>Workout Buddy</h2>
      </Link>
      <Link to="/signup">Log out</Link>
    </nav>
  );
};

export default Navbar;
