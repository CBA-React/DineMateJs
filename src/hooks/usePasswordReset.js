import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setCode,
  clearResetData,
} from "/src/features/auth/passwordResetSlice";
import {
  sendResetCode,
  verifyResetCode,
  changePassword,
} from "/src/services/authService";

export default function usePasswordReset() {
  const dispatch = useDispatch();
  const { email, code } = useSelector((s) => s.passwordReset);

  const requestResetCode = useCallback(
    async (userEmail) => {
      await sendResetCode(userEmail);
      dispatch(setEmail(userEmail));
    },
    [dispatch]
  );

  const verifyCode = useCallback(
    async (enteredCode) => {
      await verifyResetCode(email, Number(enteredCode));
      dispatch(setCode(enteredCode));
    },
    [dispatch, email]
  );

  const updatePassword = useCallback(
    async (pass1, pass2) => {
      await changePassword(email, pass1, pass2, Number(code));
      dispatch(clearResetData());
    },
    [dispatch, email, code]
  );

  return {
    email,
    code,
    requestResetCode,
    verifyCode,
    updatePassword,
  };
}
