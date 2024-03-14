import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext/useAuthContext'
import { Suspense, lazy } from 'react'
import Spinner from './components/Spinner/Spinner'

const Home = lazy(() => import('./routes/Home/Home'))
const Navbar = lazy(() => import('./components/Navbar/Navbar'))
const SignUp = lazy(() => import('./routes/SignUp/SignUp'))
const Login = lazy(() => import('./routes/Login/Login'))
const RecoverPassword = lazy(
  () => import('./routes/RecoverPassword/RecoverPassword')
)
const Error = lazy(() => import('./routes/Error/Error'))
const ResetPassword = lazy(() => import('./routes/ResetPassword/ResetPassword'))
const VerifyEmail = lazy(() => import('./routes/VerifyEmail/VerifyEmail'))

function App() {
  const { isSignedIn } = useAuthContext()

  return (
    <Suspense
      fallback={<Spinner />}
      className="mx-auto min-h-screen max-w-[1920px] bg-slate-50 dark:bg-slate-700"
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
        <Route
          path="/recover-password"
          element={isSignedIn ? <Navigate to="/" /> : <RecoverPassword />}
        />
        <Route
          path="/reset-password/"
          element={isSignedIn ? <Navigate to="/" /> : <ResetPassword />}
        />
        <Route
          path="/verify-email"
          element={isSignedIn ? <Navigate to="/" /> : <VerifyEmail />}
        />
        <Route path="/*" element={<Error />} />
      </Routes>
    </Suspense>
  )
}

export default App
