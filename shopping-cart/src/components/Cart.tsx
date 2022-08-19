import React from "react";
import { useCart } from "../contexts/CartContext";
import styles from "../styles/Cart.module.css";
import CartItem from "./CartItem";
import storeItems from "../data/items.json";

const Cart = () => {
  const {
    getCartQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    cartItems,
  } = useCart();

//   const items = cartItems.map((cartItem) => {
//     storeItems.map((storeItem) => {
//       if (storeItem.id === cartItem.id) {
//         return <CartItem {...storeItem}></CartItem>;
//       }
//     });
//   });

  return (
    <div className={styles.container}>
      <h3>Shopping Cart</h3>
      <div>{cartItems.map(item => {
        return <CartItem key={item.id} {...item}></CartItem>
      })}</div>

      <button>Continue Shopping</button>
      <button>Check Out</button>
    </div>
  );
};

export default Cart;
