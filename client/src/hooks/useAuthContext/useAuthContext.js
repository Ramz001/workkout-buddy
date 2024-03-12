import { useContext } from 'react'
import { AuthContext } from '../../providers/AuthContext.js/AuthContext'

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw Error('useAuthContext must be used inside a Provider!')
  }
  return context
}
