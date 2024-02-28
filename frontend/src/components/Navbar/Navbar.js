import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="div px-10 md:px-16 py-6 flex justify-between items-center">
      <Link
        href="/"
        className="text-2xl md:text-3xl 2xl:text-4xl font-bold tracking-wider"
      >
        <h2>Workout Buddy</h2>
      </Link>
    </nav>
  );
};

export default Navbar;
