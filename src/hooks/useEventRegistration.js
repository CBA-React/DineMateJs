import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
  selectEventRegistration,
  closeEventConfirmation,
  openRegister,
  closeRegister,
  confirmEventRegistration,
  openFailModal,
  closeFailModal
} from "/src/features/booking/eventSlice";

export const useEventRegistration = () => {
  const dispatch = useDispatch();
  const { confirmationOpen, confirmation, status, error, isOpen, event, failOpen } =
    useSelector(selectEventRegistration);

  const openRegistrationModal = useCallback(
    (eventData) => dispatch(openRegister(eventData)),
    [dispatch]
  );

  const closeRegistrationModal = useCallback(
    () => dispatch(closeRegister()),
    [dispatch]
  );

  const closeConfirmationModal = useCallback(
    () => dispatch(closeEventConfirmation()),
    [dispatch]
  );


  const openConfirmationFailModal = useCallback(
    () => dispatch(openFailModal()),
    [dispatch]
  );

  const closeConfirmationFailModal = useCallback(
    () => dispatch(closeFailModal()),
    [dispatch]
  )

  const confirmRegistration = useCallback(
    (data) => dispatch(confirmEventRegistration(data)),
    [dispatch]
  );

  return {
    isOpen,
    event,
    confirmationOpen,
    confirmation,
    status,
    error,
    failOpen,
    openRegistrationModal,
    closeRegistrationModal,
    closeConfirmationModal,
    confirmRegistration,
    openConfirmationFailModal,
    closeConfirmationFailModal
  };
};
