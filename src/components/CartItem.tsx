import React from "react";
import styles from "../styles/CartItem.module.css";
import { useStore } from "../contexts/StoreContext";

type CartItemProps = {
  _id: string;
  quantity: number;
};

const CartItem = ({ _id, quantity }: CartItemProps) => {
  const {
    removeFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
    storeItems,
  } = useStore();

  const item = storeItems.find((storeItem) => storeItem._id === _id);
  if (item == null) return null;

  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemInfo}>
        <img className={styles.photo} src={item.url} alt="tea"></img>
        <h5 className={styles.name}>{item.name}</h5>
      </div>
      <div className={styles.priceAndQtyInfo}>
        <div className={styles.btnsContainer}>
          <button
            className={styles.decrementBtn}
            onClick={() => decreaseCartQuantity(_id)}
          >
            -
          </button>
          <div className={styles.quantity}>{quantity}</div>
          <button
            className={styles.incrementBtn}
            onClick={() => increaseCartQuantity(_id)}
          >
            +
          </button>
        </div>
        <div className={styles.price}>${quantity * item.price}</div>
      </div>
    </div>
  );
};

export default CartItem;
