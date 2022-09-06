import React from "react";
import styles from "../styles/SignIn.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "../contexts/StoreContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInURL = new URLSearchParams(search).get("redirect");
  const redirect = redirectInURL ? redirectInURL : "/";

  const { setUser } = useStore();

  const [email, setEmail] = React.useState<String>("");
  const [password, setPassword] = React.useState<String>("");

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/signin", {
        email,
        password,
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className={styles.container}>
      <img
        className={styles.bg}
        src={require("../resources/images/store-bg.jpg")}
        alt="tea"
      ></img>
      <h2 className={styles.header}>My Account</h2>
      <form
        onSubmit={submitHandler}
        action="/signin"
        method="post"
        id="signin"
        className={styles.form}
      >
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            type="password"
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
          <Link to={`/signup?redirect=${redirect}`} className={styles.link}>
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
