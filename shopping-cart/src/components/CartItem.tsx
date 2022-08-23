import React from "react";
import styles from "../styles/CartItem.module.css";
import storeItems from "../data/items.json";
import { useCart } from "../contexts/CartContext";

type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } = useCart();
  const item = storeItems.find((storeItem) => storeItem.id === id);
  if (item == null) return null;

  return (
    <div>
      <img className={styles.photo} src={item.url} alt="tea"></img>
      <h5>{item.name}</h5>
      <div>
        <button className={styles.decrementBtn} onClick={() => decreaseCartQuantity(id)}>-</button>
        <div className={styles.quantity}>{quantity}</div>
        <button className={styles.incrementBtn} onClick={() => increaseCartQuantity(id)}>+</button>
      </div>

    </div>
  );
};

export default CartItem;
