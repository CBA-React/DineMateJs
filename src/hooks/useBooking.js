import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { selectBooking, openBook, closeBook, confirmBooking, closeConfirmation, closeFailModal, openFailModal } from "/src/features/booking/bookingSlice";

export const useBooking = () => {
  const dispatch = useDispatch();
  const { isOpen, restaurant, status, error, confirmationOpen, confirmation, failOpen } = useSelector(selectBooking);

  const openBookingModal = useCallback((restaurantData) => {
    dispatch(openBook(restaurantData));
  }, [dispatch]);

  const closeBookingModal = useCallback(() => {
    dispatch(closeBook());
  }, [dispatch]);

  const closeConfirmationModal = useCallback(() => {
    dispatch(closeConfirmation());
  }, [dispatch]);

  const openBookingFailModal = useCallback(() => {
    dispatch(openFailModal());
  }, [dispatch])

  const closeBookingFailModal = useCallback(() => {
    dispatch(closeFailModal());
  }, [dispatch]);

  const confirmBookingAction = useCallback((bookingData) => {
    dispatch(confirmBooking({
      ...bookingData,
      restaurantId: restaurant?.id,
      restaurantName: restaurant?.name,
    }));
  }, [dispatch, restaurant]);

  return {
    isOpen,
    restaurant,
    status,
    error,

    confirmationOpen,
    confirmation,

    failOpen,

    openBookingModal,
    closeBookingModal,
    confirmBookingAction,
    closeConfirmationModal,
    openBookingFailModal,
    closeBookingFailModal
  };
};
