"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { actions } from "@/redux/slices/cartSlice";
import { cartInitialStateProps } from "@/types/redux";

export function CartHydrator() {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("cart") || "[]",
      ) as cartInitialStateProps[];

      if (Array.isArray(stored) && stored.length > 0) {
        dispatch(actions.hydrateCart(stored));
      }
    } catch {
      localStorage.removeItem("cart");
    }
  }, [dispatch]);

  return null;
}
