"use client";

import { useEffect } from "react";
import { fetchStudioData } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { restoreSession } from "@/redux/slices/authSlice";
import { hydrateStudio, setStudioError, setStudioStatus } from "@/redux/slices/studioSlice";

export default function StudioBootstrap() {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.studio.status);

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  useEffect(() => {
    if (status !== "idle") {
      return;
    }

    let isMounted = true;

    const load = async () => {
      dispatch(setStudioStatus("loading"));

      try {
        const data = await fetchStudioData();

        if (isMounted) {
          dispatch(hydrateStudio(data));
        }
      } catch (error) {
        if (isMounted) {
          dispatch(setStudioError(error.message));
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [dispatch, status]);

  return null;
}
