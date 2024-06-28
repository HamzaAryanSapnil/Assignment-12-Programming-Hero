import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router-dom";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const Payment = () => {
    const location = useLocation();
    const bookingInfo = location?.state;
    console.log("Booking Info",bookingInfo);
  return (
    <div className="w-full h-screen container mx-auto flex justify-center items-center" >
          <Elements stripe={stripePromise}>
              <CheckoutForm bookingInfo={bookingInfo} />
              </Elements>
    </div>
  );
};

export default Payment;
