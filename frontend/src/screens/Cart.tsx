import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Cart.module.css";
import CartItem from "../components/CartItem";
import { useStore } from "../contexts/StoreContext";

type CartProps = {
  isOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
};

const Cart = ({ isOpen, setIsCartOpen }: CartProps) => {
  const navigate = useNavigate();

  const { cartItems, storeItems, userInfo, getTotalPrice } = useStore();

  const emptyCartMsg = () => {
    return (
      <div className={styles.emptyMsgContainer}>
        <p className={styles.emptyCartMsg}>Your cart is currently empty!</p>
      </div>
    );
  };

  const checkoutHandler = () => {
    if (userInfo) {
      navigate("/shipping");
    } else {
      navigate("/signin?redirect=/shipping");
    }
  };

  const checkOutBtns = () => {
    return (
      <>
        <Link to="/store">
          <button
            className={styles.continueShoppingBtn}
            onClick={() => setIsCartOpen(false)}
          >
            Continue Shopping
          </button>
        </Link>
        <button
          className={styles.checkOutBtn}
          onClick={() => {
            checkoutHandler();
            setIsCartOpen(false);
          }}
        >
          Check Out
        </button>
      </>
    );
  };

  return (
    <div
      className={styles.container}
      style={isOpen ? { display: "flex" } : { display: "none" }}
    >
      <div className={styles.cartMain}>
        <h3 className={styles.shoppingCartTitle}>Shopping Cart</h3>
        <div className={styles.itemsContainer}>
          {cartItems.map((item) => {
            return <CartItem key={item._id} {...item}></CartItem>;
          })}
        </div>
        <div className={styles.totalPriceContainer}>
          {cartItems.length > 0 ? (
            <div className={styles.totalPrice}><span>Total: $</span>{getTotalPrice()}</div>
          ) : (
            emptyCartMsg()
          )}
        </div>
        <div className={styles.checkOutBtns}>
          {cartItems.length > 0 ? (
            checkOutBtns()
          ) : (
            <Link to="/store">
              <button
                className={styles.emptyCartBtn}
                onClick={() => setIsCartOpen(false)}
              >
                Return to Shop
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
