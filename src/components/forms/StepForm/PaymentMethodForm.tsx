"use client";

import React, { useState } from "react";
import { Circle, CreditCard, HeartHandshake } from "lucide-react";

import { RootState } from "@/types/redux";
import { actions } from "@/redux/slices/checkoutSlice";
import { useDispatch, useSelector } from "react-redux";
import { FieldValues, useForm } from "react-hook-form";

import StepFormButton from "@/app/(other-pages)/checkout/_components/StepFormButton";

const PaymentMethodForm = () => {
  const dispatch = useDispatch();

  const currentStep = useSelector(
    (state: RootState) => state.checkout.currentStep
  );

  const existingFormData = useSelector(
    (store: RootState) => store.checkout.checkoutFormData
  );

  const initialPaymentMethod = existingFormData.paymentMethod;
  const [paymentMethod, setPaymentMethod] = useState(initialPaymentMethod);

  const { handleSubmit } = useForm();

  const processData = (data: FieldValues) => {
    data.paymentMethod = paymentMethod;
    //Update the checkout Data
    dispatch(actions.updateCheckoutFormData(data));
    //Update the Current step
    dispatch(actions.setCurrentStep(currentStep + 1));
  };

  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl font-semibold mb-2 dark:text-lime-400">
        Payment Method
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {/* Payment Method Cost */}
        <div className="col-span-full">
          <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
            Which Payment Method do you Prefer?
          </h3>
          <ul className="grid w-full gap-6 md:grid-cols-2">
            <li>
              <input
                type="radio"
                id="cashDelivery"
                name="paymentMethod"
                value="Cash Delivery"
                className="hidden peer"
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              />
              <label
                htmlFor="cashDelivery"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                {/* Design */}
                <div className="flex gap-2 items-center">
                  <HeartHandshake className="w-5 h-5 ms-3 flex-shrink-0" />
                  <div>
                    <p>Cash on Delivery</p>
                  </div>
                </div>
                <Circle className="w-5 h-5 ms-3 flex-shrink-0 rtl:rotate-180" />
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="creditCard"
                name="paymentMethod"
                value="Credit Card"
                className="hidden peer"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label
                htmlFor="creditCard"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="flex gap-2 items-center">
                  <CreditCard className="w-5 h-5 ms-3 flex-shrink-0" />
                  <div>
                    <p>Credit Card</p>
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

export default PaymentMethodForm;
