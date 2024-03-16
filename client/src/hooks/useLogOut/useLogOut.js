import { useDispatch } from 'react-redux'
import { logout } from '../../features/user/userSlice'
import { setWorkouts } from '../../features/workouts/workoutsSlice'

export const useLogOut = () => {
  const dispatch = useDispatch()

  const logOut = () => {
    dispatch(logout())
    dispatch(setWorkouts(null))
  }
  return { logOut }
}
