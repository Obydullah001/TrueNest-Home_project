import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/AxiosHooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/UseAuth/useAuth";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#22223b",
      fontSize: "18px",
      fontFamily: "'Inter', system-ui, sans-serif",
      fontSmoothing: "antialiased",
      "::placeholder": { color: "#a0aec0" },
      padding: "12px 0",
    },
    invalid: { color: "#e53e3e", iconColor: "#e53e3e" },
  },
};

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { parcelId } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  

  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [paid, setPaid] = useState(false);

  const { data: offer, isLoading: offerLoading ,  refetch} = useQuery({
    queryKey: ["offer", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers/payment/${parcelId}`);
      return res.data;
    },
    enabled: !!parcelId,
  });

  const { data: clientSecretData, isLoading: secretLoading } = useQuery({
    queryKey: ["payment-intent", offer?.offerAmount],
    queryFn: async () => {
      const res = await axiosSecure.post("/create-payment-intent", {
        amount: offer.offerAmount,
      });
      return res.data;
    },
    enabled: !!offer?.offerAmount,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!stripe || !elements || !clientSecretData?.clientSecret) return;

    setProcessing(true);

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecretData.clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "",
            email: user?.email || "",
          },
        },
      }
    );

    if (error) {
      setErrorMsg(error.message);
      setProcessing(false);
    } else if (paymentIntent.status === "succeeded") {
      const res = await axiosSecure.patch(`/offers/payment/${parcelId}`, {
        transactionId: paymentIntent.id,
      });

      if (res.data?.success) {
        setPaid(true);
        await refetch();
        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: "Your payment was processed successfully.",
          confirmButtonColor: "#3085d6",
        });
      } else {
        setErrorMsg("Payment succeeded, but database update failed.");
      }
      setProcessing(false);
    }
  };

  if (offerLoading || secretLoading) {
    return <p className="text-center">Loading payment info...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-primary mb-2">
          Pay for <span className="text-secondary">{offer?.propertyTitle}</span>
        </h2>
        <p className="text-center text-gray-500 mb-4">
          Amount: ${offer?.offerAmount}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>

          {errorMsg && (
            <div className="text-red-500 text-sm text-center">{errorMsg}</div>
          )}

          <button
            type="submit"
            disabled={!stripe || processing || offer.status === "bought"}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-200
    ${
      processing || offer.status === "bought"
        ? "bg-green-300 cursor-not-allowed"
        : "bg-gradient-to-r from-primary to-red-800 hover:from-red-600 hover:to-primary text-white shadow-lg"
    }`}
          >
            {processing ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Processing...
              </span>
            ) : offer.status ===  "bought" ? (
              "Paid"
            ) : (
              "Pay For Property"
            )}
          </button>
        </form>

        <div className="mt-6 text-xs text-gray-400 text-center">
          <span>Test Card: 4242 4242 4242 4242, any future date, any CVC</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
