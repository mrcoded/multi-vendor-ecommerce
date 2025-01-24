"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Circle, Truck } from "lucide-react";

import { RootState } from "@/redux/types";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/redux/slices/checkoutSlice";

import TextInput from "@/components/inputs/TextInput";
import StepFormButton from "@/app/checkout/_components/StepFormButton";

const ShippingDetailsForm = () => {
  const dispatch = useDispatch();

  const currentStep = useSelector(
    (state: RootState) => state.checkout.currentStep
  );

  const existingFormData = useSelector(
    (store: RootState) => store.checkout.checkoutFormData
  );

  const initialShippingCost = existingFormData.shippingCost || "";
  const [shippingCost, setShippingCost] = useState(initialShippingCost);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const processData = (data: FieldValues) => {
    data.shippingCost = shippingCost;
    //Update the checkout Data
    dispatch(actions.updateCheckoutFormData(data));
    //Update the Current step
    dispatch(actions.setCurrentStep(currentStep + 1));
  };

  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl font-semibold mb-2 dark:text-lime-400">
        Shipping Details
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Street Address"
          name="streetAddress"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={existingFormData.streetAddress}
        />

        <TextInput
          label="City"
          name="city"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={existingFormData.city}
        />

        <TextInput
          label="Country"
          name="country"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={existingFormData.country}
        />

        <TextInput
          label="District"
          name="district"
          register={register}
          errors={errors}
          className="w-full"
          defaultValue={existingFormData.district}
        />

        {/* Shipping Cost */}
        <div className="col-span-full">
          <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
            Shippng Cost?
          </h3>
          <ul className="grid w-full gap-6 md:grid-cols-2">
            <li>
              <input
                type="radio"
                id="cheap"
                name="shippingCost"
                value="6"
                className="sr-only peer"
                onChange={(e) => setShippingCost(e.target.value)}
                required
              />
              <label
                htmlFor="cheap"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                {/* Design */}
                <div className="flex gap-2 items-center">
                  <Truck className="w-5 h-5 ms-3 flex-shrink-0" />
                  <div>
                    <p>UPS</p>
                    <p>Delivery Cost: $6</p>
                  </div>
                </div>
                <Circle className="w-5 h-5 ms-3 flex-shrink-0 rtl:rotate-180" />
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="expensive"
                name="shippingCost"
                value="36"
                className="sr-only peer"
                onChange={(e) => setShippingCost(e.target.value)}
              />
              <label
                htmlFor="expensive"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="flex gap-2 items-center">
                  <Truck className="w-5 h-5 ms-3 flex-shrink-0" />
                  <div>
                    <p>UPS</p>
                    <p>Delivery Cost: $36</p>
                  </div>
                </div>
                <Circle className="w-5 h-5 ms-3 flex-shrink-0 rtl:rotate-180" />
              </label>
            </li>
          </ul>
        </div>
      </div>
      <StepFormButton />
    </form>
  );
};

export default ShippingDetailsForm;
