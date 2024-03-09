import { useAuthContext } from "../useAuthContext/useAuthContext";
import { useState } from "react";

const useResetPassword = (id, token) => {
  const { isSignedIn } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false)

  if (isSignedIn) {
    return setError("The user is signed in");
  }
  
  const updatePassword = async (password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`/api/user/reset-password/${id}/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });
    const data = await response.json();

    if (!response.ok) {
      setIsPasswordChanged(false)
      setIsLoading(false);
      setError(data.error);
    }
    if (response.ok) {
      setIsLoading(false);
      setIsPasswordChanged(true)      
    }
  };
  return { updatePassword, error, isLoading, isPasswordChanged };
};

export default useResetPassword;
