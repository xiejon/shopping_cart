import axios from "axios";
import React from "react";
import styles from "../styles/OrderScreen.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../contexts/StoreContext";
import { roundNum } from "../utils";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../components/PaymentForm";

type Order = {
  [key: string]: any;
  _id?: string;
};

const stripePromise = loadStripe(
  "pk_live_51Hg7IbBKin9EvEk4k76mWX2anlkvbGnRBGB03pCi4WERzFKF5ILkAdeQBnKhZdCr0hyiDpibLLjQGXdNgrT5a3B400ghsnOzC2"
);

const loadPaypalScript = async (token: string, paypalDispatch: any) => {
  const { data: clientId } = await axios.get(`/api/keys/paypal`, {
    headers: {
      authorization: `Bearer: ${token}`,
    },
  });
  paypalDispatch({
    type: "resetOptions",
    value: {
      "client-id": clientId,
      currency: "USD",
    },
  });
};

const OrderScreen = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [order, setOrder] = React.useState<Order>({});
  const [loadingPay, setLoadingPay] = React.useState(false);
  const [successPay, setSuccessPay] = React.useState(false);
  const [clientSecret, setClientSecret] = React.useState("");

  const fetchRequest = () => {
    setLoading(true);
    setError("");
  };
  const fetchSuccess = (payload: any) => {
    setLoading(false);
    setOrder(payload);
    setError("");
  };
  const fetchFail = (payload: any) => {
    setLoading(false);
    setError(payload);
  };
  const payRequest = () => {
    setLoadingPay(true);
  };
  const paySuccess = () => {
    setLoadingPay(false);
    setSuccessPay(true);
  };
  const payFail = () => {
    setLoadingPay(false);
  };
  const payReset = () => {
    setLoadingPay(false);
    setSuccessPay(false);
  };

  const { userInfo, shippingAddress, paymentMethod, storeItems } = useStore();
  const navigate = useNavigate();
  const params = useParams();
  const { id: orderId } = params;

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  function createOrder(data: any, actions: any) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID: any) => {
        return orderID;
      });
  }

  function onApprove(data: any, actions: any) {
    return actions.order.capture().then(async function (details: any) {
      try {
        payRequest();
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        paySuccess();
        toast.success("Order is paid");
      } catch (err) {
        payFail();
        toast.error(getError(err));
      }
    });
  }

  function onError(err: any) {
    toast.error(getError(err));
  }

  // fetch order and prepare payment method
  React.useEffect(() => {
    const fetchOrder = async () => {
      if (!userInfo) {
        navigate("/signin");
      }

      try {
        fetchRequest();
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: {
            authorization: `Bearer: ${userInfo.token}`,
          },
        });
        fetchSuccess(data);
      } catch (err) {
        fetchFail(err);
      }
    };

    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder();
      if (successPay) payReset();
    } else {
      if (paymentMethod === "PayPal") {
        loadPaypalScript(userInfo.token, paypalDispatch);
      } else {
        // Stripe
        const createPaymentIntent = async () => {
          const { data: clientSecret } = await axios.post(
            "/create-payment-intent",
            {
              totalPrice: order.totalPrice,
            }
          );
          setClientSecret(clientSecret);
        };
        createPaymentIntent();
      }
    }
  }, [
    order,
    userInfo,
    orderId,
    navigate,
    paypalDispatch,
    successPay,
    paymentMethod,
  ]);

  const appearance = {
    theme: "stripe",
  };
  const options: any = {
    clientSecret,
    appearance,
  };

  const findOrderItem = (_id: string) => {
    const item = storeItems.find((item) => item._id === _id);
    return item;
  };

  return loading ? (
    <div className={styles.loadingText}>Loading...</div>
  ) : error ? (
    <div className={styles.loadingText}>Sorry, an error occurred.</div>
  ) : (
    <div className={styles.container}>
      <img
        className={styles.bg}
        src={require("../resources/images/store-bg.jpg")}
        alt="tea"
      ></img>
      <h1 className={styles.header}>THANK YOU</h1>
      <div>{`Order ID: ${orderId}`}</div>
      <div className={styles.main}>
        <div className={styles.paymentAndShippingInfo}>
          <div className={styles.shippingContainer}>
            <h2 className={styles.shippingHeader}>Shipping:</h2>
            <div className={styles.shippingInfo}>
              <div className={styles.field}>
                <span>{`${shippingAddress.firstName} ${shippingAddress.lastName}`}</span>
              </div>
              <div className={styles.field}>
                <span>{shippingAddress.street}</span>
              </div>
              <div className={styles.field}>
                <span>{`${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zipCode}`}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.delivered}>
                  {order.isDelivered
                    ? `Delivered at ${order.deliveredAt}`
                    : "On the way"}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.paymentContainer}>
            <h2 className={styles.paymentHeader}>Payment:</h2>
            <div className={styles.paymentInfo}>
              <div className={styles.field}>
                <span>{paymentMethod.replace(/\W/g, "")}</span>
              </div>
              <div className={styles.field}>
                <span className={styles.paid}>
                  {order.isPaid ? `Paid at ${order.paidAt}` : "Not Paid"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.orderContainer}>
          <h2 className={styles.orderHeader}>Order Summary</h2>
          <div className={styles.orderInfoContainer}>
            <div className={styles.orderInfo}>
              <div className={styles.orderItems}>
                {order.orderItems
                  ? order.orderItems.map((orderItem: any) => {
                      const item = findOrderItem(orderItem._id);
                      if (item)
                        return (
                          <div className={styles.orderItem}>
                            <span
                              key={orderItem._id}
                            >{`${item.name} x ${orderItem.quantity}`}</span>
                            <span>{`$${orderItem.quantity * item.price}`}</span>
                          </div>
                        );
                    })
                  : ""}
              </div>
              <div className={styles.shipping}>
                {`Shipping: ${
                  order.shippingCost ? "$" + roundNum(order.shippingCost) : ""
                }`}
              </div>
              <div className={styles.tax}>{`Tax: $${
                order.taxCost ? roundNum(order.taxCost) : ""
              }`}</div>
              <div className={styles.field}>
                {order.orderItems ? (
                  <div className={styles.totalPrice}>
                    <span>Total: $</span>
                    {roundNum(order.totalPrice)}
                  </div>
                ) : null}
              </div>
              {!order.isPaid && paymentMethod === "PayPal" ? (
                <div className={styles.buttons}>
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  ></PayPalButtons>
                </div>
              ) : (
                clientSecret && (
                  <div className={styles.stripe}>
                    <Elements options={options} stripe={stripePromise}>
                      <PaymentForm />
                    </Elements>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
