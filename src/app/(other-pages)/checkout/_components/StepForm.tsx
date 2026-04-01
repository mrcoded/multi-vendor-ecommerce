"use client";

import React, { useEffect, useState } from "react";
import { User } from "next-auth";

import { useSelector } from "react-redux";
import { RootState } from "@/types/redux";
import { CheckoutProps } from "@/types/order";

import { useUserDetail } from "@/hooks/useUsers";

import Loading from "@/app/loading";
import OrderSummary from "./OrderSummary";
import EmptyCart from "../../cart/_components/EmptyCart";
import PaymentMethodForm from "@/components/forms/StepForm/PaymentMethodForm";
import PersonalDetailsForm from "@/components/forms/StepForm/PersonalDetailsForm";
import ShippingDetailsForm from "@/components/forms/StepForm/ShippingDetailsForm";

const StepForm = ({ user }: { user: User | undefined }) => {
  // Add a mounted state to prevent hydration issues
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch the user's existing profile/data
  const currentUser = useUserDetail(user?.id);
  const userData = currentUser?.data ?? null;

  const userProfile = userData?.profile;

  //Get cart items
  const cartItems = useSelector((store: RootState) => store.cart);

  const currentStep = useSelector(
    (state: RootState) => state.checkout.currentStep,
  );

  //if cart is empty
  if (mounted && (!cartItems || cartItems.length === 0)) {
    return <EmptyCart />;
  }

  // If we have a user but no profile data, we can show a loading state or an error
  if (!userData || !mounted) return <Loading />;

  console.log(cartItems);
  const initialCheckoutData: CheckoutProps | null = userProfile
    ? {
        userId: userData.id,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        emailAddress: userProfile.email,
        phone: userProfile.phone ?? "",
        streetAddress: userProfile.streetAddress ?? "",
        city: userProfile.city ?? "",
        country: userProfile.country ?? "",
        district: userProfile.district ?? "",
        shippingCost: "", // Set a default value for shippingCost if not available
        paymentMethod: "", // Set a default value for paymentMethod if not available
        paymentToken: "", // Set a default value for paymentToken if not available
      }
    : null;

  const renderFormByStep = (step: number) => {
    if (step === 1)
      return <PersonalDetailsForm order={initialCheckoutData} user={user} />;
    if (step === 2) return <ShippingDetailsForm order={initialCheckoutData} />;
    if (step === 3) return <PaymentMethodForm />;
    if (step === 4) return <OrderSummary userId={userData.id} />;
  };

  return <div>{renderFormByStep(currentStep)}</div>;
};

export default StepForm;
