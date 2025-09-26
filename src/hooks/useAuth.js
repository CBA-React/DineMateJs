import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, register, reset } from "/src/features/auth/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const isAuthenticated = !!user;
  const token = user?.token ?? user?.token.access_token ?? null;

  const loginUser = useCallback((userData) => {
    return dispatch(login(userData)).unwrap(); 
  }, [dispatch]);

  const registerUser = useCallback((userData) => {
    return dispatch(register(userData)).unwrap();
  }, [dispatch]);

  const logoutUser = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const resetAuthState = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    isSuccess,
    isError,
    message,
    loginUser,
    registerUser,
    logoutUser,
    resetAuthState,
  };
};

export default useAuth;
