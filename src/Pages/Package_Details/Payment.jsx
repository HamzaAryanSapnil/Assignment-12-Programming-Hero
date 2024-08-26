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
    <div className="w-full h-screen container mx-auto flex flex-col justify-center items-center">
      <div className="my-10 text-center">
        <h1 className="text-3xl font-poppins text-accent my-4">
          Welcome to payment.
        </h1>
        <p className="text-xl font-fira-sans text-dark-03">
          Please don&apos;t provide your actuall card number. If you do it will
          not work though. Use this test card number. But Provide any valid date.
        </p>
        <p className="text-5xl font-mono my-3" > 4242 4242 4242 4242</p>
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm bookingInfo={bookingInfo} />
      </Elements>
    </div>
  );
};

export default Payment;
