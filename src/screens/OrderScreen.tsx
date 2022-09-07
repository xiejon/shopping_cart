import axios from "axios";
import React from "react";
import styles from "../styles/OrderScreen.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../contexts/StoreContext";

type Order = {
  [key: string]: any;
  _id?: string;
};

const OrderScreen = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [order, setOrder] = React.useState<Order>({});

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

  const { userInfo, shippingAddress, paymentMethod, storeItems } = useStore();
  const navigate = useNavigate();
  const params = useParams();
  const { id: orderId } = params;

  React.useEffect(() => {
    const fetchOrder = async () => {
      try {
        fetchRequest();
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: {
            authorization: `Bearer: ${userInfo.token}`,
          },
        });
        console.log(data);
        fetchSuccess(data);
      } catch (err) {
        fetchFail(err);
      }

      console.log(order);
    };
    if (!userInfo) {
      navigate("/signin");
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, userInfo, orderId, navigate]);

  const findOrderItem = (_id: string) => {
    const item = storeItems.find((item) => item._id === _id);
    return item;
  };

  const roundNum = (num: number) =>
    Math.round(num * 100 + Number.EPSILON) / 100;

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>Sorry, an error occurred.</div>
  ) : (
    <div className={styles.container}>
      <img
        className={styles.bg}
        src={require("../resources/images/store-bg.jpg")}
        alt="tea"
      ></img>
      <h1 className={styles.header}>Order</h1>
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
            <span>
              {order.isDelivered
                ? `Delivered at ${order.deliveredAt}`
                : "On the way"}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.paymentContainer}>
        <h2 className={styles.paymentHeader}>Payment</h2>
        <div className={styles.paymentInfo}>
          <div className={styles.field}>
            <span>Payment Method: {paymentMethod.replace(/\W/g, "")}</span>
            <span>{order.isPaid ? `Paid at ${order.paidAt}` : "Not Paid"}</span>
          </div>
        </div>
      </div>
      <div className={styles.orderContainer}>
        <div className={styles.orderInfoContainer}>
          <h2 className={styles.orderHeader}>Order Summary</h2>
          <div className={styles.orderInfo}>
            <div className={styles.field}>
              {order.orderItems
                ? order.orderItems.map((orderItem: any) => {
                    const item = findOrderItem(orderItem._id);
                    if (item)
                      return (
                        <div className={styles.orderItem}>
                          <div
                            key={orderItem._id}
                          >{`${item.name} x ${orderItem.quantity}`}</div>
                          <div>{`$${orderItem.quantity * item.price}`}</div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
