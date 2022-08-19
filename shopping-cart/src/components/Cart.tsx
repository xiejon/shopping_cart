import React from "react";
import { useCart } from "../contexts/CartContext";
import styles from "../styles/Cart.module.css";
import CartItem from "./CartItem";

type CartProps = {
  isOpen: boolean;
};

const Cart = ({ isOpen }: CartProps) => {
  const {
    getCartQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    cartItems,
  } = useCart();

  return (
    <div
      className={styles.container}
      style={isOpen ? { display: "flex" } : { display: "none" }}
    >
      <div>
        <h3>Shopping Cart</h3>
        <div>
          {cartItems.map((item) => {
            return <CartItem key={item.id} {...item}></CartItem>;
          })}
        </div>
        <button>Continue Shopping</button>
        <button>Check Out</button>
      </div>
    </div>
  );
};

export default Cart;
