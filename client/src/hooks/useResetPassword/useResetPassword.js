/* eslint-disable no-unused-vars */
import { useAuthContext } from "../useAuthContext/useAuthContext";
import { useState } from "react";

const useResetPassword = () => {
  const { user } = useAuthContext()
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = async (email) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch("api/user/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email })
    })
    const data = await response.json()
    if(!response.ok){
      setIsLoading(false)
      setError(data.error)
    }
    if(response.ok){
      setIsLoading(false)
      console.log('password reset')
    }
  }
}

export default useResetPassword