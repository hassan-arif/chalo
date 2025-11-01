import { fetchAPI } from "@/lib/fetch";
import { PaymentProps } from "@/types/type";
import { useStripe } from "@stripe/stripe-react-native";
import React, { useState } from "react";
import { Alert } from "react-native";
import CustomButton from "./CustomButton";

const Payment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [success, setSuccess] = useState(false);

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } = await fetchAPI(
      "/(api)/(stripe)/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName || email?.split("@")?.[0],
          email: email,
          amount: amount || 1,
        }),
      }
    );

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey?.secret,
      paymentIntentClientSecret: paymentIntent?.client_secret,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: fullName || email?.split("@")?.[0],
      },
    });
    if (error) {
    }
  };

  const openPaymentSheet = async () => {
    await initializePaymentSheet();
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      setSuccess(true);
      // ride/create
    }
  };

  return (
    <>
      <CustomButton
        title="Confirm Ride"
        className="my-10"
        onPress={openPaymentSheet}
      />
    </>
  );
};

export default Payment;
