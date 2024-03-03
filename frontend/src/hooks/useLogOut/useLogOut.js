import { useAuthContext } from "../useAuthContext/useAuthContext"

export const useLogOut = () => {
  const { dispatch } = useAuthContext()
  
  const logOut = ( ) => {
    localStorage.removeItem("user")
    dispatch({ type: "LOGOUT" })

  }
  return { logOut } 
}