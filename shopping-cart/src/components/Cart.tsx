import React from "react";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import storeItems from '../data/items.json'
import styles from "../styles/Cart.module.css";
import CartItem from "./CartItem";

type CartProps = {
  isOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
};

const Cart = ({ isOpen, setIsCartOpen }: CartProps) => {
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
          <div className={styles.totalPrice}>Total: 

            {cartItems.reduce((total, cartItem) => {
              const item = storeItems.find(item => item.id === cartItem.id)
              return total + (item?.price || 0) * cartItem.quantity
            },0 )}

          </div>
        <div className={styles.checkOutBtns}>
          <Link to="/store">
            <button className={styles.continueShoppingBtn} onClick={() => setIsCartOpen(false)}>
              Continue Shopping
            </button>
          </Link>
          <button className={styles.checkOutBtn}>Check Out</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
