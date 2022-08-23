import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h3 className={styles.quote}>
          <em>'A BATH REFRESHES THE BODY, TEA REFRESHES THE MIND.'</em>
        </h3>
        <Link className={styles.link} to="/store">
          <button className={styles.btn} type="button">
            VISIT THE STORE
          </button>
        </Link>
      </div>
      <img
        className={styles.bg}
        src={require("../resources/images/home-bg.jpg")}
        alt="tea"
      ></img>
    </div>
  );
};

export default Home;
