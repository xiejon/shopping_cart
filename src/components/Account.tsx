import React from "react";
import styles from "../styles/Account.module.css";
import { useStore } from "../contexts/StoreContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Account = () => {
  const { userInfo } = useStore();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
  });

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
            <div className={styles.editProfile}><Link to="/">Edit Profile</Link></div>
            <div className={styles.orders}><Link to="/">Orders</Link></div>
        </div>
      </div>
    </div>
  );
};

export default Account;
