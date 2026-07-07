"use client";

import React, { useState } from "react";
import { Circle, CreditCard, HeartHandshake } from "lucide-react";

import { RootState } from "@/types/redux";
import { actions } from "@/redux/slices/checkoutSlice";
import { useDispatch, useSelector } from "react-redux";
import { FieldValues, useForm } from "react-hook-form";

import StepFormButton from "@/app/(other-pages)/checkout/_components/StepFormButton";

const paymentOptionClass =
  "inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-border bg-card p-3.5 text-sm text-muted-foreground transition-colors hover:bg-muted peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-foreground";

const PaymentMethodForm = () => {
  const dispatch = useDispatch();

  const currentStep = useSelector(
    (state: RootState) => state.checkout.currentStep,
  );

  const existingFormData = useSelector(
    (store: RootState) => store.checkout.checkoutFormData,
  );

  const initialPaymentMethod = existingFormData.paymentMethod;
  const [paymentMethod, setPaymentMethod] = useState(initialPaymentMethod);

  const { handleSubmit } = useForm();

  const processData = (data: FieldValues) => {
    data.paymentMethod = paymentMethod;
    dispatch(actions.updateCheckoutFormData(data));
    dispatch(actions.setCurrentStep(currentStep + 1));
  };

  return (
    <form onSubmit={handleSubmit(processData)}>
      <div className="border-b border-border px-4 py-5 sm:px-6 sm:py-6">
        <h2 className="text-lg font-semibold text-foreground sm:text-xl">
          Payment Method
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Select how you&apos;d like to pay for your order.
        </p>
      </div>

      <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
        <div>
          <h3 className="mb-1 text-sm font-medium text-foreground">
            Payment options
          </h3>
          <p className="mb-3 text-xs text-muted-foreground">
            All transactions are secure and encrypted.
          </p>
          <ul className="grid w-full gap-3 sm:grid-cols-2">
            <li>
              <input
                type="radio"
                id="cashDelivery"
                name="paymentMethod"
                value="Cash Delivery"
                className="peer sr-only"
                onChange={(e) => setPaymentMethod(e.target.value)}
                defaultChecked={paymentMethod === "Cash Delivery"}
                required
              />
              <label htmlFor="cashDelivery" className={paymentOptionClass}>
                <div className="flex items-center gap-3">
                  <HeartHandshake className="size-4 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Cash on Delivery</p>
                    <p className="text-xs">Pay when your order arrives</p>
                  </div>
                </div>
                <Circle className="size-4 shrink-0 peer-checked:hidden" />
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="creditCard"
                name="paymentMethod"
                value="Credit Card"
                className="peer sr-only"
                onChange={(e) => setPaymentMethod(e.target.value)}
                defaultChecked={paymentMethod === "Credit Card"}
              />
              <label htmlFor="creditCard" className={paymentOptionClass}>
                <div className="flex items-center gap-3">
                  <CreditCard className="size-4 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Credit Card</p>
                    <p className="text-xs">Visa, Mastercard, Amex</p>
                  </div>
                </div>
                <Circle className="size-4 shrink-0 peer-checked:hidden" />
              </label>
            </li>
          </ul>
        </div>

        <StepFormButton />
      </div>
    </form>
  );
};

export default PaymentMethodForm;
