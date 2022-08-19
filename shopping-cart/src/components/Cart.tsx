import React from "react";
import { useCart } from "../contexts/CartContext";
import styles from "../styles/Cart.module.css";
import CartItem from "./CartItem";

const Cart = () => {
  const {
    getCartQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    cartItems
  } = useCart();

  const items = cartItems

  return (
    <div className={styles.container}>
      <h3>Shopping Cart</h3>
      <div>{items.map(item => <p>{item.id}</p>)}</div>

      <button>Continue Shopping</button>
      <button>Check Out</button>
    </div>
  );
};

export default Cart;
