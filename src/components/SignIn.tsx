import React from "react";
import styles from "../styles/SignIn.module.css";
import { Link, useLocation } from "react-router-dom";

const SignIn = () => {
  const { search } = useLocation();
  const redirectInURL = new URLSearchParams(search).get("redirect");
  const redirect = redirectInURL ? redirectInURL : "/";

  return (
    <div className={styles.container}>
        <img
        className={styles.bg}
        src={require("../resources/images/store-bg.jpg")}
        alt="tea"
      ></img>
      <h2 className={styles.header}>My Account</h2>
      <form action="/signin" method="post" id="signin" className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email address"
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className={styles.submit}>
          <button type="submit">Log In</button>
        </div>
        <div className={styles.createAccount}>
          <div>New Customer?</div>
          <Link to={`/signup?redirect=${redirect}`} className={styles.link}>Create an account</Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
