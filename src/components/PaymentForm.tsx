import React from "react";
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
  PaymentElement
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()
  
  const [message, setMessage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  
    React.useEffect(() => {
      if (!stripe) {
        return;
      }
  
      const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );
  
      if (!clientSecret) {
        return;
      }
  
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        if (!paymentIntent) return
        switch (paymentIntent.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Something went wrong.");
            break;
        }
      });
    }, [stripe]);
  
    const handleSubmit = async (e: any) => {
      e.preventDefault();
  
      if (!stripe || !elements) {
        return;
      }
  
      setIsLoading(true);
  
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "/",
        },
      });
  
      if (error.type === "card_error" || error.type === "validation_error") {
        if (error.message) {
            setMessage(error.message);
        }
      } else {
        setMessage("An unexpected error occurred.");
      }
  
      setIsLoading(false);
    };
  
    return (
    <div>TESTING
        
          <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <button disabled={isLoading || !stripe || !elements} id="submit">
              <span id="button-text">
                {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
              </span>
            </button>
            {message && <div id="payment-message">{message}</div>}
          </form>
    </div>
    );
  }

// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [message, setMessage] = React.useState<string | null>(null);
//   const [isLoading, setIsLoading] = React.useState<boolean>(false);

//   const handleSubmit = async (stripe: any, elements: any) => {
//     const cardElement = elements.getElement(CardElement);

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: cardElement,
//     });

//     if (error) {
//         console.log(error)
//     } else {
//         console.log(paymentMethod)
//     }
//   };
//   return (
//     <>
//       <h1>stripe form</h1>
//       <CardElement />
//       <button onClick={() => handleSubmit(stripe, elements)}>Buy</button>
//     </>
//   );
// };

// export default PaymentForm;
