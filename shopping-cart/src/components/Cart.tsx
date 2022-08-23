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
      <div className={styles.cartMain}>
        <h3 className={styles.shoppingCartTitle}>Shopping Cart</h3>
        <div className={styles.itemsContainer}>
          {cartItems.map((item) => {
            return <CartItem key={item.id} {...item}></CartItem>;
          })}
        </div>

        <div className={styles.checkOutBtns}>
          <button className={styles.continueShoppingBtn}>Continue Shopping</button>
          <button className={styles.checkOutBtn}>Check Out</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
