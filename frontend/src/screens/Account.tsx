import React from "react";
import styles from "../styles/Account.module.css";
import { useStore } from "../contexts/StoreContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Account = () => {
  const { userInfo, signOut } = useStore();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
  });

  const signOutHandler = () => {
    signOut();

    localStorage.removeItem('cartItems')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress')
  };

  return (
    <div className={styles.container}>
      <img
        className={styles.bg}
        src={require("../resources/images/store-bg.jpg")}
        alt="tea"
      ></img>
      <div className={styles.main}>
        <div className={styles.greeting}>
          Welcome Back, {userInfo ? userInfo.name : null}
        </div>
        <div className={styles.links}>
          <div className={styles.editProfile}>
            <Link to="/profile">Profile</Link>
          </div>
          <div className={styles.orders}>
            <Link to="/orderhistory">Orders</Link>
          </div>
        </div>
        <div className={styles.signOut}>
          <button className={styles.signOutBtn} onClick={signOutHandler}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
