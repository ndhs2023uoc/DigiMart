import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useUser from "../../../../hooks/useUser";
import { Navigate } from "react-router-dom";

const CheckoutPayment = ({ price, cartItem }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { currentUser, isLoading } = useUser();
  const [clientSecret, setClientSecret] = useState("");
  const [succeeded, setSucceeded] = useState("");
  const [message, setMessage] = useState("");
  const [cart, setCart] = useState([]);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);

  if (price < 0 || !price) {
    return <Navigate to="/dashboard/my-selected" replace />;
  }

  useEffect(() => {
    if (currentUser?.email) {
      axiosSecure
        .get(`/cart/${currentUser.email}`)
        .then((res) => {
          const classId = res.data.map((item) => item._id);
          setCart(classId);
        })
        .catch((error) => console.log(error));
    }
  }, [currentUser]);

  useEffect(() => {
    if (price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [price]);

  const handleCardChange = (event) => {
    setCardComplete(event.complete);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setProcessing(true);
    setMessage("");

    const card = elements.getElement(CardElement);
    if (card === null) {
      setProcessing(false);
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        throw error;
      }

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: currentUser?.name || "unknown",
              email: currentUser?.email || "Anonymous",
            },
          },
        });

      if (confirmError) {
        throw confirmError;
      }

      if (paymentIntent.status === "succeeded") {
        const data = {
          transactionId: paymentIntent.id,
          paymentMethod: paymentIntent.payment_method,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency,
          paymentStatus: paymentIntent.status,
          userName: currentUser?.name,
          userEmail: currentUser?.email,
          classesId: cartItem ? [cartItem] : cart,
          date: new Date(),
        };

        const response = await axiosSecure.post("/payment-info", data);

        if (response.data.paymentResult.insertedId) {
          setSucceeded("Payment Successful, You have access now");
          setMessage("Payment Successful, You have access now");
        } else {
          throw new Error("Payment failed");
        }
      }
    } catch (err) {
      console.error(err);
      setMessage(err.message || "An error occurred. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Payment Amount: <span className="text-secondary">${price}</span>
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-md">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
            onChange={handleCardChange}
          />
        </div>
        <button
          type="submit"
          disabled={!stripe || !clientSecret || !cardComplete || processing}
          className="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300 disabled:opacity-50"
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>
      </form>
      {message && (
        <p
          className={`mt-4 text-center ${
            message.includes("Successful") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default CheckoutPayment;
