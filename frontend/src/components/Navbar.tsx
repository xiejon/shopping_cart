import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../contexts/StoreContext";
import styles from "../styles/Navbar.module.css";
import Cart from "../screens/Cart";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  const { userInfo, getCartQuantity, cartItems } = useStore();

  const quantity = getCartQuantity();

  let cartRef = React.useRef<any>(null);

  // Hide cart when area outside of cart is clicked
  React.useEffect(() => {
    let handler = (event: any) => {
      if (!cartRef.current?.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

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
          <Link className={styles.link} to={userInfo ? "/account" : "/signin"}>
            Account
          </Link>
          <button
            className={styles.cartBtn}
            onClick={() => setIsCartOpen(true)}
          >
            <svg
              className={styles.cart}
              xmlns="http://www.w3.org/2000/svg"
              height="63"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <div className={styles.quantity}>{quantity}</div>
          </button>
        </div>
      </div>
      <div ref={cartRef}>
        <Cart isOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      </div>
    </>
  );
};

export default Navbar;
