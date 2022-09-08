import React from "react";
import styles from "../styles/PlaceOrder.module.css";
import { useStore } from "../contexts/StoreContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import axios from "axios";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const PlaceOrder = () => {
  const [{ loading: boolean }, dispatch] = React.useReducer(reducer, {
    loading: false,
  });

  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInURL = new URLSearchParams(search).get("redirect");
  const redirect = redirectInURL ? redirectInURL : "/";
  const {
    taxCost,
    shippingCost,
    shippingAddress,
    userInfo,
    paymentMethod,
    cartItems,
    storeItems,
    clearCart,
    getTax,
    getTotalPrice,
  } = useStore();

  React.useEffect(() => {
    if (!paymentMethod) {
      navigate("/payment");
    }
  }, [paymentMethod, navigate]);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      dispatch({ type: "CREATE_REQUEST" });

      const { data } = await axios.post(
        "/api/orders",
        {
          orderItems: cartItems.map((cartItem) => {
            const item = storeItems.find(
              (storeItem) => storeItem._id === cartItem._id
            );
            return { ...item, quantity: cartItem.quantity };
          }),
          shippingAddress: shippingAddress,
          paymentMethod: paymentMethod,
          itemsCost: getTotalPrice(),
          shippingCost: shippingCost,
          taxCost: taxCost,
          totalPrice: getTotalPrice() + taxCost + shippingCost,
          user: userInfo,
        },

        {
          headers: {
            authorization: `Bearer: ${userInfo.token}`,
          },
        }
      );

      clearCart();
      dispatch({ type: "CREATE_SUCCESS" });

      navigate(`/orders/${data.order._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      alert(err);
    }
  };

  const findOrderItem = (_id: string) => {
    const item = storeItems.find((item) => item._id === _id);
    return item;
  };

  const roundNum = (num: number) =>
    Math.round(num * 100 + Number.EPSILON) / 100;

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
                <span>{paymentMethod.replace(/\W/g, "")}</span>
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
              <div className={styles.shipping}>
                {`Shipping: ${shippingCost > 0 ? "$" + shippingCost : "FREE"}`}
              </div>
              <div className={styles.tax}>{`Tax: $${roundNum(taxCost)}`}</div>
              <div className={styles.field}>
                {cartItems ? (
                  <div className={styles.totalPrice}>
                    <span>Total: $</span>
                    {roundNum(getTotalPrice() + taxCost + shippingCost)}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={submitHandler}
        className={styles.placeOrderBtn}
      >
        Place Order
      </button>
    </div>
  );
};

export default PlaceOrder;
