import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext/useAuthContext";
import { Suspense, lazy } from "react";
import Spinner from "./components/Spinner/Spinner";

const Home = lazy(() => import("./routes/Home/Home"));
const Navbar = lazy(() => import("./components/Navbar/Navbar"));
const SignUp = lazy(() => import("./routes/SignUp/SignUp"));
const Login = lazy(() => import("./routes/Login/Login"));
const ForgotPassword = lazy(() =>
  import("./routes/ForgotPassword/ForgotPassword")
);
const Error = lazy(() => import("./routes/Error/Error"));
const ResetPassword = lazy(() => import("./routes/ResetPassword/ResetPassword"))

function App() {
  const { isSignedIn } = useAuthContext();

  return (
    <Suspense
      fallback={<Spinner/>}
      className="mx-[auto] max-w-[1920px] bg-slate-50 min-h-screen"
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={isSignedIn ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isSignedIn ? <Navigate to="/" /> : <SignUp />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </Suspense>
  );
}

export default App;
