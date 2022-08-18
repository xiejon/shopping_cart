import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import styles from "../styles/Navbar.module.css";
import Cart from "./Cart";

type NavbarProps = {};

// props: {cart}: NavbarProps
const Navbar = () => {
  const { getCartQuantity } = useCart();
  const [isCartShown, setIsCartShown] = React.useState(false);

  const quantity = getCartQuantity();

  return (
    <>
      <div className={styles.nav}>
        <div className={styles.logo}>
          <h1>Pu'er Tea Co.</h1>
        </div>
        <div className={styles.links}>
          <Link className={styles.link} to="/">
            Home
          </Link>
          <Link className={styles.link} to="/store">
            Store
          </Link>
          <button className={styles.cartBtn}>
            <svg
              className={styles.cart}
              xmlns="http://www.w3.org/2000/svg"
              height="63"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <div className={styles.quantity}>{quantity}</div>
          </button>
        </div>
      </div>
      <div>
        <Cart
        // visibility={isCartShown}
        />
      </div>
    </>
  );
};

export default Navbar;