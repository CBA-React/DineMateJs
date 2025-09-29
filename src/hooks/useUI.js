import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

import {
    openLogOutModal as openLogOutModalAction,
    closeLogOutModal as closeLogOutModalAction,
    closeNotificationsPopUp as closeNotificationsPopUpAction,
    openNotificationsPopUp as openNotificationsPopUpAction
  } from "/src/features/ui/uiSlice";

export const useUI = () => {
    const dispatch = useDispatch();
    const { isLogOutModalOpen, isNotificationsPopUpOpen } = useSelector((state) => state.ui);

    const openLogOut = useCallback(() => {
        dispatch(openLogOutModalAction());
      }, [dispatch]);

      const closeLogOut = useCallback(() => {
        dispatch(closeLogOutModalAction());
      }, [dispatch]);

      const openNotifications = useCallback(() => {
        dispatch(openNotificationsPopUpAction());
      }, [dispatch]);

      const closeNotifications = useCallback(() => {
        dispatch(closeNotificationsPopUpAction());
      }, [dispatch]);

    return {
        isLogOutModalOpen,
        isNotificationsPopUpOpen,

        openLogOut,
        closeLogOut,
        openNotifications,
        closeNotifications
    };
}