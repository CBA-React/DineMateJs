import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { selectBooking, openBook, closeBook, confirmBooking, closeConfirmation } from "/src/features/booking/bookingSlice";

export const useBooking = () => {
  const dispatch = useDispatch();
  const { isOpen, restaurant, status, error, confirmationOpen, confirmation } = useSelector(selectBooking);

  const openBookingModal = useCallback((restaurantData) => {
    dispatch(openBook(restaurantData));
  }, [dispatch]);

  const closeBookingModal = useCallback(() => {
    dispatch(closeBook());
  }, [dispatch]);

  const closeConfirmationModal = useCallback(() => {
    dispatch(closeConfirmation());
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

    openBookingModal,
    closeBookingModal,
    confirmBookingAction,
    closeConfirmationModal,
  };
};
