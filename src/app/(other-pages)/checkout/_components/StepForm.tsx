"use client";

import React from "react";
import { User } from "next-auth";

import { useSelector } from "react-redux";
import { RootState } from "@/types/redux";
import { CheckoutProps } from "@/types/order";

import { useUserDetail } from "@/hooks/useUsers";

import OrderSummary from "./OrderSummary";
import EmptyCart from "../../cart/_components/EmptyCart";
import PaymentMethodForm from "@/components/forms/StepForm/PaymentMethodForm";
import PersonalDetailsForm from "@/components/forms/StepForm/PersonalDetailsForm";
import ShippingDetailsForm from "@/components/forms/StepForm/ShippingDetailsForm";

const StepForm = ({ user }: { user: User | undefined }) => {
  const { data: userData } = useUserDetail(user?.id);
  const userProfile = userData?.profile;

  const cartItems = useSelector((store: RootState) => store.cart);
  const currentStep = useSelector(
    (state: RootState) => state.checkout.currentStep,
  );

  const checkoutData: CheckoutProps | null = userProfile
    ? {
        userId: userData!.id,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        emailAddress: userProfile.email,
        phone: userProfile.phone ?? "",
        streetAddress: userProfile.streetAddress ?? "",
        city: userProfile.city ?? "",
        country: userProfile.country ?? "",
        district: userProfile.district ?? "",
        shippingCost: "",
        paymentMethod: "",
        paymentToken: "",
      }
    : null;

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="p-4 sm:p-6">
        <EmptyCart />
      </div>
    );
  }

  const renderFormByStep = (step: number) => {
    if (step === 1)
      return <PersonalDetailsForm order={checkoutData} user={user} />;
    if (step === 2) return <ShippingDetailsForm order={checkoutData} />;
    if (step === 3) return <PaymentMethodForm />;
    if (step === 4)
      return <OrderSummary userId={userData?.id ?? user?.id ?? ""} />;
  };

  return (
    <div key={currentStep} className="animate-fade-in">
      {renderFormByStep(currentStep)}
    </div>
  );
};

export default StepForm;
