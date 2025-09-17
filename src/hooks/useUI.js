import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

import {
    openLogOutModal as openLogOutModalAction,
    closeLogOutModal as closeLogOutModalAction,
  } from "/src/features/ui/uiSlice";

export const useUI = () => {
    const dispatch = useDispatch();
    const { isLogOutModalOpen } = useSelector((state) => state.ui);

    const openLogOut = useCallback(() => {
        dispatch(openLogOutModalAction());
      }, [dispatch]);

      const closeLogOut = useCallback(() => {
        dispatch(closeLogOutModalAction());
      }, [dispatch]);

    return {
        isLogOutModalOpen,
        openLogOut,
        closeLogOut,
    };
}