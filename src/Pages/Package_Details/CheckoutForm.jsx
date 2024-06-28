import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ bookingInfo }) => {
  const navigate = useNavigate();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transectionId, setTransectionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const axiosSecure = useAxiosSecure();
  const price = bookingInfo?.price;

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        console.log(res?.data?.clientSecret);
        setClientSecret(res?.data?.clientSecret);
      });
    }
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
      setCardError(error.message);
    } else {
      console.log("paymentMethod: ", paymentMethod);

      setCardError("");
    }

    //   confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: bookingInfo?.email || "unknown",
            name: bookingInfo?.name || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.error(confirmError);
      setCardError(confirmError.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: confirmError.message,
      });
      return;
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransectionId(paymentIntent.id);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Payment successful. Transaction ID: ${paymentIntent.id}`,
        });
        // now save the payment info to the database
        const payment = {
          email: bookingInfo?.email,
          transactionId: paymentIntent?.id,
          price,
          date: new Date(),
          title: bookingInfo?.title,
          image: bookingInfo?.image,
          name: bookingInfo?.name,
          tourType: bookingInfo?.tourType,
          tourGuideName: bookingInfo?.tourGuide?.displayName,
          tourGuideEmail: bookingInfo?.tourGuide?.email,
          tourGuideId: bookingInfo?.tourGuide?._id,

          status: "pending",
        };
        console.log(payment);
        axiosSecure.post("/payments", payment).then((res) => {
          console.log(res?.data);
          if (res?.data?.insertedId) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Payment Successful and Booking Confirmed",
            });

            navigate("/dashboard/my_bookings");
          }
        });
      }
    }
  };
  return (
    <div className="card bg-base-100 w-full  shrink-0 shadow-2xl">
      <form
        onSubmit={handleSubmit}
        className="card-body"
      >
        <div className="form-control h-24 ">
          <CardElement
            options={{
              style: {
                base: {
                  fontWeight: "500",

                  fontSize: "16px",
                  color: "#004000",
                  "::placeholder": {
                    color: "#0ab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        <div className="form-control">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay
          </button>
        </div>
      </form>
      <p className="text-red-500">{cardError}</p>
      {transectionId && (
        <p className="text-green-500">Your Transection Id: {transectionId}</p>
      )}
    </div>
  );
};

CheckoutForm.propTypes = {
  bookingInfo: PropTypes.object,
};
export default CheckoutForm;
