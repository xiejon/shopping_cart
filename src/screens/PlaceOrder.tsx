import React from "react";
import styles from "../styles/PlaceOrder.module.css";
import { useStore } from "../contexts/StoreContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import CartItem from "../components/CartItem";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInURL = new URLSearchParams(search).get("redirect");
  const redirect = redirectInURL ? redirectInURL : "/";
  const {
    shippingAddress,
    userInfo,
    paymentMethod,
    cartItems,
    storeItems,
    getTax,
    getTotalPrice,
  } = useStore();

  const submitHandler = (e: any) => {
    e.preventDefault();
    navigate("/success")
  };

  const findOrderItem = (_id: string) => {
    const item = storeItems.find((item) => item._id === _id);
    return item;
  };

  // Sample tax value
  let tax = 0.08;
  let taxCost = getTax(tax, getTotalPrice());

  return (
    <div className={styles.container}>
      <img
        className={styles.bg}
        src={require("../resources/images/store-bg.jpg")}
        alt="tea"
      ></img>
      <h1 className={styles.header}>Preview Order</h1>
      <div className={styles.main}>
        <div className={styles.infoContainer}>
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
            </div>
            <Link
              to={`/shipping?redirect=${redirect}`}
              className={styles.editShipping}
            >
              Edit
            </Link>
          </div>
          <div className={styles.contactContainer}>
            <h2 className={styles.contactHeader}>Contact email:</h2>
            <div className={styles.contactInfo}>
              <div className={styles.field}>
                <span>{userInfo.email}</span>
              </div>
            </div>
          </div>
          <div className={styles.paymentContainer}>
            <h2 className={styles.paymentHeader}>Payment Type:</h2>
            <div className={styles.paymentInfo}>
              <div className={styles.field}>
                <span>{paymentMethod.replace(/["']/g, "")}</span>
              </div>
              <Link
                to={`/payment?redirect=${redirect}`}
                className={styles.editPayment}
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.orderContainer}>
          <div className={styles.orderInfoContainer}>
            <h2 className={styles.orderHeader}>Order Summary</h2>
            <div className={styles.orderInfo}>
              <div className={styles.field}>
                {cartItems.map((cartItem) => {
                  const item = findOrderItem(cartItem._id);
                  if (item)
                    return (
                      <div className={styles.orderItem}>
                        <div
                          key={cartItem._id}
                        >{`${item.name} x ${cartItem.quantity}`}</div>
                        <div>{`$${cartItem.quantity * item.price}`}</div>
                      </div>
                    );
                })}
              </div>
              <div className={styles.tax}>{`Tax: $${taxCost}`}</div>
              <div className={styles.field}>
                {cartItems ? (
                  <div className={styles.totalPrice}>
                    <span>Total: $</span>
                    {getTotalPrice() + taxCost}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.placeOrderBtn}>
        <button type="button" onClick={submitHandler}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
