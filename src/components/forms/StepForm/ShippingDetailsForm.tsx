"use client";

import React, { useEffect, useRef, useState } from "react";
import { Circle, Truck } from "lucide-react";

import { RootState } from "@/types/redux";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/redux/slices/checkoutSlice";

import { CheckoutProps } from "@/types/order";

import TextInput from "@/components/inputs/TextInput";
import StepFormButton from "@/app/(other-pages)/checkout/_components/StepFormButton";

const shippingOptionClass =
  "inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-border bg-card p-3.5 text-sm text-muted-foreground transition-colors hover:bg-muted peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-foreground";

const ShippingDetailsForm = ({ order }: { order: CheckoutProps | null }) => {
  const dispatch = useDispatch();
  const prefilled = useRef(false);

  const currentStep = useSelector(
    (state: RootState) => state.checkout.currentStep,
  );

  const existingFormData = useSelector(
    (store: RootState) => store.checkout.checkoutFormData,
  );

  const initialShippingCost = existingFormData.shippingCost || "";
  const [shippingCost, setShippingCost] = useState(initialShippingCost);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      streetAddress: existingFormData.streetAddress || "",
      city: existingFormData.city || "",
      country: existingFormData.country || "",
      district: existingFormData.district || "",
    },
  });

  useEffect(() => {
    if (!order || prefilled.current) return;
    prefilled.current = true;

    reset({
      streetAddress:
        existingFormData.streetAddress || order.streetAddress || "",
      city: existingFormData.city || order.city || "",
      country: existingFormData.country || order.country || "",
      district: existingFormData.district || order.district || "",
    });
  }, [order, reset, existingFormData]);

  const processData = (data: FieldValues) => {
    data.shippingCost = shippingCost;
    dispatch(actions.updateCheckoutFormData(data));
    dispatch(actions.setCurrentStep(currentStep + 1));
  };

  return (
    <form onSubmit={handleSubmit(processData)}>
      <div className="border-b border-border px-4 py-5 sm:px-6 sm:py-6">
        <h2 className="text-lg font-semibold text-foreground sm:text-xl">
          Shipping Details
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Where should we deliver your order?
        </p>
      </div>

      <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Street Address"
            name="streetAddress"
            register={register}
            errors={errors}
            className="w-full sm:col-span-2"
          />

          <TextInput
            label="City"
            name="city"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Country"
            name="country"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="District"
            name="district"
            register={register}
            errors={errors}
            className="w-full sm:col-span-2"
          />

          <div className="sm:col-span-2">
            <h3 className="mb-1 text-sm font-medium text-foreground">
              Delivery method
            </h3>
            <p className="mb-3 text-xs text-muted-foreground">
              Choose your preferred shipping option.
            </p>
            <ul className="grid w-full gap-3 sm:grid-cols-2">
              <li>
                <input
                  type="radio"
                  id="cheap"
                  name="shippingCost"
                  value="6"
                  className="peer sr-only"
                  onChange={(e) => setShippingCost(e.target.value)}
                  defaultChecked={shippingCost === "6"}
                  required
                />
                <label htmlFor="cheap" className={shippingOptionClass}>
                  <div className="flex items-center gap-3">
                    <Truck className="size-4 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">UPS Standard</p>
                      <p className="text-xs">Delivery in 5–7 days · $6.00</p>
                    </div>
                  </div>
                  <Circle className="size-4 shrink-0 peer-checked:hidden" />
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="expensive"
                  name="shippingCost"
                  value="36"
                  className="peer sr-only"
                  onChange={(e) => setShippingCost(e.target.value)}
                  defaultChecked={shippingCost === "36"}
                />
                <label htmlFor="expensive" className={shippingOptionClass}>
                  <div className="flex items-center gap-3">
                    <Truck className="size-4 shrink-0 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">UPS Express</p>
                      <p className="text-xs">Delivery in 1–2 days · $36.00</p>
                    </div>
                  </div>
                  <Circle className="size-4 shrink-0 peer-checked:hidden" />
                </label>
              </li>
            </ul>
          </div>
        </div>

        <StepFormButton />
      </div>
    </form>
  );
};

export default ShippingDetailsForm;
