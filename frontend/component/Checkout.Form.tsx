import { useLoadUserQuery } from "@/redux/features/api/api.slice";
import { useCreateOrderMutation } from "@/redux/features/slice/order";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  data: any;
};

const CheckoutForm: React.FC<Props> = ({ data }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [loadUser, setLoadUser] = useState<any>(null);
  const { data: userData, isLoading: userLoading } = useLoadUserQuery({
    skip: loadUser ? false : true,
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setIsLoading(false);
      setMessage(error?.message);
    } else if (paymentIntent && paymentIntent.status == "succeeded") {
      createOrder({ courseId: data._id, payment_info: paymentIntent });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (orderData) {
      setLoadUser(true);
      redirect(`/access-course/${data._id}`);
    }
    if (error) {
      if ("data" in error) {
        const errMeg = error as any;
        toast.error(errMeg.data.message);
      }
    }
  }, [orderData, error]);
  return (
    <div>
      <form id="payment-form" onSubmit={(e) => handleSubmit(e)}>
        <LinkAuthenticationElement
          id="link-authentication-element"
          // Access the email value like so:
          // onChange={(event) => {
          //  setEmail(event.value.email);
          // }}
          //
          // Prefill the email field like so:
          // options={{defaultValues: {email: 'foo@bar.com'}}}
        />
        <PaymentElement id="payment-element" />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
};

export default CheckoutForm;
