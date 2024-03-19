import { Suspense, lazy, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Spinner from './components/Spinner/Spinner'
import { useSelector } from 'react-redux'

const Home = lazy(() => import('./routes/Home/Home'))
const Login = lazy(() => import('./routes/Login/Login'))
const SignUp = lazy(() => import('./routes/SignUp/SignUp'))
const Navbar = lazy(() => import('./components/Navbar/Navbar'))
const Error = lazy(() => import('./routes/Error/Error'))
const VerifyEmail = lazy(() => import('./routes/VerifyEmail/VerifyEmail'))
const RecoverPassword = lazy(
  () => import('./routes/RecoverPassword/RecoverPassword')
)
const ResetPassword = lazy(() => import('./routes/ResetPassword/ResetPassword'))

function App() {
  const { isSignedIn } = useSelector((store) => store.user)

  const [temp, setTemp] = useState({ email: '', _id: '', token: '' })

  return (
    <Suspense
      fallback={<Spinner />}
      className="mx-auto min-h-svh md:min-h-screen max-w-[1920px] bg-slate-50 dark:bg-slate-700"
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
          element={
            isSignedIn ? (
              <Navigate to="/" />
            ) : (
              <RecoverPassword setTemp={setTemp} />
            )
          }
        />
        <Route
          path="/verify-email/"
          element={
            !temp._id ? (
              <Navigate to="/recover-password" />
            ) : (
              <VerifyEmail temp={temp} setTemp={setTemp} />
            )
          }
        />
        <Route
          path="/reset-password/"
          element={
            !temp.token ? (
              <Navigate to="/recover-password" />
            ) : (
              <ResetPassword temp={temp} setTemp={setTemp} />
            )
          }
        />
        <Route path="/*" element={<Error />} />
      </Routes>
    </Suspense>
  )
}

export default App
