import React from "react";
import styles from "../styles/PaymentMethod.module.css";
import { useStore } from "../contexts/StoreContext";
import { useNavigate } from "react-router-dom";

const PaymentMethod = () => {
  const { setPaymentMethod, paymentMethod, shippingAddress } = useStore();
  const navigate = useNavigate();

  const [paymentType, setPaymentType] = React.useState(
    paymentMethod || "Stripe"
  );

  React.useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  });

  const submitHandler = (e: any) => {
    e.preventDefault();
    setPaymentMethod(paymentType);
    localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className={styles.container}>
      <img
        className={styles.bg}
        src={require("../resources/images/store-bg.jpg")}
        alt="tea"
      ></img>
      <h2 className={styles.header}>Payment Method</h2>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.field}>
          <input
            type="radio"
            id="Stripe"
            value="Stripe"
            checked={paymentType === "Stripe"}
            onChange={(e) => setPaymentType(e.target.value)}
          ></input>
          <label htmlFor="Stripe">Stripe</label>
        </div>
        <div className={styles.field}>
          <input
            type="radio"
            id="PayPal"
            value="PayPal"
            checked={paymentType === "PayPal"}
            onChange={(e) => setPaymentType(e.target.value)}
          ></input>
          <label htmlFor="Paypal">PayPal</label>
        </div>
        <div className={styles.submit}>
          <button type="submit">Continue</button>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethod;
